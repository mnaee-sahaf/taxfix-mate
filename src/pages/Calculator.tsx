
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Calculator as CalculatorIcon, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CalculatorTab = () => {
  const [salary, setSalary] = useState<number>(0);
  const [rental, setRental] = useState<number>(0);
  const [business, setBusiness] = useState<number>(0);
  const [capital, setCapital] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [taxDeductions, setTaxDeductions] = useState<number>(0);
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null);
  
  const calculateTax = () => {
    // Simple tax calculation for demonstration
    const totalIncome = salary + rental + business + capital + other;
    const taxableIncome = Math.max(0, totalIncome - taxDeductions);
    
    // Simplified tax slab for demonstration
    let tax = 0;
    
    if (taxableIncome <= 600000) {
      tax = 0;
    } else if (taxableIncome <= 1200000) {
      tax = (taxableIncome - 600000) * 0.05;
    } else if (taxableIncome <= 2400000) {
      tax = 30000 + (taxableIncome - 1200000) * 0.1;
    } else if (taxableIncome <= 3600000) {
      tax = 150000 + (taxableIncome - 2400000) * 0.15;
    } else if (taxableIncome <= 6000000) {
      tax = 330000 + (taxableIncome - 3600000) * 0.2;
    } else if (taxableIncome <= 12000000) {
      tax = 810000 + (taxableIncome - 6000000) * 0.25;
    } else {
      tax = 2310000 + (taxableIncome - 12000000) * 0.32;
    }
    
    setCalculatedTax(tax);
  };
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', { 
      style: 'currency', 
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  return (
    <div className="animate-fade-up space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Income Details</CardTitle>
          <CardDescription>Enter your annual income from different sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Income</Label>
              <Input 
                id="salary" 
                type="number" 
                placeholder="0" 
                value={salary || ''}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rental">Rental Income</Label>
              <Input 
                id="rental" 
                type="number" 
                placeholder="0" 
                value={rental || ''}
                onChange={(e) => setRental(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business">Business Income</Label>
              <Input 
                id="business" 
                type="number" 
                placeholder="0" 
                value={business || ''}
                onChange={(e) => setBusiness(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capital">Capital Gains</Label>
              <Input 
                id="capital" 
                type="number" 
                placeholder="0" 
                value={capital || ''}
                onChange={(e) => setCapital(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other">Other Income</Label>
              <Input 
                id="other" 
                type="number" 
                placeholder="0" 
                value={other || ''}
                onChange={(e) => setOther(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deductions">Tax Deductions & Credits</Label>
              <Input 
                id="deductions" 
                type="number" 
                placeholder="0" 
                value={taxDeductions || ''}
                onChange={(e) => setTaxDeductions(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateTax} className="button-shine">
            <CalculatorIcon className="mr-2 h-4 w-4" />
            Calculate Tax
          </Button>
        </CardFooter>
      </Card>
      
      {calculatedTax !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Tax Calculation Results</CardTitle>
            <CardDescription>Based on the income details you provided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg p-4 bg-secondary/50">
                <div className="text-muted-foreground text-sm">Total Income</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(salary + rental + business + capital + other)}
                </div>
              </div>
              <div className="rounded-lg p-4 bg-secondary/50">
                <div className="text-muted-foreground text-sm">Taxable Income</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(Math.max(0, salary + rental + business + capital + other - taxDeductions))}
                </div>
              </div>
              <div className="rounded-lg p-4 bg-secondary/50">
                <div className="text-muted-foreground text-sm">Total Deductions</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(taxDeductions)}
                </div>
              </div>
              <div className="rounded-lg p-4 bg-primary/20">
                <div className="text-primary text-sm font-medium">Estimated Tax Liability</div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(calculatedTax)}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg border border-border flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  This is an estimated calculation based on the information provided. 
                  Actual tax liability may vary. For a more accurate calculation and 
                  filing, please consider using our full tax filing service.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button>File Your Taxes</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

const WHTab = () => (
  <div className="animate-fade-up">
    <Card>
      <CardHeader>
        <CardTitle>Withholding Tax Calculator</CardTitle>
        <CardDescription>Calculate withholding tax for different transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="transaction-type">Transaction Type</Label>
          <Select>
            <SelectTrigger id="transaction-type">
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="banking">Banking Transactions</SelectItem>
              <SelectItem value="salary">Salary Payment</SelectItem>
              <SelectItem value="supplier">Supplier Payment</SelectItem>
              <SelectItem value="services">Services Payment</SelectItem>
              <SelectItem value="property">Property Sale/Purchase</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transaction-amount">Transaction Amount (PKR)</Label>
          <Input id="transaction-amount" type="number" placeholder="0" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="withholding-agent">Withholding Agent Type</Label>
          <Select>
            <SelectTrigger id="withholding-agent">
              <SelectValue placeholder="Select agent type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="aop">Association of Persons</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tax-status">Tax Status</Label>
          <Select>
            <SelectTrigger id="tax-status">
              <SelectValue placeholder="Select tax status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="filer">Filer</SelectItem>
              <SelectItem value="non-filer">Non-Filer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full button-shine">
          <CalculatorIcon className="mr-2 h-4 w-4" />
          Calculate Withholding Tax
        </Button>
      </CardContent>
    </Card>
  </div>
);

const CalculatorPage = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // For authenticated users, don't show navbar and footer
  if (isAuthenticated) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-down">
            <h1 className="text-2xl font-bold mb-2">Tax Calculator</h1>
            <p className="text-muted-foreground">
              Estimate your tax liability with our easy-to-use calculators
            </p>
          </div>
          
          <Tabs defaultValue="income-tax" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="income-tax">Income Tax Calculator</TabsTrigger>
              <TabsTrigger value="withholding-tax">Withholding Tax</TabsTrigger>
            </TabsList>
            
            <TabsContent value="income-tax">
              <CalculatorTab />
            </TabsContent>
            
            <TabsContent value="withholding-tax">
              <WHTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // For non-authenticated users, show the original layout with navbar and footer
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-fade-down">
              <h1 className="text-3xl font-bold mb-2">Tax Calculator</h1>
              <p className="text-muted-foreground">
                Estimate your tax liability with our easy-to-use calculators
              </p>
            </div>
            
            <Tabs defaultValue="income-tax" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                value="income-tax"
                className="py-2 rounded-md transition-colors duration-300 data-[state=active]:bg-green-100 data-[state=active]:text-black"
                >
                  Income Tax Calculator</TabsTrigger>
                <TabsTrigger 
                value="withholding-tax"
                className="py-2 rounded-md transition-colors duration-300 data-[state=active]:bg-green-100 data-[state=active]:text-black"
                >
                  Withholding Tax</TabsTrigger>
              </TabsList>
              
              <TabsContent value="income-tax">
                <CalculatorTab />
              </TabsContent>
              
              <TabsContent value="withholding-tax">
                <WHTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalculatorPage;
