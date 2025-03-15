
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TaxFormProgress from '@/components/tax-filing/TaxFormProgress';
import TaxFormStepNavigation from '@/components/tax-filing/TaxFormStepNavigation';
import StepRenderer from '@/components/tax-filing/StepRenderer';
import { Step, TaxFormData } from '@/components/tax-filing/types';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateCurrentStep = (): boolean => {
    const currentStepId = steps[currentStep].id;
    
    // Step-specific validations
    switch (currentStepId) {
      case 'identification':
        if (!formData.name || !formData.cnic || !formData.taxpayerCategory) {
          setValidationError("Please fill in all required fields: Name, CNIC, and Taxpayer Category");
          return false;
        }
        break;
        
      case 'residency':
        if (formData.residencyDays === 0 || !formData.residencyStatus) {
          setValidationError("Please specify how many days you've resided in Pakistan");
          return false;
        }
        break;
        
      case 'income':
        const hasAnyIncome = Object.values(formData.incomeStreams).some(value => value === true);
        if (!hasAnyIncome) {
          setValidationError("Please select at least one income source");
          return false;
        }
        break;
        
      case 'expenses':
        const hasAnyExpense = Object.values(formData.expenses).some(value => value === true);
        if (!hasAnyExpense) {
          setValidationError("Please select at least one expense type");
          return false;
        }
        break;
        
      case 'deductions':
        const hasAnyDeduction = Object.values(formData.eligibleDeductions).some(value => value === true);
        if (!hasAnyDeduction) {
          setValidationError("Please select at least one deduction type");
          return false;
        }
        break;
        
      case 'assets':
        const hasAnyAsset = Object.values(formData.assets).some(value => value === true);
        if (!hasAnyAsset) {
          setValidationError("Please select at least one asset type");
          return false;
        }
        break;
        
      case 'withholding':
        const hasAnyWithholding = Object.values(formData.withholding).some(value => value === true);
        if (!hasAnyWithholding) {
          setValidationError("Please select at least one withholding tax type");
          return false;
        }
        break;
    }
    
    setValidationError(null);
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      nextStep();
    } else {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
    }
  };

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
          nextStep={handleNextStep}
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
