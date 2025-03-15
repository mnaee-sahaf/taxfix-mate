
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileTextIcon, CheckCircleIcon, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TaxFormData } from '@/components/tax-filing/types';
import { generateTaxPDF } from '@/utils/pdfGenerator';

interface TaxFilingItem {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

interface FilingHistoryProps {
  taxFilings: TaxFilingItem[];
}

const FilingHistory = ({ taxFilings }: FilingHistoryProps) => {
  const navigate = useNavigate();
  
  const handleFilingAction = (filing: TaxFilingItem) => {
    if (filing.status === 'submitted') {
      // For submitted returns, just generate and show the PDF
      generateTaxPDF(filing.form_data);
    } else {
      // For drafts, continue editing
      localStorage.setItem('taxFilingProgress', JSON.stringify(filing.form_data));
      navigate('/filing');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filing History</CardTitle>
        <CardDescription>
          Your recent tax filing history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {taxFilings.map((filing, index) => (
            <div 
              key={filing.id} 
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">
                    Tax Filing {index + 1} {filing.form_data.name ? `for ${filing.form_data.name}` : ''}
                  </h3>
                  {filing.status === 'submitted' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircleIcon className="mr-1 h-3 w-3" />
                      Submitted
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(filing.updated_at).toLocaleDateString()}
                </p>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => handleFilingAction(filing)}>
                {filing.status === 'submitted' ? (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    View PDF
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilingHistory;
