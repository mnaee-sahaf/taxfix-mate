
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileTextIcon, CheckCircleIcon, Eye, Clock, AlertCircle, CalendarIcon } from 'lucide-react';
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Filing History
        </CardTitle>
        <CardDescription>
          Your recent tax filing activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        {taxFilings.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium p-3 border-b">
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Tax Year</div>
                <div className="col-span-2">Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>
              
              <div className="space-y-1 p-1">
                {taxFilings.map((filing, index) => (
                  <div 
                    key={filing.id} 
                    className="grid grid-cols-12 gap-2 text-xs p-2 bg-white dark:bg-black/10 rounded-md"
                  >
                    <div className="col-span-2 flex items-center">
                      <CalendarIcon className="h-3 w-3 text-gray-400 mr-1" />
                      {formatDate(filing.updated_at).split(',')[0]}
                    </div>
                    <div className="col-span-3">
                      {new Date(filing.updated_at).getFullYear() - 1}-{new Date(filing.updated_at).getFullYear()}
                    </div>
                    <div className="col-span-2">
                      {filing.form_data.name || 'Not specified'}
                    </div>
                    <div className="col-span-2">
                      {filing.status === 'submitted' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                          <CheckCircleIcon className="mr-1 h-3 w-3" />
                          Submitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="col-span-3 flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleFilingAction(filing)} className="h-7 px-2">
                        {filing.status === 'submitted' ? (
                          <>
                            <Eye className="mr-1 h-3 w-3" />
                            View PDF
                          </>
                        ) : (
                          <>
                            <FileTextIcon className="mr-1 h-3 w-3" />
                            Continue
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
              <div className="pt-0.5">
                <Info className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Pro Tip:</p>
                <p>You can view or continue any of your previous filings. Submitted filings can be downloaded as PDFs.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <FileTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">No filing history available</p>
            <Button className="mt-4" onClick={() => navigate('/filing')}>Start a New Filing</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Import for Info icon
import { Info } from 'lucide-react';

export default FilingHistory;
