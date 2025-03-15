
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle as CheckCircleIcon, FileText, Eye } from 'lucide-react';
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Return Overview</CardTitle>
        <CardDescription>
          Summary of your most recent tax filing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {taxFilings.length > 0 ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Filing Status</h3>
              <div className="flex items-center">
                {taxFilings[0].status === 'submitted' ? (
                  <>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircleIcon className="mr-1 h-3 w-3" />
                      Submitted
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      on {new Date(taxFilings[0].updated_at).toLocaleDateString()}
                    </span>
                  </>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Draft
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {taxFilings[0].form_data.name || 'Not provided'}</p>
                  <p><span className="text-muted-foreground">CNIC:</span> {taxFilings[0].form_data.cnic || 'Not provided'}</p>
                  <p><span className="text-muted-foreground">Taxpayer Category:</span> {taxFilings[0].form_data.taxpayerCategory || 'Not specified'}</p>
                  <p><span className="text-muted-foreground">Residency Status:</span> {taxFilings[0].form_data.residencyStatus || 'Not specified'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Income Sources</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(taxFilings[0].form_data.incomeStreams).map(([key, value]) => 
                    value && (
                      <p key={key}>
                        <span className="text-muted-foreground capitalize">{key}:</span> {formatCurrency(Number(taxFilings[0].form_data.incomeAmounts[key] || 0))}
                      </p>
                    )
                  )}
                  {!Object.values(taxFilings[0].form_data.incomeStreams).some(Boolean) && (
                    <p>No income sources specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No tax filing information available</p>
        )}
      </CardContent>
      <CardFooter>
        {taxFilings.length > 0 && (
          <Button variant="outline" onClick={handleViewReturn}>
            {taxFilings[0].status === 'submitted' ? (
              <>
                <Eye className="mr-2 h-4 w-4" />
                View PDF Report
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Continue Tax Return
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaxReturnOverview;
