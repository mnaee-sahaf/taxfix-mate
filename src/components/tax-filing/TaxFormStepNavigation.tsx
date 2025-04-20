
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Home } from 'lucide-react';
import { Step } from './types';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface TaxFormStepNavigationProps {
  currentStep: number;
  steps: Step[];
  prevStep: () => void;
  nextStep: () => void;
  saveProgress: () => void;
  handleSubmit: () => void;
  savedProgress: boolean;
  penaltyUnderstanding: boolean;
}

const TaxFormStepNavigation: React.FC<TaxFormStepNavigationProps> = ({
  currentStep,
  steps,
  prevStep,
  nextStep,
  saveProgress,
  handleSubmit,
  savedProgress,
  penaltyUnderstanding
}) => {
  const isLastStep = currentStep === steps.length - 1;
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleSaveAndExit = () => {
    saveProgress();
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between border-t px-3 sm:px-6 pt-4 sm:pt-6 gap-3 sm:gap-4">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
        className="text-sm sm:text-base w-full sm:w-auto"
        size={isMobile ? "sm" : "default"}
      >
        <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Previous
      </Button>
      
      <Button
        variant="outline"
        onClick={handleSaveAndExit}
        className="text-sm sm:text-base w-full sm:w-auto"
        size={isMobile ? "sm" : "default"}
      >
        <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Save & Exit
      </Button>
      
      {isLastStep ? (
        <Button 
          onClick={handleSubmit}
          disabled={!penaltyUnderstanding}
          className="text-sm sm:text-base w-full sm:w-auto"
          size={isMobile ? "sm" : "default"}
        >
          Submit Return
        </Button>
      ) : (
        <Button 
          onClick={nextStep}
          className="text-sm sm:text-base w-full sm:w-auto"
          size={isMobile ? "sm" : "default"}
        >
          Next
          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      )}
    </div>
  );
};

export default TaxFormStepNavigation;
