
import React from 'react';
import { TaxFormData } from '../../types';
import DeductionAmountInput from './DeductionAmountInput';

interface DeductionValuesProps {
  formData: TaxFormData;
  handleDeductionAmountChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeductionValues = ({ formData, handleDeductionAmountChange }: DeductionValuesProps) => {
  const deductionFields = [
    { field: 'royaltyAmount', label: 'Royalty Amount (in PKR)', eligibleField: 'royalty' },
    { field: 'pensionAmount', label: 'Pension Contribution (in PKR)', eligibleField: 'pension' },
    { field: 'zakatAmount', label: 'Zakat Amount (in PKR)', eligibleField: 'zakat' },
    { field: 'donationAmount', label: 'Charity Donations (in PKR)', eligibleField: 'donations' },
    { field: 'educationAmount', label: 'Educational Expenses (in PKR)', eligibleField: 'education' },
    { field: 'lifeInsuranceAmount', label: 'Life Insurance Premium (in PKR)', eligibleField: 'lifeInsurance' }
  ];

  const activeFields = deductionFields.filter(
    ({ eligibleField }) => formData.eligibleDeductions?.[eligibleField as keyof typeof formData.eligibleDeductions]
  );

  return (
    <div className="space-y-4 pt-4">
      {activeFields.map(({ field, label }) => (
        <DeductionAmountInput
          key={field}
          id={field}
          label={label}
          value={formData[field as keyof TaxFormData] as number || 0}
          onChange={handleDeductionAmountChange(field)}
        />
      ))}
      
      {!Object.values(formData.eligibleDeductions || {}).some(Boolean) && (
        <div className="px-4 py-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Please select at least one deduction type to enter values.</p>
        </div>
      )}
    </div>
  );
};

export default DeductionValues;
