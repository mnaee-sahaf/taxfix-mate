
import React from 'react';
import { TaxFormData } from '../../types';
import AssetAmountInput from './AssetAmountInput';

interface AssetValuesProps {
  formData: TaxFormData;
  handleAssetAmountChange: (field: keyof TaxFormData['assetValues']) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssetValues = ({ formData, handleAssetAmountChange }: AssetValuesProps) => {
  const assetFields = [
    { field: 'agriculturalProperty', label: 'Agricultural Property Value (in PKR)' },
    { field: 'residentialProperty', label: 'Residential Property Value (in PKR)' },
    { field: 'stocksBonds', label: 'Stocks/Bonds Value (in PKR)' },
    { field: 'car', label: 'Car Value (in PKR)' },
    { field: 'motorbike', label: 'Motorbike Value (in PKR)' },
    { field: 'cash', label: 'Cash Value (in PKR)' },
    { field: 'gold', label: 'Gold Value (in PKR)' },
    { field: 'other', label: 'Other Assets Value (in PKR)' },
    { field: 'assetsOutsidePakistan', label: 'Assets outside Pakistan Value (in PKR)' },
  ];

  const activeFields = assetFields.filter(
    ({ field }) => formData.assets?.[field as keyof typeof formData.assets]
  );

  return (
    <div className="space-y-4 pt-4">
      {activeFields.map(({ field, label }) => (
        <AssetAmountInput
          key={field}
          id={`${field}Amount`}
          label={label}
          value={formData.assetValues?.[field as keyof typeof formData.assetValues] || 0}
          onChange={handleAssetAmountChange(field as keyof typeof formData.assetValues)}
        />
      ))}
      
      {!Object.values(formData.assets || {}).some(Boolean) && (
        <div className="px-4 py-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Please select at least one asset type to enter values.</p>
        </div>
      )}
    </div>
  );
};

export default AssetValues;
