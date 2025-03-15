
import React from 'react';
import { TaxFormData } from '../../types';
import WithholdingAmountInput from './WithholdingAmountInput';

interface WithholdingValuesProps {
  formData: TaxFormData;
  handleWithholdingAmountChange: (field: keyof TaxFormData['withholdingAmounts']) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WithholdingValues = ({ formData, handleWithholdingAmountChange }: WithholdingValuesProps) => {
  const withholdingFields = [
    { field: 'salary', label: 'Salary Withholding Tax (in PKR)' },
    { field: 'bankTransactions', label: 'Bank Transactions Withholding Tax (in PKR)' },
    { field: 'utilities', label: 'Utility Bills Withholding Tax (in PKR)' },
    { field: 'mobilePhone', label: 'Mobile Phone Withholding Tax (in PKR)' },
    { field: 'vehicleTax', label: 'Vehicle Tax Withholding (in PKR)' },
    { field: 'otherTaxes', label: 'Other Withholding Taxes (in PKR)' }
  ];

  const activeFields = withholdingFields.filter(
    ({ field }) => formData.withholding?.[field as keyof typeof formData.withholding]
  );

  return (
    <div className="space-y-4 pt-4">
      {activeFields.map(({ field, label }) => (
        <WithholdingAmountInput
          key={field}
          id={`${field}Amount`}
          label={label}
          value={formData.withholdingAmounts?.[field as keyof typeof formData.withholdingAmounts] || 0}
          onChange={handleWithholdingAmountChange(field as keyof typeof formData.withholdingAmounts)}
        />
      ))}
      
      {!Object.values(formData.withholding || {}).some(Boolean) && (
        <div className="px-4 py-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Please select at least one withholding tax type to enter values.</p>
        </div>
      )}
    </div>
  );
};

export default WithholdingValues;
