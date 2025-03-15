
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, Clock } from 'lucide-react';

const TaxDeadlineCard = () => {
  // Calculate days until Sept 30 (typical tax deadline in Pakistan)
  const calculateDaysToDeadline = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const deadline = new Date(currentYear, 8, 30); // September 30th (0-indexed months)
    
    // If today's date is past September 30th, use next year's deadline
    if (now > deadline) {
      deadline.setFullYear(currentYear + 1);
    }
    
    const diffTime = Math.abs(deadline.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      daysRemaining: diffDays,
      deadlineDate: deadline.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      progressPercentage: (1 - (diffDays / 365)) * 100
    };
  };
  
  const { daysRemaining, deadlineDate, progressPercentage } = calculateDaysToDeadline();
  
  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-red-500" />
          Tax Deadline
        </CardTitle>
        <CardDescription>FBR filing deadline approaching</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white/70 dark:bg-black/10 rounded-lg p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-bold">{daysRemaining} days</div>
              <div className="text-sm text-muted-foreground">until {deadlineDate}</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm flex justify-between">
              <span>Time Remaining</span>
              <span className="font-medium">{Math.round(100 - progressPercentage)}%</span>
            </div>
            <Progress value={100 - progressPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxDeadlineCard;
