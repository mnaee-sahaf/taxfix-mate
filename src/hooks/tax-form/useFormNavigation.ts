
import { useState, useEffect } from 'react';

export const useFormNavigation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < 7) { // 7 is the last index of STEPS array
      setCurrentStep(current => current + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
      window.scrollTo(0, 0);
    }
  };

  return { currentStep, nextStep, prevStep };
};
