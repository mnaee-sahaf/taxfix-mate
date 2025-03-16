
import { useState, useEffect } from 'react';
import { FreeTaxFormData } from '@/components/tax-filing/types';
import { initialFreeTaxFormData } from '@/components/tax-filing/initialFreeFormData';

interface UseTaxFormFreeProps {
  updateTaxData?: (data: any) => void;
}

export const useTaxFormFree = ({ updateTaxData }: UseTaxFormFreeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FreeTaxFormData>(initialFreeTaxFormData);
  const [savedProgress, setSavedProgress] = useState(true);
  
  // Handle scrolling to top when step changes
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
        ...(prev[category as keyof typeof prev] as any),
        [field]: value
      }
    }));
    setSavedProgress(false);
  };

  const nextStep = () => {
    if (currentStep < 3) { // Only 4 steps (0-3) in the free version
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
    localStorage.setItem('freeTaxFilingProgress', JSON.stringify(formData));
    setSavedProgress(true);
    
    // Show confirmation toast
    toast({
      title: "Progress saved",
      description: "Your tax filing progress has been saved."
    });
  };

  const handleSubmit = () => {
    // Calculate tax
    const totalIncome = Object.values(formData.incomeAmounts).reduce((sum, val) => sum + Number(val), 0);
    const totalExpenses = Object.values(formData.expenseAmounts).reduce((sum, val) => sum + Number(val), 0);
    
    const taxableIncome = Math.max(0, totalIncome - totalExpenses);
    let calculatedTax = 0;
    
    // Very simple tax calculation for the free version
    if (taxableIncome <= 600000) {
      calculatedTax = 0;
    } else if (taxableIncome <= 1200000) {
      calculatedTax = (taxableIncome - 600000) * 0.025;
    } else if (taxableIncome <= 2400000) {
      calculatedTax = 15000 + (taxableIncome - 1200000) * 0.125;
    } else if (taxableIncome <= 3600000) {
      calculatedTax = 165000 + (taxableIncome - 2400000) * 0.20;
    } else if (taxableIncome <= 6000000) {
      calculatedTax = 405000 + (taxableIncome - 3600000) * 0.25;
    } else {
      calculatedTax = 1005000 + (taxableIncome - 6000000) * 0.35;
    }
    
    // Prepare tax data
    const taxData = {
      calculatedTax,
      totalIncome,
      totalDeductions: totalExpenses,
      balanceDue: Math.max(0, calculatedTax - formData.paidTax),
      paidTax: formData.paidTax
    };
    
    // Mark form as submitted in local storage
    const submittedFormData = { ...formData, isSubmitted: true };
    localStorage.setItem('freeTaxFilingProgress', JSON.stringify(submittedFormData));
    
    // Call the callback with the tax data if provided
    if (updateTaxData) {
      updateTaxData(taxData);
    }

    // Generate PDF
    import('@/utils/pdfGenerator').then(({ generateTaxPDF }) => {
      generateTaxPDF({
        ...formData,
        residencyStatus: 'Resident', // Default for free version
        residencyDays: 365, // Default for free version
        governmentEmployee: false // Default for free version
      });
    });
    
    return taxData;
  };

  // Load saved form data if available
  useEffect(() => {
    const savedFormData = localStorage.getItem('freeTaxFilingProgress');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved tax filing data:", error);
      }
    }
  }, []);

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

// Helper for toast
const toast = (params: { title?: string; description: string }) => {
  console.log(`${params.title}: ${params.description}`);
  // This is a placeholder that will be replaced by actual toast in the component
};
