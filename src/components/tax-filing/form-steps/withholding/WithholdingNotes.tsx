
import React from 'react';

const WithholdingNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Withholding Tax Information</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Withholding taxes are advance tax payments collected at source.</li>
          <li>Common sources include salary, bank transactions, utility bills, and vehicle taxes.</li>
          <li>Mobile bill withholding tax applies on all postpaid connections and prepaid cards.</li>
          <li>Electricity bills exceeding Rs. 25,000 per month have withholding tax applied.</li>
          <li>Vehicle registration and token taxes include advance income tax components.</li>
          <li>All withholding taxes paid are adjustable against your final tax liability.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Documentation Required</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Maintain copies of utility bills, mobile statements, vehicle tax receipts, and bank statements 
          that show withholding tax deductions. These documents serve as proof of advance tax payments 
          and should be available if requested by tax authorities.
        </p>
      </div>
    </div>
  );
};

export default WithholdingNotes;
