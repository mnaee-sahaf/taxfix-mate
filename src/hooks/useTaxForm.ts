
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { triggerSuccessfulSubmission } from '@/utils/animations';
import { TaxFormData, TaxData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';
import { initialTaxFormData } from '@/components/tax-filing/initialFormData';

interface UseTaxFormProps {
  updateTaxData?: (data: TaxData) => void;
}

export const useTaxForm = ({ updateTaxData }: UseTaxFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [savedProgress, setSavedProgress] = useState(true);
  const [formData, setFormData] = useState<TaxFormData>(initialTaxFormData);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSavedProgress(false);
  };
  
  const handleNestedChange = (category: string, field: string, value: boolean | string | number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev] as any,
        [field]: value
      }
    }));
    setSavedProgress(false);
  };
  
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
  
  const saveProgress = () => {
    localStorage.setItem('taxFilingProgress', JSON.stringify(formData));
    
    toast({
      title: "Progress saved",
      description: "Your tax filing progress has been saved.",
      duration: 3000,
    });
    setSavedProgress(true);
  };
  
  const handleSubmit = () => {
    const taxData = calculateTax(formData);
    
    console.log("Calculated Values:", taxData);

    if (updateTaxData) {
      updateTaxData(taxData);
    }

    try {
      generateTaxPDF(formData);
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    
    localStorage.removeItem('taxFilingProgress');
    
    triggerSuccessfulSubmission();
    
    toast({
      title: "Tax return submitted!",
      description: "Your tax return has been successfully submitted to FBR and a PDF report has been downloaded.",
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  return {
    currentStep,
    formData,
    savedProgress,
    handleInputChange,
    handleNestedChange,
    nextStep,
    prevStep,
    saveProgress,
    handleSubmit
  };
};
