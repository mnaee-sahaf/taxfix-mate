
import React from 'react';

const ResidencyNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Understanding Residency Status</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Pakistan follows a 183-day rule for tax residency determination.</li>
          <li>If you spend 183 days or more in Pakistan, you are considered a resident for tax purposes.</li>
          <li>Between 120-182 days, you are a conditional resident with specific requirements.</li>
          <li>Less than 120 days classifies you as a non-resident for taxation.</li>
          <li>Government employees posted abroad are automatically residents regardless of days spent.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Residency Impact on Taxation</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Your residency status affects which income sources are taxable in Pakistan. Residents are taxed on worldwide income,
          while non-residents are generally taxed only on Pakistan-source income. Ensure accurate reporting to avoid penalties.
        </p>
      </div>
    </div>
  );
};

export default ResidencyNotes;
