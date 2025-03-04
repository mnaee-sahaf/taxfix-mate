
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

// Define the steps in the filing process
const STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Verify your personal details',
  },
  {
    id: 'income',
    title: 'Income Sources',
    description: 'Enter your income from various sources',
  },
  {
    id: 'deductions',
    title: 'Tax Deductions',
    description: 'Claim eligible deductions',
  },
  {
    id: 'investments',
    title: 'Investments',
    description: 'Enter your investment details',
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your information before submission',
  },
];

const TaxFiling = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [savedProgress, setSavedProgress] = useState(true);
  const [formData, setFormData] = useState({
    // Personal details
    fullName: 'Ahmed Khan',
    cnic: '34201-1234567-1',
    dob: '1985-04-15',
    address: '123 Defense Housing Authority, Karachi',
    phone: '+92 300 1234567',
    email: 'ahmed.khan@example.com',
    filingStatus: 'single',
    
    // Income sources
    salariedIncome: 1200000,
    businessIncome: 0,
    rentalIncome: 350000,
    otherIncome: 100000,
    
    // Deductions
    charityDonations: 50000,
    educationExpenses: 120000,
    healthInsurance: 60000,
    retirement: 80000,
    
    // Investments
    stocks: 250000,
    mutualFunds: 300000,
    governmentBonds: 150000,
    realEstate: 5000000,
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    // In a real application, this would save to backend
    toast({
      title: "Progress saved",
      description: "Your tax filing progress has been saved.",
      duration: 3000,
    });
    setSavedProgress(true);
  };
  
  const handleSubmit = () => {
    toast({
      title: "Tax return submitted!",
      description: "Your tax return has been successfully submitted to FBR.",
      duration: 5000,
    });
    setTimeout(() => navigate('/dashboard'), 2000);
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.round(((currentStep + 1) / STEPS.length) * 100);
  
  // Render current step content
  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as per CNIC)</Label>
                <Input 
                  id="fullName" 
                  value={formData.fullName} 
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input 
                  id="cnic" 
                  value={formData.cnic} 
                  onChange={(e) => handleInputChange('cnic', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  value={formData.dob} 
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="filingStatus">Filing Status</Label>
                <Select 
                  value={formData.filingStatus} 
                  onValueChange={(value) => handleInputChange('filingStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select filing status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="widow">Widow/Widower</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Residential Address</Label>
              <Input 
                id="address" 
                value={formData.address} 
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      
      case 'income':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="salariedIncome">Salaried Income (Annual in PKR)</Label>
              <Input 
                id="salariedIncome" 
                type="number" 
                value={formData.salariedIncome.toString()} 
                onChange={(e) => handleInputChange('salariedIncome', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessIncome">Business Income (Annual in PKR)</Label>
              <Input 
                id="businessIncome" 
                type="number" 
                value={formData.businessIncome.toString()} 
                onChange={(e) => handleInputChange('businessIncome', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rentalIncome">Rental Income (Annual in PKR)</Label>
              <Input 
                id="rentalIncome" 
                type="number" 
                value={formData.rentalIncome.toString()} 
                onChange={(e) => handleInputChange('rentalIncome', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otherIncome">Other Income (Annual in PKR)</Label>
              <Input 
                id="otherIncome" 
                type="number" 
                value={formData.otherIncome.toString()} 
                onChange={(e) => handleInputChange('otherIncome', Number(e.target.value))}
              />
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Total Annual Income</h3>
              <p className="text-2xl font-bold">
                PKR {
                  new Intl.NumberFormat('en-US').format(
                    formData.salariedIncome + 
                    formData.businessIncome + 
                    formData.rentalIncome + 
                    formData.otherIncome
                  )
                }
              </p>
            </div>
          </div>
        );
      
      case 'deductions':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="charityDonations">Charitable Donations (PKR)</Label>
              <Input 
                id="charityDonations" 
                type="number" 
                value={formData.charityDonations.toString()} 
                onChange={(e) => handleInputChange('charityDonations', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="educationExpenses">Education Expenses (PKR)</Label>
              <Input 
                id="educationExpenses" 
                type="number" 
                value={formData.educationExpenses.toString()} 
                onChange={(e) => handleInputChange('educationExpenses', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="healthInsurance">Health Insurance Premium (PKR)</Label>
              <Input 
                id="healthInsurance" 
                type="number" 
                value={formData.healthInsurance.toString()} 
                onChange={(e) => handleInputChange('healthInsurance', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retirement">Retirement Contributions (PKR)</Label>
              <Input 
                id="retirement" 
                type="number" 
                value={formData.retirement.toString()} 
                onChange={(e) => handleInputChange('retirement', Number(e.target.value))}
              />
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Total Claimed Deductions</h3>
              <p className="text-2xl font-bold">
                PKR {
                  new Intl.NumberFormat('en-US').format(
                    formData.charityDonations + 
                    formData.educationExpenses + 
                    formData.healthInsurance + 
                    formData.retirement
                  )
                }
              </p>
            </div>
          </div>
        );
      
      case 'investments':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="stocks">Stocks Investment Value (PKR)</Label>
              <Input 
                id="stocks" 
                type="number" 
                value={formData.stocks.toString()} 
                onChange={(e) => handleInputChange('stocks', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mutualFunds">Mutual Funds Investment (PKR)</Label>
              <Input 
                id="mutualFunds" 
                type="number" 
                value={formData.mutualFunds.toString()} 
                onChange={(e) => handleInputChange('mutualFunds', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="governmentBonds">Government Bonds (PKR)</Label>
              <Input 
                id="governmentBonds" 
                type="number" 
                value={formData.governmentBonds.toString()} 
                onChange={(e) => handleInputChange('governmentBonds', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="realEstate">Real Estate Investment Value (PKR)</Label>
              <Input 
                id="realEstate" 
                type="number" 
                value={formData.realEstate.toString()} 
                onChange={(e) => handleInputChange('realEstate', Number(e.target.value))}
              />
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Total Investment Portfolio</h3>
              <p className="text-2xl font-bold">
                PKR {
                  new Intl.NumberFormat('en-US').format(
                    formData.stocks + 
                    formData.mutualFunds + 
                    formData.governmentBonds + 
                    formData.realEstate
                  )
                }
              </p>
            </div>
          </div>
        );
      
      case 'review':
        // Calculate total income, deductions and tax liability
        const totalIncome = formData.salariedIncome + formData.businessIncome + 
                           formData.rentalIncome + formData.otherIncome;
        const totalDeductions = formData.charityDonations + formData.educationExpenses + 
                               formData.healthInsurance + formData.retirement;
        const taxableIncome = Math.max(0, totalIncome - totalDeductions);
        
        // Simple tax calculation (just for demo)
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
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CNIC:</span>
                    <span className="font-medium">{formData.cnic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filing Status:</span>
                    <span className="font-medium capitalize">{formData.filingStatus}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Income Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Income:</span>
                    <span className="font-medium">PKR {new Intl.NumberFormat('en-US').format(totalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Deductions:</span>
                    <span className="font-medium">PKR {new Intl.NumberFormat('en-US').format(totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxable Income:</span>
                    <span className="font-medium">PKR {new Intl.NumberFormat('en-US').format(taxableIncome)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg">Tax Liability:</span>
                    <span className="text-2xl font-bold">PKR {new Intl.NumberFormat('en-US').format(taxLiability)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax Rate:</span>
                    <span className="font-medium">{Math.round((taxLiability / taxableIncome) * 100) || 0}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-4">Declaration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                I hereby declare that the information provided in this tax return is correct and complete 
                to the best of my knowledge and belief. I understand that providing false information 
                is a violation of tax laws and may result in penalties.
              </p>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="declaration" className="rounded" />
                <Label htmlFor="declaration">I agree to the declaration</Label>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">2023 Tax Return</h1>
                <p className="text-muted-foreground">Complete your filing step by step</p>
              </div>
              
              <Button variant="outline" onClick={saveProgress} disabled={savedProgress}>
                <Save className="mr-2 h-4 w-4" />
                {savedProgress ? 'Progress Saved' : 'Save Progress'}
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}</span>
                <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="hidden md:flex justify-between items-center mb-8 text-sm">
              {STEPS.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center w-1/5 ${
                    index < currentStep ? 'text-primary' : 
                    index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                    index < currentStep ? 'bg-primary text-primary-foreground' : 
                    index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}>
                    {index < currentStep ? <Check className="h-4 w-4" /> : (index + 1)}
                  </div>
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{STEPS[currentStep].title}</CardTitle>
              <CardDescription>{STEPS[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" />
                  Submit Tax Return
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaxFiling;
