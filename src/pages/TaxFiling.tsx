<lov-code>
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

// Local storage key for saving tax filing data
const TAX_FILING_STORAGE_KEY = 'tax_filing_data';

const TaxFiling = () => {
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
    paymentMethod: 'bank-transfer'
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(TAX_FILING_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData.formData);
        setCurrentStep(parsedData.currentStep || 0);
        toast({
          title: "Progress loaded",
          description: "Your previous tax filing progress has been loaded.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error loading saved tax filing data:", error);
      }
    }
    
    window.scrollTo(0, 0);
  }, []);
  
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
    // Save to localStorage
    const dataToSave = {
      formData,
      currentStep,
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem(TAX_FILING_STORAGE_KEY, JSON.stringify(dataToSave));
    
    toast({
      title: "Progress saved",
      description: "Your tax filing progress has been saved to your browser.",
      duration: 3000,
    });
    setSavedProgress(true);
  };
  
  const handleSubmit = () => {
    generateTaxPDF(formData);
    
    // Clear saved progress after successful submission
    localStorage.removeItem(TAX_FILING_STORAGE_KEY);
    
    toast({
      title: "Tax return submitted!",
      description: "Your tax return has been successfully submitted to FBR and a PDF report has been downloaded.",
      duration: 5000,
    });
    
    setTimeout(() => navigate('/dashboard'), 2000);
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
                    <SelectItem value="salaried-high">Salaried Individual (Basic Salary > Rs. 100k)</SelectItem>
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
      
      case 'deductions':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base">Select eligible deductions under Section 63:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="lifeInsurance" 
                    checked={formData.eligibleDeductions.lifeInsurance}
                    onCheckedChange={(checked) => handleNestedChange('eligibleDeductions', 'lifeInsurance', checked)}
                  />
                  <Label htmlFor="lifeInsurance" className="cursor-pointer">Life Insurance Premiums (7% of insured value)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="pension" 
                    checked={formData.eligibleDeductions.pension}
                    onCheckedChange={(checked) => handleNestedChange('eligibleDeductions', 'pension', checked)}
                  />
                  <Label htmlFor="pension" className="cursor-pointer">Voluntary Pension Schemes (up to Rs. 600k)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="donations" 
                    checked={formData.eligibleDeductions.donations}
                    onCheckedChange={(checked) => handleNestedChange('eligibleDeductions', 'donations', checked)}
                  />
                  <Label htmlFor="donations" className="cursor-pointer">Charitable Donations (Zakat exempt)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="education" 
                    checked={formData.eligibleDeductions.education}
                    onCheckedChange={(checked) => handleNestedChange('eligibleDeductions', 'education', checked)}
                  />
                  <Label htmlFor="education" className="cursor-pointer">Higher Education Expenses (children)</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              {formData.eligibleDeductions.lifeInsurance && (
                <div className="space-y-2">
                  <Label htmlFor="lifeInsuranceAmount">Life Insurance Premium Amount (PKR)</Label>
                  <Input 
                    id="lifeInsuranceAmount" 
                    type="number" 
                    value={formData.lifeInsuranceAmount.toString()} 
                    onChange={(e) => handleInputChange('lifeInsuranceAmount', Number(e.target.value))}
                  />
                </div>
              )}
              
              {formData.eligibleDeductions.pension && (
                <div className="space-y-2">
                  <Label htmlFor="pensionAmount">Voluntary Pension Contribution (PKR)</Label>
                  <Input 
                    id="pensionAmount" 
                    type="number" 
                    value={formData.pensionAmount.toString()} 
                    onChange={(e) => handleInputChange('pensionAmount', Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">Maximum deductible amount: Rs. 600,000</p>
                </div>
              )}
              
              {formData.eligibleDeductions.donations && (
                <div className="space-y-2">
                  <Label htmlFor="donationAmount">Charitable Donations (PKR)</Label>
                  <Input 
                    id="donationAmount" 
                    type="number" 
                    value={formData.donationAmount.toString()} 
                    onChange={(e) => handleInputChange('donationAmount', Number(e.target.value))}
                  />
                </div>
              )}
              
              {formData.eligibleDeductions.education && (
                <div className="space-y-2">
                  <Label htmlFor="educationAmount">Higher Education Expenses (PKR)</Label>
                  <Input 
                    id="educationAmount" 
                    type="number" 
                    value={formData.educationAmount.toString()} 
                    onChange={(e) => handleInputChange('educationAmount', Number(e.target.value))}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 pt-4">
              <Label className="text-base">Do you qualify for any special tax credits?</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="firstTimeFilerCredit" 
                    checked={formData.specialTaxCredits.firstTimeFiler}
                    onCheckedChange={(checked) => handleNestedChange('specialTaxCredits', 'firstTimeFiler', checked)}
                  />
                  <Label htmlFor="firstTimeFilerCredit" className="cursor-pointer">First-Time Filer (Rs. 50k credit)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="itSector" 
                    checked={formData.specialTaxCredits.itSector}
                    onCheckedChange={(checked) => handleNestedChange('specialTaxCredits', 'itSector', checked)}
                  />
                  <Label htmlFor="itSector" className="cursor-pointer">IT Sector Employee (15% reduced rate)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="exportIndustry" 
                    checked={formData.specialTaxCredits.exportIndustry}
                    onCheckedChange={(checked) => handleNestedChange('specialTaxCredits', 'exportIndustry', checked)}
                  />
                  <Label htmlFor="exportIndustry" className="cursor-pointer">Export Industry Worker (tax exemptions)</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg mt-4">
              <h3 className="font-medium mb-2">Total Claimed Deductions</h3>
              <p className="text-2xl font-bold">
                PKR {
                  new Intl.NumberFormat('en-US').format(
                    (formData.eligibleDeductions.lifeInsurance ? formData.lifeInsuranceAmount : 0) + 
                    (formData.eligibleDeductions.pension ? formData.pensionAmount : 0) + 
                    (formData.eligibleDeductions.donations ? formData.donationAmount : 0) + 
                    (formData.eligibleDeductions.education ? formData.educationAmount : 0)
                  )
                }
              </p>
            </div>
          </div>
        );
      
      case 'assets':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Bank Account Details</h3>
              <p className="text-sm text-muted-foreground">Provide all Pakistani bank accounts held between July 2024-June 2025.</p>
              
              <div className="space-y-4 border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input 
                      id="bankName" 
                      value={formData.bankAccounts[0].bankName} 
                      onChange={(e) => {
                        const updatedAccounts = [...formData.bankAccounts];
                        updatedAccounts[0].bankName = e.target.value;
                        handleInputChange('bankAccounts', updatedAccounts);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number (IBAN format)</Label>
                    <Input 
                      id="accountNumber" 
                      value={formData.bankAccounts[0].accountNumber} 
                      onChange={(e) => {
                        const updatedAccounts = [...formData.bankAccounts];
                        updatedAccounts[0].accountNumber = e.target.value;
                        handleInputChange('bankAccounts', updatedAccounts);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentBalance">Current Balance (PKR)</Label>
                    <Input 
                      id="currentBalance" 
                      type="number"
                      value={formData.bankAccounts[0].currentBalance.toString()} 
                      onChange={(e) => {
                        const updatedAccounts = [...formData.bankAccounts];
                        updatedAccounts[0].currentBalance = Number(e.target.value);
                        handleInputChange('bankAccounts', updatedAccounts);
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" type="button">
                    + Add Another Account
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-base font-medium">Immovable Property Holdings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="residential" 
                    checked={formData.immovableProperty.residential}
                    onCheckedChange={(checked) => handleNestedChange('immovableProperty', 'residential', checked)}
                  />
                  <Label htmlFor="residential" className="cursor-pointer">Residential (exempt if single self-owned)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="commercial" 
                    checked={formData.immovableProperty.commercial}
                    onCheckedChange={(checked) => handleNestedChange('immovableProperty', 'commercial', checked)}
                  />
                  <Label htmlFor="commercial" className="cursor-pointer">Commercial (declare rental income)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="agriculturalProperty" 
                    checked={formData.immovableProperty.agricultural}
                    onCheckedChange={(checked) => handleNestedChange('immovableProperty', 'agricultural', checked)}
                  />
                  <Label htmlFor="agriculturalProperty" className="cursor-pointer">Agricultural (exempt up to 50 acres)</Label>
                </div>
              </div>
              
              {formData.immovableProperty.commercial && (
                <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg mt-2">
                  <p className="text-sm">Please ensure you've declared all rental income from commercial property in the Income section.</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'withholding':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base">Select withholding taxes you've paid this year:</Label>
