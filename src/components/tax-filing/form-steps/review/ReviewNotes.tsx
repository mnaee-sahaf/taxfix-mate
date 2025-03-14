
import React from 'react';

const ReviewNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Final Submission Guidelines</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Review all information carefully before submission as corrections after filing may require revised returns.</li>
          <li>Ensure all income sources have been properly declared.</li>
          <li>Verify that all eligible deductions and credits have been claimed.</li>
          <li>Check that all withholding taxes paid during the year are included.</li>
          <li>Tax returns submitted with incomplete or incorrect information may be selected for audit.</li>
          <li>After submission, save your confirmation number and keep a PDF copy of your return.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Legal Declaration</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          By submitting this tax return, you are making a legal declaration that all information provided is true,
          correct, and complete to the best of your knowledge. False declarations may result in penalties under
          Section 181 of the Income Tax Ordinance, 2001, which can include fines and possible prosecution.
        </p>
      </div>
    </div>
  );
};

export default ReviewNotes;
