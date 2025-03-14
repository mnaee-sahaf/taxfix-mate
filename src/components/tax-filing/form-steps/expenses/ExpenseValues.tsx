
import React from 'react';
import { TaxFormData } from '../../types';
import ExpenseAmountInput from './ExpenseAmountInput';

interface ExpenseValuesProps {
  formData: TaxFormData;
  handleExpenseAmountChange: (field: keyof TaxFormData['expenseAmounts']) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpenseValues = ({ formData, handleExpenseAmountChange }: ExpenseValuesProps) => {
  const expenseFields = [
    { field: 'gas', label: 'Gas Expenses (Annual in PKR)' },
    { field: 'electricity', label: 'Electricity Expenses (Annual in PKR)' },
    { field: 'water', label: 'Water Expenses (Annual in PKR)' },
    { field: 'telephone', label: 'Telephone Expenses (Annual in PKR)' },
    { field: 'medical', label: 'Medical Expenses (Annual in PKR)' },
    { field: 'educational', label: 'Educational Expenses (Annual in PKR)' },
    { field: 'travel', label: 'Travel Expenses (Annual in PKR)' },
    { field: 'other', label: 'Other Expenses (Annual in PKR)' },
  ];

  const activeFields = expenseFields.filter(
    ({ field }) => formData.expenses?.[field as keyof typeof formData.expenses]
  );

  return (
    <div className="space-y-4 pt-4">
      {activeFields.map(({ field, label }) => (
        <ExpenseAmountInput
          key={field}
          id={`${field}Amount`}
          label={label}
          value={formData.expenseAmounts?.[field as keyof typeof formData.expenseAmounts] || 0}
          onChange={handleExpenseAmountChange(field as keyof typeof formData.expenseAmounts)}
        />
      ))}
      
      {!Object.values(formData.expenses || {}).some(Boolean) && (
        <div className="px-4 py-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Please select at least one expense type to enter values.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseValues;
