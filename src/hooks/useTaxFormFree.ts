import { useState, useEffect } from 'react';
import { FreeTaxFormData } from '@/components/tax-filing/types';
import { initialFreeTaxFormData } from '@/components/tax-filing/initialFreeFormData';
import { useToast } from '@/components/ui/use-toast';
import { FREE_TAX_FILING_STEPS } from '@/components/tax-filing/constants';

interface UseTaxFormFreeProps {
  updateTaxData?: (data: any) => void;
}

export const useTaxFormFree = ({ updateTaxData }: UseTaxFormFreeProps) => {
  const { toast } = useToast();
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

  const validateCurrentStep = () => {
    const currentStepId = FREE_TAX_FILING_STEPS[currentStep].id;
    
    switch (currentStepId) {
      case 'identification':
        return !!formData.name && !!formData.cnic && !!formData.taxpayerCategory;
      case 'income':
        return Object.values(formData.incomeStreams).some(value => value === true);
      case 'expenses':
        return Object.values(formData.expenses).some(value => value === true);
      case 'review':
        return true; // Review step is always valid
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < FREE_TAX_FILING_STEPS.length - 1) {
      if (validateCurrentStep()) {
        setCurrentStep(current => current + 1);
        window.scrollTo(0, 0);
      } else {
        toast({
          title: "Incomplete Information",
          description: "Please complete all required fields before proceeding.",
          variant: "destructive",
        });
      }
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

    // Generate PDF with complete data structure for the PDF generator
    import('@/utils/pdfGenerator').then(({ generateTaxPDF }) => {
      // Create a complete TaxFilingData object with defaults for missing properties
      const pdfData = {
        // Basic information from FreeTaxFormData
        ...formData,
        
        // Add default values for required fields in TaxFilingData
        residencyStatus: 'Resident',
        residencyDays: 365,
        governmentEmployee: false,
        
        // Add empty objects for missing nested properties
        eligibleDeductions: {
          lifeInsurance: false,
          pension: false,
          donations: false,
          education: false,
          royalty: false,
          zakat: false
        },
        specialTaxCredits: {
          firstTimeFiler: false,
          itSector: false,
          exportIndustry: false
        },
        withholding: {
          salary: false,
          bankTransactions: false,
          utilities: false,
          mobilePhone: false,
          vehicleTax: false,
          otherTaxes: false
        },
        withholdingAmounts: {
          salary: 0,
          bankTransactions: 0,
          utilities: 0,
          mobilePhone: 0,
          vehicleTax: 0,
          otherTaxes: 0
        },
        assets: {
          agriculturalProperty: false,
          residentialProperty: false,
          stocksBonds: false,
          car: false,
          motorbike: false,
          cash: false,
          gold: false,
          other: false,
          assetsOutsidePakistan: false
        },
        assetValues: {
          agriculturalProperty: 0,
          residentialProperty: 0,
          stocksBonds: 0,
          car: 0,
          motorbike: 0,
          cash: 0,
          gold: 0,
          other: 0,
          assetsOutsidePakistan: 0
        },
        
        // Add numeric values with defaults
        lifeInsuranceAmount: 0,
        pensionAmount: 0,
        donationAmount: 0,
        educationAmount: 0,
        royaltyAmount: 0,
        zakatAmount: 0,
      };
      
      generateTaxPDF(pdfData);
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
