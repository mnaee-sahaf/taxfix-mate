
import { useState, useEffect } from 'react';
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

  // No need to initialize here now that it's in initialFormData

  const handleExpenseToggle = (field: keyof typeof formData.expenses) => (checked: boolean) => {
    handleNestedChange('expenses', field, checked);
  };

  const handleExpenseAmountChange = (field: keyof typeof formData.expenseAmounts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('expenseAmounts', field, Number(e.target.value));
  };

  return (
    <div className="space-y-6 pb-6">
      <ExpenseNotes />
      <ExpenseToggles 
        formData={formData} 
        handleExpenseToggle={handleExpenseToggle} 
      />

      <ExpenseValues 
            formData={formData} 
            handleExpenseAmountChange={handleExpenseAmountChange} 
          />
  
    </div>
  );
};

export default ExpensesStep;
