
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { triggerSuccessfulSubmission } from '@/utils/animations';
import TaxFormProgress from '@/components/tax-filing/TaxFormProgress';
import TaxFormStepNavigation from '@/components/tax-filing/TaxFormStepNavigation';
import StepRenderer from '@/components/tax-filing/StepRenderer';
import { TaxFormData, Step, TaxData, TaxFilingProps } from '@/components/tax-filing/types';

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
    title: 'Expenses',
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

const TaxFiling: React.FC<TaxFilingProps> = ({ updateTaxData }) => {
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
    
    // Add the missing properties
    expenses: {
      gas: false,
      electricity: false,
      water: false,
      telephone: false,
      medical: false,
      educational: false,
      travel: false,
      other: false
    },
    
    expenseAmounts: {
      gas: 0,
      electricity: 0,
      water: 0,
      telephone: 0,
      medical: 0,
      educational: 0,
      travel: 0,
      other: 0
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
    
    const taxData: TaxData = {
      calculatedTax: taxLiability,
      paidTax: formData.paidTax || 0,
      balanceDue: Math.max(0, taxLiability - (formData.paidTax || 0)),
    };
    
    console.log("Calculated Values:", taxData);

    // Call the updateTaxData callback if it exists
    if (updateTaxData) {
      updateTaxData(taxData);
    }

    // Generate the PDF
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
    
    // Ensure we navigate to the dashboard after submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 md:py-16 mt-16">
        <Card>
          <CardContent className="p-6">
            <TaxFormProgress 
              currentStep={currentStep} 
              steps={STEPS} 
            />
            
            <h2 className="text-2xl font-bold mb-2">{STEPS[currentStep].title}</h2>
            <p className="text-muted-foreground mb-6">{STEPS[currentStep].description}</p>
            
            <div className="py-4">
              <StepRenderer 
                stepId={STEPS[currentStep].id}
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedChange={handleNestedChange}
              />
            </div>
            
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
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TaxFiling;
