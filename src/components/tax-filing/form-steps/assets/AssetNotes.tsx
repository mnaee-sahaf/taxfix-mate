
import React from 'react';

const AssetNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Important Information About Assets Declaration</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>All assets owned as of June 30 of the tax year must be declared.</li>
          <li>Assets should be declared at fair market value, not historical cost.</li>
          <li>For real estate, the FBR valuation rates or DC rates may be applicable.</li>
          <li>Foreign assets must be converted to PKR at the exchange rate applicable on June 30.</li>
          <li>Jointly held assets should be declared to the extent of your beneficial interest.</li>
          <li>Assets held in the name of minor children must be declared in the parent's return.</li>
        </ul>
      </div>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">Penalties for Non-Declaration</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Failure to disclose assets or understating the value of assets may result in penalties up to 100% of the tax evaded, 
          in addition to prosecution under the Income Tax Ordinance, 2001.
        </p>
      </div>
    </div>
  );
};

export default AssetNotes;
