
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Home } from 'lucide-react';
import { Step } from './types';
import { useNavigate } from 'react-router-dom';

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
  
  const handleSaveAndExit = () => {
    saveProgress();
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-between border-t px-6 pt-6 space-x-4">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <Button
        className='pd-2'
        variant="outline"
        onClick={handleSaveAndExit}
      >
        <Home className="mr-2 h-4 w-4" />
        Save & Exit
      </Button>
      
      {isLastStep ? (
        <Button 
          onClick={handleSubmit}
          disabled={!penaltyUnderstanding}
        >
          Submit Return
        </Button>
      ) : (
        <Button onClick={nextStep}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default TaxFormStepNavigation;
