
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import ExpenseToggles from './expenses/ExpenseToggles';
import ExpenseValues from './expenses/ExpenseValues';
import ExpenseNotes from './expenses/ExpenseNotes';

interface ExpensesStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const ExpensesStep = ({ formData, handleInputChange, handleNestedChange }: ExpensesStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  // Initialize expenses and expenseAmounts if they don't exist
  if (!formData.expenses) {
    // Instead of using handleInputChange for an object, initialize each field individually
    const defaultExpenses = {
      gas: false,
      electricity: false,
      water: false,
      telephone: false,
      medical: false,
      educational: false,
      travel: false,
      other: false
    };
    
    Object.entries(defaultExpenses).forEach(([key, value]) => {
      handleNestedChange('expenses', key, value);
    });
  }

  if (!formData.expenseAmounts) {
    // Instead of using handleInputChange for an object, initialize each field individually
    const defaultExpenseAmounts = {
      gas: 0,
      electricity: 0,
      water: 0,
      telephone: 0,
      medical: 0,
      educational: 0,
      travel: 0,
      other: 0
    };
    
    Object.entries(defaultExpenseAmounts).forEach(([key, value]) => {
      handleNestedChange('expenseAmounts', key, value);
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
      <ExpenseToggles 
        formData={formData} 
        handleExpenseToggle={handleExpenseToggle} 
      />
      
      <Tabs defaultValue="expense-values" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense-values">Expense Values</TabsTrigger>
          <TabsTrigger value="expense-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expense-values">
          <ExpenseValues 
            formData={formData} 
            handleExpenseAmountChange={handleExpenseAmountChange} 
          />
        </TabsContent>
        
        <TabsContent value="expense-notes">
          <ExpenseNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensesStep;
