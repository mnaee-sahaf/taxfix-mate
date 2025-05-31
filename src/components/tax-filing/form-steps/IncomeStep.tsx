
import React, { useEffect } from 'react';
import { TaxFormData } from '../types';
import IncomeToggleSection from './income/IncomeToggleSection';
import IncomeNotes from './income/IncomeNotes';
import { useFormValidation } from '@/hooks/useFormValidation';    
import { NumericInput } from '@/components/ui/numeric-input';
import { useLogger } from '@/hooks/useLogger';

interface IncomeStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const IncomeStep: React.FC<IncomeStepProps> = ({
  formData,
  handleInputChange,
  handleNestedChange,
  onValidationChange
}) => {
  const { errors, validateField } = useFormValidation('IncomeStep');                                                      
  const logger = useLogger('IncomeStep');

  const handleIncomeToggle = (field: keyof typeof formData.incomeStreams) => (checked: boolean) => {
    handleNestedChange('incomeStreams', field, checked);
  };

  const handleAmountChange = (field: string, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value) || 0;
    handleInputChange(field, numericValue);
    
    // Also update the incomeAmounts object for consistency
    if (field.includes('Income')) {
      handleNestedChange('incomeAmounts', field, numericValue);
    }
    
    // Validate the form
    const hasSelectedIncomes = Object.values(formData.incomeStreams).some(value => value === true);
    const hasValidAmounts = hasSelectedIncomes; // At least one income source selected
    
    if (onValidationChange) {
      onValidationChange(hasValidAmounts);
    }
  };

  // Sync form validation when income streams change
  useEffect(() => {
    const hasSelectedIncomes = Object.values(formData.incomeStreams).some(value => value === true);
    if (onValidationChange) {
      onValidationChange(hasSelectedIncomes);
    }
  }, [formData.incomeStreams, onValidationChange]);
  
  return (
    <div className="space-y-4">
      <IncomeNotes />
      <IncomeToggleSection 
        formData={formData} 
        handleIncomeToggle={handleIncomeToggle} 
      />
      
      {formData.incomeStreams.salary && (
        <NumericInput
          label="Salary Income (Annual in PKR)"
          value={formData.salaryIncome || 0}
          onChange={(value) => handleAmountChange('salaryIncome', value)}
          placeholder="0.00"
          decimalPlaces={2}
          min={0}
          max={999999999999}
        />
      )}
      
      {formData.incomeStreams.business && (
        <NumericInput
          label="Business Income (Annual in PKR)"
          value={formData.businessIncome || 0}
          onChange={(value) => handleAmountChange('businessIncome', value)}
          placeholder="0.00"
          decimalPlaces={2}
          min={0}
          max={999999999999}
        />
      )}
      
      {formData.incomeStreams.rental && (
        <NumericInput
          label="Rental Income (Annual in PKR)"
          value={formData.rentalIncome || 0}
          onChange={(value) => handleAmountChange('rentalIncome', value)}
          placeholder="0.00"
          decimalPlaces={2}
          min={0}
          max={999999999999}
        />
      )}
      
      {formData.incomeStreams.agricultural && (
        <NumericInput
          label="Agricultural Income (Annual in PKR)"
          value={formData.agriculturalIncome || 0}
          onChange={(value) => handleAmountChange('agriculturalIncome', value)}
          placeholder="0.00"
          decimalPlaces={2}
          min={0}
          max={999999999999}
        />
      )}
      
      {formData.incomeStreams.capitalGains && (
        <NumericInput
          label="Capital Gains Income (Annual in PKR)"
          value={formData.capitalGainsIncome || 0}
          onChange={(value) => handleAmountChange('capitalGainsIncome', value)}
          placeholder="0.00"
          decimalPlaces={2}
          min={0}
          max={999999999999}
        />
      )}
      
      {formData.incomeStreams.foreign && (
        <NumericInput
          label="Foreign Income (Annual in PKR)"
          value={formData.foreignIncome || 0}
          onChange={(value) => handleAmountChange('foreignIncome', value)}
          placeholder="0.00"
          decimalPlaces={2}
          min={0}
          max={999999999999}
        />
      )}
      
      {!Object.values(formData.incomeStreams).some(Boolean) && (
        <div className="px-4 py-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Please select at least one income source to enter amounts.</p>
        </div>
      )}
    </div>
  );
};

export default IncomeStep;
