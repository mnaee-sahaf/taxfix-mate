
import React from 'react';
import { useTaxForm } from '@/hooks/useTaxForm';
import { TAX_FILING_STEPS } from '@/components/tax-filing/constants';
import TaxFilingContainer from '@/components/tax-filing/TaxFilingContainer';
import { TaxFilingProps } from '@/components/tax-filing/types';

const TaxFiling: React.FC<TaxFilingProps> = ({ updateTaxData }) => {
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
  } = useTaxForm({ updateTaxData });
  
  return (
    <TaxFilingContainer
      currentStep={currentStep}
      steps={TAX_FILING_STEPS}
      formData={formData}
      savedProgress={savedProgress}
      handleInputChange={handleInputChange}
      handleNestedChange={handleNestedChange}
      prevStep={prevStep}
      nextStep={nextStep}
      saveProgress={saveProgress}
      handleSubmit={handleSubmit}
    />
  );
};

export default TaxFiling;
