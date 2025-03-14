import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Save, Check, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { triggerSuccessfulSubmission } from '@/utils/animations';

const STEPS = [
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

const TaxFiling = ({ updateTaxData }) => {

  if (!updateTaxData) {
    console.error("updateTaxData is not defined!");
    return null;
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [savedProgress, setSavedProgress] = useState(true);
  const [formData, setFormData] = useState({
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
  
  const progressPercentage = Math.round(((currentStep + 1) / STEPS.length) * 100);
  
  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'identification':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cnic" className="text-base">Provide your 13-digit Computerized National Identity Card (CNIC) number</Label>
                <p className="text-sm text-muted-foreground">Enter without hyphens. This is mandatory for FBR registration.</p>
                <Input 
                  id="cnic" 
                  value={formData.cnic} 
                  onChange={(e) => handleInputChange('cnic', e.target.value)}
                  placeholder="3420112345671"
                  maxLength={13}
                />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label className="text-base">Is this your first time filing taxes through digital channels?</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch 
                    id="firstTimeFiler" 
                    checked={formData.firstTimeFiler}
                    onCheckedChange={(checked) => handleInputChange('firstTimeFiler', checked)}
                  />
                  <Label htmlFor="firstTimeFiler" className="cursor-pointer">
                    {formData.firstTimeFiler ? 'Yes (you will receive guided onboarding)' : 'No'}
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="taxpayerCategory" className="text-base">Select your taxpayer category:</Label>
                <Select 
                  value={formData.taxpayerCategory} 
                  onValueChange={(value) => handleInputChange('taxpayerCategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your taxpayer category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried-low">Salaried Individual (Basic Salary ≤ Rs. 100k)</SelectItem>
                    <SelectItem value="salaried-high">Salaried Individual (Basic Salary {'>'} Rs. 100k)</SelectItem>
                    <SelectItem value="business">Business Owner/Professional</SelectItem>
                    <SelectItem value="aop">Association of Persons (AOP)</SelectItem>
                    <SelectItem value="non-resident">Non-Resident Pakistani</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 'residency':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="residencyDays" className="text-base">How many days did you physically reside in Pakistan during this tax year?</Label>
                <Input 
                  id="residencyDays" 
                  type="number" 
                  value={formData.residencyDays.toString()} 
                  onChange={(e) => {
                    const days = Number(e.target.value);
                    let status = '';
                    
                    if (days < 120) status = 'non-resident';
                    else if (days < 183) status = 'conditional';
                    else status = 'resident';
                    
                    handleInputChange('residencyDays', days);
                    handleInputChange('residencyStatus', status);
                  }}
                  min="0"
                  max="366"
                />
                <div className="px-3 py-2 bg-secondary/40 rounded mt-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-primary" />
                    <span>
                      {formData.residencyDays < 120 ? 
                        "You are considered a Non-Resident for tax purposes." : 
                        formData.residencyDays < 183 ? 
                        "You are considered a Conditional Resident for tax purposes." : 
                        "You are considered a Resident for tax purposes."}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label className="text-base">Have you been a government employee posted abroad this tax year?</Label>
                <p className="text-sm text-muted-foreground">If yes, you are automatically classified as a resident per FBR rules.</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch 
                    id="governmentEmployee" 
                    checked={formData.governmentEmployee}
                    onCheckedChange={(checked) => {
                      handleInputChange('governmentEmployee', checked);
                      if (checked) {
                        handleInputChange('residencyStatus', 'resident');
                      } else {
                        const days = formData.residencyDays;
                        let status = '';
                        
                        if (days < 120) status = 'non-resident';
                        else if (days < 183) status = 'conditional';
                        else status = 'resident';
                        
                        handleInputChange('residencyStatus', status);
                      }
                    }}
                  />
                  <Label htmlFor="governmentEmployee" className="cursor-pointer">
                    {formData.governmentEmployee ? 'Yes' : 'No'}
                  </Label>
                </div>
                
                {formData.governmentEmployee && (
                  <div className="px-3 py-2 bg-green-100 dark:bg-green-900/20 rounded mt-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400" />
                      <span>You are automatically classified as a resident for tax purposes.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'income':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base">Select all applicable income sources:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="salary" 
                    checked={formData.incomeStreams.salary}
                    onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'salary', checked)}
                  />
                  <Label htmlFor="salary" className="cursor-pointer">Salary/Wages</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="business" 
                    checked={formData.incomeStreams.business}
                    onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'business', checked)}
                  />
                  <Label htmlFor="business" className="cursor-pointer">Business Income</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="rental" 
                    checked={formData.incomeStreams.rental}
                    onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'rental', checked)}
                  />
                  <Label htmlFor="rental" className="cursor-pointer">Rental Income</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="agricultural" 
                    checked={formData.incomeStreams.agricultural}
                    onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'agricultural', checked)}
                  />
                  <Label htmlFor="agricultural" className="cursor-pointer">Agricultural Income</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="capitalGains" 
                    checked={formData.incomeStreams.capitalGains}
                    onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'capitalGains', checked)}
                  />
                  <Label htmlFor="capitalGains" className="cursor-pointer">Capital Gains</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="foreign" 
                    checked={formData.incomeStreams.foreign}
                    onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'foreign', checked)}
                  />
                  <Label htmlFor="foreign" className="cursor-pointer">Foreign Income</Label>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="income-values" className="w-full pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="income-values">Income Values</TabsTrigger>
                <TabsTrigger value="income-details">Additional Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="income-values" className="space-y-4 pt-4">
                {formData.incomeStreams.salary && (
                  <div className="space-y-2">
                    <Label htmlFor="salaryIncome">Salary/Wages Income (Annual in PKR)</Label>
                    <Input 
                      id="salaryIncome" 
                      type="number" 
                      value={formData.salaryIncome.toString()} 
                      onChange={(e) => handleInputChange('salaryIncome', Number(e.target.value))}
                    />
                  </div>
                )}
                
                {formData.incomeStreams.business && (
                  <div className="space-y-2">
                    <Label htmlFor="businessIncome">Business Income (Annual in PKR)</Label>
                    <Input 
                      id="businessIncome" 
                      type="number" 
                      value={formData.businessIncome.toString()} 
                      onChange={(e) => handleInputChange('businessIncome', Number(e.target.value))}
                    />
                  </div>
                )}
                
                {formData.incomeStreams.rental && (
                  <div className="space-y-2">
                    <Label htmlFor="rentalIncome">Rental Income (Annual in PKR)</Label>
                    <Input 
                      id="rentalIncome" 
                      type="number" 
                      value={formData.rentalIncome.toString()} 
                      onChange={(e) => handleInputChange('rentalIncome', Number(e.target.value))}
                    />
                  </div>
                )}
                
                {formData.incomeStreams.agricultural && (
                  <div className="space-y-2">
                    <Label htmlFor="agriculturalIncome">Agricultural Income (Annual in PKR)</Label>
                    <Input 
                      id="agriculturalIncome" 
                      type="number" 
                      value={formData.agriculturalIncome.toString()} 
                      onChange={(e) => handleInputChange('agriculturalIncome', Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">Note: Exempt up to Rs. 4.8M</p>
                  </div>
                )}
                
                {formData.incomeStreams.capitalGains && (
                  <div className="space-y-2">
                    <Label htmlFor="capitalGainsIncome">Capital Gains Income (Annual in PKR)</Label>
                    <Input 
                      id="capitalGainsIncome" 
                      type="number" 
                      value={formData.capitalGainsIncome.toString()} 
                      onChange={(e) => handleInputChange('capitalGainsIncome', Number(e.target.value))}
                    />
                  </div>
                )}
                
                {formData.incomeStreams.foreign && (
                  <div className="space-y-2">
                    <Label htmlFor="foreignIncome">Foreign Income (Annual in PKR)</Label>
                    <Input 
                      id="foreignIncome" 
                      type="number" 
                      value={formData.foreignIncome.toString()} 
                      onChange={(e) => handleInputChange('foreignIncome', Number(e.target.value))}
                    />
                  </div>
                )}
                
                <div className="p-4 bg-secondary/30 rounded-lg mt-4">
                  <h3 className="font-medium mb-2">Total Annual Income</h3>
                  <p className="text-2xl font-bold">
                    PKR {
                      new Intl.NumberFormat('en-US').format(
                        (formData.incomeStreams.salary ? formData.salaryIncome : 0) + 
                        (formData.incomeStreams.business ? formData.businessIncome : 0) + 
                        (formData.incomeStreams.rental ? formData.rentalIncome : 0) + 
                        (formData.incomeStreams.agricultural ? formData.agriculturalIncome : 0) + 
                        (formData.incomeStreams.capitalGains ? formData.capitalGainsIncome : 0) + 
                        (formData.incomeStreams.foreign ? formData.foreignIncome : 0)
                      )
                    }
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="income-details" className="space-y-4 pt-4">
                {formData.incomeStreams.salary && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-base">Does your employer deduct withholding tax at source?</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Switch 
                          id="employerWithholdingTax" 
                          checked={formData.employerWithholdingTax}
                          onCheckedChange={(checked) => handleInputChange('employerWithholdingTax', checked)}
                        />
                        <Label htmlFor="employerWithholdingTax" className="cursor-pointer">
                          {formData.employerWithholdingTax ? 'Yes (please provide monthly deduction certificates)' : 'No (we will calculate advance tax liability)'}
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <Label className="text-base">Select tax-exempt allowances you receive:</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="conveyance" 
                            checked={formData.taxExemptAllowances.conveyance}
                            onCheckedChange={(checked) => handleNestedChange('taxExemptAllowances', 'conveyance', checked)}
                          />
                          <Label htmlFor="conveyance" className="cursor-pointer">Conveyance (up to Rs. 7,200/month exempt)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="medical" 
                            checked={formData.taxExemptAllowances.medical}
                            onCheckedChange={(checked) => handleNestedChange('taxExemptAllowances', 'medical', checked)}
                          />
                          <Label htmlFor="medical" className="cursor-pointer">Medical (up to 10% of basic salary)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="houseRent" 
                            checked={formData.taxExemptAllowances.houseRent}
                            onCheckedChange={(checked) => handleNestedChange('taxExemptAllowances', 'houseRent', checked)}
                          />
                          <Label htmlFor="houseRent" className="cursor-pointer">House Rent (50% of basic salary exempt)</Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {formData.incomeStreams.business && (
                  <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm">For business income, please attach your audited P&L statement in the next step.</p>
                  </div>
                )}
                
                {formData.incomeStreams.rental && (
                  <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">For rental income, you'll need to provide lease agreements in the next step.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'expenses':
        return (
          <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Select all applicable expenses:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="salary" 
                  checked={formData.incomeStreams.salary}
                  onCheckedChange={(checked) => handleNestedChange('expenseType', 'utility', checked)}
                />
                <Label htmlFor="salary" className="cursor-pointer">Salary/Wages</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="business" 
                  checked={formData.incomeStreams.business}
                  onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'business', checked)}
                />
                <Label htmlFor="business" className="cursor-pointer">Business Income</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="rental" 
                  checked={formData.incomeStreams.rental}
                  onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'rental', checked)}
                />
                <Label htmlFor="rental" className="cursor-pointer">Rental Income</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="agricultural" 
                  checked={formData.incomeStreams.agricultural}
                  onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'agricultural', checked)}
                />
                <Label htmlFor="agricultural" className="cursor-pointer">Agricultural Income</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="capitalGains" 
                  checked={formData.incomeStreams.capitalGains}
                  onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'capitalGains', checked)}
                />
                <Label htmlFor="capitalGains" className="cursor-pointer">Capital Gains</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="foreign" 
                  checked={formData.incomeStreams.foreign}
                  onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'foreign', checked)}
                />
                <Label htmlFor="foreign" className="cursor-pointer">Foreign Income</Label>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="income-values" className="w-full pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="income-values">Income Values</TabsTrigger>
              <TabsTrigger value="income-details">Additional Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="income-values" className="space-y-4 pt-4">
              {formData.incomeStreams.salary && (
                <div className="space-y-2">
                  <Label htmlFor="salaryIncome">Salary/Wages Income (Annual in PKR)</Label>
                  <Input 
                    id="salaryIncome" 
                    type="number" 
                    value={formData.salaryIncome.toString()} 
                    onChange={(e) => handleInputChange('salaryIncome', Number(e.target.value))}
                  />
                </div>
              )}
              
              {formData.incomeStreams.business && (
                <div className="space-y-2">
                  <Label htmlFor="businessIncome">Business Income (Annual in PKR)</Label>
                  <Input 
                    id="businessIncome" 
                    type="number" 
                    value={formData.businessIncome.toString()} 
                    onChange={(e) => handleInputChange('businessIncome', Number(e.target.value))}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="income-details" className="space-y-4 pt-4">
              <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm">Additional expense details will be implemented in the next version.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        );

      case 'deductions':
        return (
          <div className="space-y-6">
            <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm">Deductions section is under development.</p>
            </div>
          </div>
        );
        
      case 'assets':
        return (
          <div className="space-y-6">
            <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm">Assets section is under development.</p>
            </div>
          </div>
        );
        
      case 'withholding':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base">Select applicable withholding taxes:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="mobileBills" 
                    checked={formData.withholdingTaxes.mobileBills}
                    onCheckedChange={(checked) => handleNestedChange('withholdingTaxes', 'mobileBills', checked)}
                  />
                  <Label htmlFor="mobileBills" className="cursor-pointer">Mobile Bills</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="vehicleRegistration" 
                    checked={formData.withholdingTaxes.vehicleRegistration}
                    onCheckedChange={(checked) => handleNestedChange('withholdingTaxes', 'vehicleRegistration', checked)}
                  />
                  <Label htmlFor="vehicleRegistration" className="cursor-pointer">Vehicle Registration</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="electricityBills" 
                    checked={formData.withholdingTaxes.electricityBills}
                    onCheckedChange={(checked) => handleNestedChange('withholdingTaxes', 'electricityBills', checked)}
                  />
                  <Label htmlFor="electricityBills" className="cursor-pointer">Electricity Bills (WHT if {'>'}Rs. 25k/month)</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <Label htmlFor="paidTax" className="text-base">Total Tax Already Paid:</Label>
              <Input 
                id="paidTax" 
                type="number" 
                value={formData.paidTax.toString()} 
                onChange={(e) => handleInputChange('paidTax', Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Review Your Information</h3>
              <p className="text-sm text-muted-foreground mb-4">Please review the information you've provided before final submission.</p>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">CNIC:</span> 
                  <span className="text-sm ml-2">{formData.cnic}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Taxpayer Category:</span> 
                  <span className="text-sm ml-2">{formData.taxpayerCategory}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Residency Status:</span> 
                  <span className="text-sm ml-2">{formData.residencyStatus
