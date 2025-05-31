import React from 'react';
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
  onValidationChange: (isValid: boolean) => void;
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
    handleInputChange(field, value);
    
    // Validate the entire form
    const isValid = Object.values(formData).every(value => 
      value === '' || !isNaN(parseFloat(value))
    );
    
    onValidationChange(isValid);
  };
  
  return (
    <div className="space-y-4">
      <IncomeNotes />
      <IncomeToggleSection 
        formData={formData} 
        handleIncomeToggle={handleIncomeToggle} 
      />
      <NumericInput
        label="Salary Income"
        value={formData.salaryIncome}
        onChange={(value) => handleAmountChange('salaryIncome', value)}
        placeholder="0.00"
        decimalPlaces={2}
        min={0}
        max={999999999999}
        required
      />
      <NumericInput
        label="Business Income"
        value={formData.businessIncome}
        onChange={(value) => handleAmountChange('businessIncome', value)}
        placeholder="0.00"
        decimalPlaces={2}
        min={0}
        max={999999999999}
        required
      />
      {/* <IncomeTabSection /> */}
    </div>
  );
};

export default IncomeStep;
