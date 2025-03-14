
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ExpenseNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="expenseNotes">Additional Notes</Label>
        <Textarea 
          id="expenseNotes" 
          placeholder="Enter any additional information about your expenses..."
          className="min-h-[120px]"
        />
      </div>
      
      <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Note: Keep all expense receipts for at least 5 years for potential audit purposes.
          Some expenses may require additional documentation to qualify for tax deductions.
        </p>
      </div>
    </div>
  );
};

export default ExpenseNotes;
