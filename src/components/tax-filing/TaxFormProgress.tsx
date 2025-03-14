
import { Progress } from '@/components/ui/progress';
import { Step } from './types';

interface TaxFormProgressProps {
  currentStep: number;
  steps: Step[];
}

const TaxFormProgress: React.FC<TaxFormProgressProps> = ({ currentStep, steps }) => {
  const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{steps[currentStep].title}</span>
        <span className="text-sm">{currentStep + 1} of {steps.length}</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default TaxFormProgress;
