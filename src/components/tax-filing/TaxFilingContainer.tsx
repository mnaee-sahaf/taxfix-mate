
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TaxFormProgress from '@/components/tax-filing/TaxFormProgress';
import TaxFormStepNavigation from '@/components/tax-filing/TaxFormStepNavigation';
import StepRenderer from '@/components/tax-filing/StepRenderer';
import { Step, TaxFormData } from '@/components/tax-filing/types';

interface TaxFilingContainerProps {
  currentStep: number;
  steps: Step[];
  formData: TaxFormData;
  savedProgress: boolean;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
  prevStep: () => void;
  nextStep: () => void;
  saveProgress: () => void;
  handleSubmit: () => void;
}

const TaxFilingContainer: React.FC<TaxFilingContainerProps> = ({
  currentStep,
  steps,
  formData,
  savedProgress,
  handleInputChange,
  handleNestedChange,
  prevStep,
  nextStep,
  saveProgress,
  handleSubmit
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <TaxFormProgress 
          currentStep={currentStep} 
          steps={steps} 
        />
        
        <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
        <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
        
        <div className="py-4">
          <StepRenderer 
            stepId={steps[currentStep].id}
            formData={formData}
            handleInputChange={handleInputChange}
            handleNestedChange={handleNestedChange}
          />
        </div>
        
        <TaxFormStepNavigation 
          currentStep={currentStep}
          steps={steps}
          prevStep={prevStep}
          nextStep={nextStep}
          saveProgress={saveProgress}
          handleSubmit={handleSubmit}
          savedProgress={savedProgress}
          penaltyUnderstanding={formData.penaltyUnderstanding}
        />
      </CardContent>
    </Card>
  );
};

export default TaxFilingContainer;
