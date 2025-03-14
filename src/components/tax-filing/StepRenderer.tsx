
import React from 'react';
import { TaxFormData } from './types';
import IdentificationStep from './form-steps/IdentificationStep';
import ResidencyStep from './form-steps/ResidencyStep';
import IncomeStep from './form-steps/IncomeStep';
import ExpensesStep from './form-steps/ExpensesStep';
import DeductionsStep from './form-steps/DeductionsStep';
import AssetsStep from './form-steps/AssetsStep';
import WithholdingStep from './form-steps/WithholdingStep';
import ReviewStep from './form-steps/ReviewStep';

interface StepRendererProps {
  stepId: string;
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({ 
  stepId, 
  formData, 
  handleInputChange, 
  handleNestedChange 
}) => {
  // Map of step IDs to their corresponding components with required props
  const stepComponents: Record<string, React.ReactNode> = {
    'identification': (
      <IdentificationStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
    ),
    'residency': (
      <ResidencyStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
    ),
    'income': (
      <IncomeStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleNestedChange={handleNestedChange} 
      />
    ),
    'expenses': (
      <ExpensesStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleNestedChange={handleNestedChange} 
      />
    ),
    'deductions': (
      <DeductionsStep 
        formData={formData} 
      />
    ),
    'assets': (
      <AssetsStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleNestedChange={handleNestedChange} 
      />
    ),
    'withholding': (
      <WithholdingStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleNestedChange={handleNestedChange} 
      />
    ),
    'review': (
      <ReviewStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
    ),
  };

  // Return the component for the current step or null if not found
  return stepComponents[stepId] || null;
};

export default StepRenderer;
