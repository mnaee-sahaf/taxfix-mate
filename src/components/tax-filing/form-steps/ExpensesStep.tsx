
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';

interface ExpensesStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const ExpensesStep = ({ formData, handleInputChange, handleNestedChange }: ExpensesStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Select all applicable expenses:</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="utilityExpense" 
              checked={formData.incomeStreams.salary}
              onCheckedChange={(checked) => handleNestedChange('expenseType', 'utility', checked)}
            />
            <Label htmlFor="utilityExpense" className="cursor-pointer">Utility Expenses</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="businessExpenses" 
              checked={formData.incomeStreams.business}
              onCheckedChange={(checked) => handleNestedChange('expenseType', 'business', checked)}
            />
            <Label htmlFor="businessExpenses" className="cursor-pointer">Business Expenses</Label>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="expense-values" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense-values">Expense Values</TabsTrigger>
          <TabsTrigger value="expense-details">Additional Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expense-values" className="space-y-4 pt-4">
          {formData.incomeStreams.salary && (
            <div className="space-y-2">
              <Label htmlFor="salaryExpenses">Salary-related Expenses (Annual in PKR)</Label>
              <Input 
                id="salaryExpenses" 
                type="number" 
                value={formData.salaryIncome.toString()} 
                onChange={(e) => handleInputChange('salaryIncome', Number(e.target.value))}
              />
            </div>
          )}
          
          {formData.incomeStreams.business && (
            <div className="space-y-2">
              <Label htmlFor="businessExpenses">Business Expenses (Annual in PKR)</Label>
              <Input 
                id="businessExpenses" 
                type="number" 
                value={formData.businessIncome.toString()} 
                onChange={(e) => handleInputChange('businessIncome', Number(e.target.value))}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="expense-details" className="space-y-4 pt-4">
          <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm">Additional expense details will be implemented in the next version.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensesStep;
