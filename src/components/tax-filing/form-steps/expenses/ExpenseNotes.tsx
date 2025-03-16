
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ExpenseNotes = () => {
  return (
    <div className="space-y-4 pb-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Income Reporting Guidelines</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Report all income sources for the tax year (July 1 to June 30).</li>
          <li>Salary income should match the amounts on your employer-issued certificate.</li>
          <li>Business income must include all revenue streams from self-employment or business operations.</li>
          <li>For rental income, ensure to report the gross amount before any deductions.</li>
          <li>Capital gains require documentation of purchase and sale transactions.</li>
          <li>Foreign income must be converted to PKR using the applicable exchange rate.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Income Documentation</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Keep supporting documents for all income sources for at least 5 years. This includes salary slips, 
          bank statements, property rent agreements, business ledgers, and investment transaction records.
          FBR may request verification during audit proceedings.
        </p>
      </div>
    </div>
  );
};

export default ExpenseNotes;
