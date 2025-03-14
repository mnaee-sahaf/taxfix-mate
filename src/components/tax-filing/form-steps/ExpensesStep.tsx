
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import { 
  Flame, 
  Zap, 
  Droplet, 
  Phone, 
  Stethoscope, 
  GraduationCap, 
  Plane, 
  HelpCircle 
} from 'lucide-react';

interface ExpensesStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const ExpensesStep = ({ formData, handleInputChange, handleNestedChange }: ExpensesStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  // Initialize expenses and expenseAmounts if they don't exist
  if (!formData.expenses) {
    handleInputChange('expenses', {
      gas: false,
      electricity: false,
      water: false,
      telephone: false,
      medical: false,
      educational: false,
      travel: false,
      other: false
    });
  }

  if (!formData.expenseAmounts) {
    handleInputChange('expenseAmounts', {
      gas: 0,
      electricity: 0,
      water: 0,
      telephone: 0,
      medical: 0,
      educational: 0,
      travel: 0,
      other: 0
    });
  }

  const handleExpenseToggle = (field: keyof typeof formData.expenses) => (checked: boolean) => {
    handleNestedChange('expenses', field, checked);
  };

  const handleExpenseAmountChange = (field: keyof typeof formData.expenseAmounts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('expenseAmounts', field, Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-medium">Select all applicable expenses:</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <Flame className="h-5 w-5 text-orange-500" />
            <div className="flex-1">
              <Label htmlFor="gasExpense" className="cursor-pointer">Gas</Label>
            </div>
            <Switch 
              id="gasExpense" 
              checked={formData.expenses?.gas || false}
              onCheckedChange={handleExpenseToggle('gas')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <Zap className="h-5 w-5 text-yellow-500" />
            <div className="flex-1">
              <Label htmlFor="electricityExpense" className="cursor-pointer">Electricity</Label>
            </div>
            <Switch 
              id="electricityExpense" 
              checked={formData.expenses?.electricity || false}
              onCheckedChange={handleExpenseToggle('electricity')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <Droplet className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <Label htmlFor="waterExpense" className="cursor-pointer">Water</Label>
            </div>
            <Switch 
              id="waterExpense" 
              checked={formData.expenses?.water || false}
              onCheckedChange={handleExpenseToggle('water')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <Phone className="h-5 w-5 text-green-500" />
            <div className="flex-1">
              <Label htmlFor="telephoneExpense" className="cursor-pointer">Telephone</Label>
            </div>
            <Switch 
              id="telephoneExpense" 
              checked={formData.expenses?.telephone || false}
              onCheckedChange={handleExpenseToggle('telephone')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <Stethoscope className="h-5 w-5 text-red-500" />
            <div className="flex-1">
              <Label htmlFor="medicalExpense" className="cursor-pointer">Medical</Label>
            </div>
            <Switch 
              id="medicalExpense" 
              checked={formData.expenses?.medical || false}
              onCheckedChange={handleExpenseToggle('medical')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <GraduationCap className="h-5 w-5 text-indigo-500" />
            <div className="flex-1">
              <Label htmlFor="educationalExpense" className="cursor-pointer">Educational</Label>
            </div>
            <Switch 
              id="educationalExpense" 
              checked={formData.expenses?.educational || false}
              onCheckedChange={handleExpenseToggle('educational')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <Plane className="h-5 w-5 text-purple-500" />
            <div className="flex-1">
              <Label htmlFor="travelExpense" className="cursor-pointer">Travel</Label>
            </div>
            <Switch 
              id="travelExpense" 
              checked={formData.expenses?.travel || false}
              onCheckedChange={handleExpenseToggle('travel')}
            />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
            <HelpCircle className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <Label htmlFor="otherExpense" className="cursor-pointer">Other</Label>
            </div>
            <Switch 
              id="otherExpense" 
              checked={formData.expenses?.other || false}
              onCheckedChange={handleExpenseToggle('other')}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="expense-values" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense-values">Expense Values</TabsTrigger>
          <TabsTrigger value="expense-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expense-values" className="space-y-4 pt-4">
          {formData.expenses?.gas && (
            <div className="space-y-2">
              <Label htmlFor="gasAmount">Gas Expenses (Annual in PKR)</Label>
              <Input 
                id="gasAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.gas || 0} 
                onChange={handleExpenseAmountChange('gas')}
              />
            </div>
          )}
          
          {formData.expenses?.electricity && (
            <div className="space-y-2">
              <Label htmlFor="electricityAmount">Electricity Expenses (Annual in PKR)</Label>
              <Input 
                id="electricityAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.electricity || 0} 
                onChange={handleExpenseAmountChange('electricity')}
              />
            </div>
          )}
          
          {formData.expenses?.water && (
            <div className="space-y-2">
              <Label htmlFor="waterAmount">Water Expenses (Annual in PKR)</Label>
              <Input 
                id="waterAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.water || 0} 
                onChange={handleExpenseAmountChange('water')}
              />
            </div>
          )}
          
          {formData.expenses?.telephone && (
            <div className="space-y-2">
              <Label htmlFor="telephoneAmount">Telephone Expenses (Annual in PKR)</Label>
              <Input 
                id="telephoneAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.telephone || 0} 
                onChange={handleExpenseAmountChange('telephone')}
              />
            </div>
          )}
          
          {formData.expenses?.medical && (
            <div className="space-y-2">
              <Label htmlFor="medicalAmount">Medical Expenses (Annual in PKR)</Label>
              <Input 
                id="medicalAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.medical || 0} 
                onChange={handleExpenseAmountChange('medical')}
              />
            </div>
          )}
          
          {formData.expenses?.educational && (
            <div className="space-y-2">
              <Label htmlFor="educationalAmount">Educational Expenses (Annual in PKR)</Label>
              <Input 
                id="educationalAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.educational || 0} 
                onChange={handleExpenseAmountChange('educational')}
              />
            </div>
          )}
          
          {formData.expenses?.travel && (
            <div className="space-y-2">
              <Label htmlFor="travelAmount">Travel Expenses (Annual in PKR)</Label>
              <Input 
                id="travelAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.travel || 0} 
                onChange={handleExpenseAmountChange('travel')}
              />
            </div>
          )}
          
          {formData.expenses?.other && (
            <div className="space-y-2">
              <Label htmlFor="otherAmount">Other Expenses (Annual in PKR)</Label>
              <Input 
                id="otherAmount" 
                type="number" 
                placeholder="Enter amount" 
                value={formData.expenseAmounts?.other || 0} 
                onChange={handleExpenseAmountChange('other')}
              />
            </div>
          )}
          
          {!Object.values(formData.expenses || {}).some(Boolean) && (
            <div className="px-4 py-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Please select at least one expense type to enter values.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="expense-notes" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="expenseNotes">Additional Notes</Label>
            <Textarea 
              id="expenseNotes" 
              placeholder="Enter any additional information about your expenses..."
              className="min-h-[120px]"
            />
          </div>
          
          <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Note: Keep all expense receipts for at least 5 years for potential audit purposes.
              Some expenses may require additional documentation to qualify for tax deductions.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensesStep;
