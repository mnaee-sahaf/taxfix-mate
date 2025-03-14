
import React from 'react';

const IdentificationNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Important Information About Identification</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Your CNIC (Computerized National Identity Card) number is required for tax filing.</li>
          <li>First-time filers will receive additional guidance throughout the process.</li>
          <li>Ensure your taxpayer category selection matches your income sources.</li>
          <li>Non-resident Pakistanis may have different tax obligations.</li>
          <li>All information must match with official records maintained by NADRA and FBR.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Why Your Information Matters</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          The information provided here determines your tax bracket, applicable deductions, and filing requirements.
          Accurate identification ensures proper processing of your tax return and prevents delays in refunds.
        </p>
      </div>
    </div>
  );
};

export default IdentificationNotes;
