
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, Eye, User, Home, Briefcase, Shield } from 'lucide-react';
import { TaxFormData } from '@/components/tax-filing/types';
import { generateTaxPDF } from '@/utils/pdfGenerator';

interface TaxFilingItem {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

interface TaxReturnOverviewProps {
  taxFilings: TaxFilingItem[];
  formatCurrency: (amount: number) => string;
}

const TaxReturnOverview = ({ taxFilings, formatCurrency }: TaxReturnOverviewProps) => {
  const navigate = useNavigate();
  
  const handleViewReturn = () => {
    if (taxFilings.length > 0) {
      const latestFiling = taxFilings[0];
      
      if (latestFiling.status === 'submitted') {
        // For submitted returns, just generate and show the PDF
        generateTaxPDF(latestFiling.form_data);
      } else {
        // For drafts, navigate to the filing page
        navigate('/filing');
      }
    }
  };
  
  if (taxFilings.length === 0) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-900/20 p-8 text-center">
        <p className="text-muted-foreground">No tax filing information available</p>
        <Button className="mt-4" onClick={() => navigate('/filing')}>Start Your First Filing</Button>
      </Card>
    );
  }
  
  const filing = taxFilings[0];
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800/10 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                Personal Information
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Name</div>
                  <div className="font-medium">{filing.form_data.name || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">CNIC</div>
                  <div className="font-medium">{filing.form_data.cnic || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Taxpayer Category</div>
                  <div className="font-medium">{filing.form_data.taxpayerCategory || 'Not specified'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Residency Status</div>
                  <div className="font-medium">{filing.form_data.residencyStatus || 'Not specified'}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-500" />
                Residency Details
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">City</div>
                  <div className="font-medium">{filing.form_data.city || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Province</div>
                  <div className="font-medium">{filing.form_data.province || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-500" />
                Income Sources
              </h3>
              <div className="mt-3 space-y-2">
                {Object.entries(filing.form_data.incomeStreams || {}).some(([_, value]) => value) ? (
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {Object.entries(filing.form_data.incomeStreams || {}).map(([key, value]) => 
                      value && (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className="font-medium">
                            {formatCurrency(Number(filing.form_data.incomeAmounts[key as keyof typeof filing.form_data.incomeAmounts] || 0))}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No income sources specified</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                Filing Status
              </h3>
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {filing.status === 'submitted' ? (
                    <>
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Submitted</div>
                        <div className="text-xs text-muted-foreground">
                          on {new Date(filing.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Draft</div>
                        <div className="text-xs text-muted-foreground">
                          Last updated on {new Date(filing.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <Button variant="outline" size="sm" onClick={handleViewReturn}>
                  {filing.status === 'submitted' ? (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      View PDF
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Continue
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxReturnOverview;
