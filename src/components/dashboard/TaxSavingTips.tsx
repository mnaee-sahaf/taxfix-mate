
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightIcon, LightbulbIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxSavingTips = () => {
  const tips = [
    {
      title: "Education Expense Credit",
      description: "Claim up to PKR 60,000 per child for education fees."
    },
    {
      title: "Investment in Shares",
      description: "Invest in government-approved shares for tax credits."
    },
    {
      title: "Charity Donations",
      description: "Donations to approved NPOs qualify for tax credits."
    },
    {
      title: "Medical Expenses",
      description: "Claim exemption on medical allowance up to 10% of salary."
    }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-amber-500" />
          Tax Saving Tips
        </CardTitle>
        <CardDescription>Optimize your tax situation</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="bg-green-50/50 dark:bg-green-950/20 rounded-lg p-3">
              <h4 className="font-medium text-sm">{tip.title}</h4>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
            </div>
          ))}
          
          <Button variant="link" className="flex items-center text-xs p-0 h-auto gap-1" onClick={() => window.open('/calculator', '_blank')}>
            Use our tax calculator
            <ArrowRightIcon className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxSavingTips;
