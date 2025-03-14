import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { triggerSuccessfulSubmission } from '@/utils/animations';
import TaxFormProgress from '@/components/tax-filing/TaxFormProgress';
import TaxFormStepNavigation from '@/components/tax-filing/TaxFormStepNavigation';
import StepRenderer from '@/components/tax-filing/StepRenderer';
import { Step, TaxFormData, TaxData } from '@/components/tax-filing/types';

const STEPS: Step[] = [
  {
    id: 'identification',
    title: 'User Identification',
    description: 'Verify your identity and taxpayer category',
  },
  {
    id: 'residency',
    title: 'Residency Status',
    description: 'Determine your tax residency status',
  },
  {
    id: 'income',
    title: 'Income Sources',
    description: 'Enter all your income streams',
  },
  {
    id: 'expenses',
    title: 'Expense',
    description: 'Enter all your expenses',
  },
  {
    id: 'deductions',
    title: 'Deductions & Credits',
    description: 'Claim eligible tax deductions and credits',
  },
  {
    id: 'assets',
    title: 'Assets & Liabilities',
    description: 'Disclose your financial assets and liabilities',
  },
  {
    id: 'withholding',
    title: 'Withholding Taxes',
    description: 'Record any taxes already withheld',
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your information before submission',
  },
];

interface TaxFilingProps {
  updateTaxData: (data: TaxData) => void;
}

const TaxFiling = ({ updateTaxData }: TaxFilingProps) => {
  if (!updateTaxData) {
    console.error("updateTaxData is not defined!");
    return null;
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [savedProgress, setSavedProgress] = useState(true);
  const [formData, setFormData] = useState<TaxFormData>({
    cnic: '3420112345671',
    firstTimeFiler: false,
    taxpayerCategory: 'salaried-high',
    
    residencyDays: 200,
    governmentEmployee: false,
    residencyStatus: 'resident',
    
    incomeStreams: {
      salary: true,
      business: false,
      rental: true,
      agricultural: false,
      capitalGains: true,
      foreign: false
    },
    employerWithholdingTax: true,
    taxExemptAllowances: {
      conveyance: true,
      medical: true,
      houseRent: true
    },
    
    salaryIncome: 1200000,
    businessIncome: 0,
    rentalIncome: 350000,
    agriculturalIncome: 0,
    capitalGainsIncome: 150000,
    foreignIncome: 0,
    
    eligibleDeductions: {
      lifeInsurance: true,
      pension: true,
      donations: true,
      education: true
    },
    specialTaxCredits: {
      firstTimeFiler: false,
      itSector: false,
      exportIndustry: false
    },
    
    lifeInsuranceAmount: 50000,
    pensionAmount: 120000,
    donationAmount: 80000,
    educationAmount: 150000,
    
    bankAccounts: [
      {
        accountNumber: 'PK36SCBL0000001123456702',
        bankName: 'Standard Chartered Bank',
        currentBalance: 450000
      }
    ],
    immovableProperty: {
      residential: true,
      commercial: false,
      agricultural: false
    },
    
    withholdingTaxes: {
      mobileBills: true,
      vehicleRegistration: true,
      electricityBills: false,
      contractPayments: false
    },
    
    penaltyUnderstanding: false,
    paymentMethod: 'bank-transfer',
    paidTax: 0
  });
  
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

  const handleNestedArrayChange = (name: string, value: any[]) => {
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
    if (currentStep < STEPS.length - 1) {
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
    // Calculate tax values
    const totalIncome = 
      (formData.incomeStreams.salary ? formData.salaryIncome : 0) + 
      (formData.incomeStreams.business ? formData.businessIncome : 0) + 
      (formData.incomeStreams.rental ? formData.rentalIncome : 0) + 
      (formData.incomeStreams.agricultural ? formData.agriculturalIncome : 0) + 
      (formData.incomeStreams.capitalGains ? formData.capitalGainsIncome : 0) + 
      (formData.incomeStreams.foreign ? formData.foreignIncome : 0);
    
    const totalDeductions = 
      (formData.eligibleDeductions.lifeInsurance ? formData.lifeInsuranceAmount : 0) + 
      (formData.eligibleDeductions.pension ? formData.pensionAmount : 0) + 
      (formData.eligibleDeductions.donations ? formData.donationAmount : 0) + 
      (formData.eligibleDeductions.education ? formData.educationAmount : 0);
    
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);
    
    let taxLiability = 0;
    if (taxableIncome <= 600000) {
      taxLiability = 0;
    } else if (taxableIncome <= 1200000) {
      taxLiability = (taxableIncome - 600000) * 0.05;
    } else if (taxableIncome <= 2400000) {
      taxLiability = 30000 + (taxableIncome - 1200000) * 0.10;
    } else if (taxableIncome <= 3600000) {
      taxLiability = 150000 + (taxableIncome - 2400000) * 0.15;
    } else if (taxableIncome <= 6000000) {
      taxLiability = 330000 + (taxableIncome - 3600000) * 0.20;
    } else {
      taxLiability = 810000 + (taxableIncome - 6000000) * 0.25;
    }
    
    if (formData.specialTaxCredits.firstTimeFiler) {
      taxLiability = Math.max(0, taxLiability - 50000);
    }
    
    if (formData.specialTaxCredits.itSector) {
      taxLiability = taxLiability * 0.85; // 15% reduced rate
    }
    
    // Log the calculated values before updating
    console.log("Calculated Values:", {
      calculatedTax: taxLiability,
      paidTax: formData.paidTax || 0,
      balanceDue: Math.max(0, taxLiability - (formData.paidTax || 0)),
    });

    // Update the parent component with the calculated values
    updateTaxData({
      calculatedTax: taxLiability,
      paidTax: formData.paidTax || 0,
      balanceDue: Math.max(0, taxLiability - (formData.paidTax || 0)),
    });

    // Generate and download the PDF report
    generateTaxPDF(formData);
    
    localStorage.removeItem('taxFilingProgress');
    
    triggerSuccessfulSubmission();
    
    toast({
      title: "Tax return submitted!",
      description: "Your tax return has been successfully submitted to FBR and a PDF report has been downloaded.",
      duration: 5000,
      variant: "success",
    });
    
    setTimeout(() => navigate('/dashboard'), 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tax Return Filing</h1>
        <p className="text-muted-foreground">Complete your tax return for the tax year 2023-2024</p>
      </div>
      
      <TaxFormProgress currentStep={currentStep} steps={STEPS} />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <StepRenderer 
            stepId={STEPS[currentStep].id} 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleNestedChange={handleNestedChange} 
          />
        </CardContent>
        
        <CardFooter>
          <TaxFormStepNavigation
            currentStep={currentStep}
            steps={STEPS}
            prevStep={prevStep}
            nextStep={nextStep}
            saveProgress={saveProgress}
            handleSubmit={handleSubmit}
            savedProgress={savedProgress}
            penaltyUnderstanding={formData.penaltyUnderstanding}
          />
        </CardFooter>
      </Card>
      
      <div className="text-xs text-muted-foreground text-center">
        <p>Protected by Taxfix encryption. All information is stored securely.</p>
        <p className="mt-1">Need help? WhatsApp Taxfix helpline at 0321-4499907 or email at helpline@taxfix.pk</p>
      </div>
    </div>
  );
};

export default TaxFiling;
