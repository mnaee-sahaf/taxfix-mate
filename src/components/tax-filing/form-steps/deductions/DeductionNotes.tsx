
import React from 'react';

const DeductionNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Available Tax Deductions</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Education expenses are deductible up to Rs. 200,000 per child per annum at recognized institutions.</li>
          <li>Approved pension contributions are deductible up to 20% of taxable income.</li>
          <li>Donations to approved non-profit organizations qualify for up to 30% deduction of taxable income.</li>
          <li>Health insurance premiums for yourself and dependents are deductible up to specified limits.</li>
          <li>Life insurance premiums are deductible for policies with at least 20-year term.</li>
          <li>Interest paid on mortgage for principal residence has limited deduction availability.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Documentation Requirements</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          All deduction claims must be supported by proper documentation including payment receipts, 
          certificates, and acknowledgment letters from the receiving institutions. 
          Retain these documents for at least 5 years as they may be required during audit proceedings.
        </p>
      </div>
    </div>
  );
};

export default DeductionNotes;
