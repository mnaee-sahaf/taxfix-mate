
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CircleHelp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaxFilingSteps = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Gather Documents",
      description: "Collect salary statements, investment documents, and expense receipts."
    },
    {
      title: "Complete Tax Form",
      description: "Fill in your personal information, income sources, and deductions."
    },
    {
      title: "Review & Submit",
      description: "Verify all information before submitting your return."
    },
    {
      title: "Track Refund",
      description: "Monitor the status of your tax refund if applicable."
    }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          Filing Process
        </CardTitle>
        <CardDescription>Step-by-step guide to filing</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-800 dark:text-blue-300 text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3 flex gap-2 text-xs">
            <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Need Help?</span> Use our comprehensive guide for assistance with tax filing process.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxFilingSteps;
