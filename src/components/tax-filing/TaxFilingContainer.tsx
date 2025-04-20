import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TaxFormProgress from '@/components/tax-filing/TaxFormProgress';
import TaxFormStepNavigation from '@/components/tax-filing/TaxFormStepNavigation';
import StepRenderer from '@/components/tax-filing/StepRenderer';
import { Step, TaxFormData } from '@/components/tax-filing/types';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface TaxFilingContainerProps {
  currentStep: number;
  steps: Step[];
  formData: any;
  savedProgress: boolean;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
  prevStep: () => void;
  nextStep: () => void;
  saveProgress: () => void;
  handleSubmit: () => void;
  stepRenderer?: React.ReactNode;
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
  handleSubmit,
  stepRenderer
}) => {
  const { toast } = useToast();
  const [validationError, setValidationError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const validateCurrentStep = (): boolean => {
    const currentStepId = steps[currentStep].id;
    
    switch (currentStepId) {
      case 'identification':
        if (!formData.name || !formData.cnic || !formData.taxpayerCategory) {
          setValidationError("Please complete all required fields marked with an asterisk (*) before proceeding.");
          return false;
        }
        break;
        
      case 'residency':
        if ((formData.residencyDays === 0 || formData.residencyDays === undefined) || !formData.residencyStatus) {
          setValidationError("Please specify how many days you've resided in Pakistan to determine your residency status.");
          return false;
        }
        break;
        
      case 'income':
        const hasAnyIncome = Object.values(formData.incomeStreams).some(value => value === true);
        if (!hasAnyIncome) {
          setValidationError("Please select at least one income source to proceed with your tax filing.");
          return false;
        }
        break;
        
      case 'expenses':
        const hasAnyExpense = Object.values(formData.expenses || {}).some(value => value === true);
        if (!hasAnyExpense) {
          setValidationError("Please select at least one expense type that applies to your situation.");
          return false;
        }
        break;
        
      case 'deductions':
        if (formData.eligibleDeductions) {
          const hasAnyDeduction = Object.values(formData.eligibleDeductions).some(value => value === true);
          if (!hasAnyDeduction) {
            setValidationError("Please select at least one deduction type you'd like to claim.");
            return false;
          }
        }
        break;
        
      case 'assets':
        if (formData.assets) {
          const hasAnyAsset = Object.values(formData.assets).some(value => value === true);
          if (!hasAnyAsset) {
            setValidationError("Please select at least one asset type that you currently own.");
            return false;
          }
        }
        break;
        
      case 'withholding':
        if (formData.withholding) {
          const hasAnyWithholding = Object.values(formData.withholding).some(value => value === true);
          if (!hasAnyWithholding) {
            setValidationError("Please select at least one withholding tax type that applies to you.");
            return false;
          }
        }
        break;
    }
    
    setValidationError(null);
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      nextStep();
    } else if (validationError) {
      toast({
        description: validationError,
      });
    }
  };

  return (
    <Card className="border-0 sm:border shadow-none sm:shadow-sm">
      <CardContent className="p-2 sm:p-4 md:p-6">
        <TaxFormProgress 
          currentStep={currentStep} 
          steps={steps} 
        />
        
        <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 mt-3 sm:mt-4">{steps[currentStep].title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{steps[currentStep].description}</p>
        
        {validationError && (
          <Alert className="mb-4 sm:mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-sm">
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
            <AlertDescription className="text-amber-700 dark:text-amber-300 text-xs sm:text-sm">
              {validationError}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="py-2 sm:py-4">
          {stepRenderer || (
            <StepRenderer 
              stepId={steps[currentStep].id}
              formData={formData}
              handleInputChange={handleInputChange}
              handleNestedChange={handleNestedChange}
            />
          )}
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
