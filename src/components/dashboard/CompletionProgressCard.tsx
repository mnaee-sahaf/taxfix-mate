
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';

interface CompletionProgressCardProps {
  completionProgress: number;
}

const CompletionProgressCard = ({ completionProgress }: CompletionProgressCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Tax Return Status</CardTitle>
          {completionProgress === 100 && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <Info className="h-3 w-3 mr-1" />
              Complete
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span className="font-medium">{Math.round(completionProgress)}%</span>
          </div>
          <Progress value={completionProgress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionProgressCard;
