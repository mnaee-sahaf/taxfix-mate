
import React, { useState } from 'react';
import { useTaxFormFree } from '@/hooks/useTaxFormFree';
import { FREE_TAX_FILING_STEPS } from '@/components/tax-filing/constants';
import TaxFilingContainer from '@/components/tax-filing/TaxFilingContainer';
import { TaxFilingProps } from '@/components/tax-filing/types';
import StepRendererForFreeForm from '@/components/tax-filing/StepRendererForFreeForm';

const TaxFilingFree: React.FC<TaxFilingProps> = ({ updateTaxData }) => {
  const [stepValidation, setStepValidation] = useState<boolean>(true);
  
  const {
    currentStep,
    formData,
    savedProgress,
    handleInputChange,
    handleNestedChange,
    nextStep,
    prevStep,
    saveProgress,
    handleSubmit
  } = useTaxFormFree({ updateTaxData });

  const handleValidationChange = (isValid: boolean) => {
    setStepValidation(isValid);
  };
  
  return (
    <TaxFilingContainer
      currentStep={currentStep}
      steps={FREE_TAX_FILING_STEPS}
      formData={formData}
      savedProgress={savedProgress}
      handleInputChange={handleInputChange}
      handleNestedChange={handleNestedChange}
      prevStep={prevStep}
      nextStep={nextStep}
      saveProgress={saveProgress}
      handleSubmit={handleSubmit}
      stepRenderer={
        <StepRendererForFreeForm
          stepId={FREE_TAX_FILING_STEPS[currentStep].id}
          formData={formData}
          handleInputChange={handleInputChange}
          handleNestedChange={handleNestedChange}
          onValidationChange={handleValidationChange}
        />
      }
    />
  );
};

export default TaxFilingFree;
