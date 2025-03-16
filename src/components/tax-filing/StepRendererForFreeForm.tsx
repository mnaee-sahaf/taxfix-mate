
import React from 'react';
import { FreeTaxFormData } from './types';
import IdentificationStep from './form-steps/IdentificationStep';
import IncomeStep from './form-steps/IncomeStep';
import ExpensesStep from './form-steps/ExpensesStep';
import ReviewStep from './form-steps/ReviewStep';

interface StepRendererForFreeFormProps {
  stepId: string;
  formData: FreeTaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const StepRendererForFreeForm: React.FC<StepRendererForFreeFormProps> = ({ 
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

export default StepRendererForFreeForm;
