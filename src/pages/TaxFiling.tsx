
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 md:py-16 mt-16">
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
      </main>
      <Footer />
    </div>
  );
};

export default TaxFiling;
