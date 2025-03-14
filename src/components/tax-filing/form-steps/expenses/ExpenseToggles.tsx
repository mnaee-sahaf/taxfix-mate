
import React from 'react';
import { Label } from '@/components/ui/label';
import ExpenseToggleItem from './ExpenseToggleItem';
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
import { TaxFormData } from '../../types';

interface ExpenseTogglesProps {
  formData: TaxFormData;
  handleExpenseToggle: (field: keyof typeof formData.expenses) => (checked: boolean) => void;
}

const ExpenseToggles = ({ formData, handleExpenseToggle }: ExpenseTogglesProps) => {
  const expenseConfig = [
    { id: 'gasExpense', field: 'gas', label: 'Gas', icon: Flame, color: 'text-orange-500' },
    { id: 'electricityExpense', field: 'electricity', label: 'Electricity', icon: Zap, color: 'text-yellow-500' },
    { id: 'waterExpense', field: 'water', label: 'Water', icon: Droplet, color: 'text-blue-500' },
    { id: 'telephoneExpense', field: 'telephone', label: 'Telephone', icon: Phone, color: 'text-green-500' },
    { id: 'medicalExpense', field: 'medical', label: 'Medical', icon: Stethoscope, color: 'text-red-500' },
    { id: 'educationalExpense', field: 'educational', label: 'Educational', icon: GraduationCap, color: 'text-indigo-500' },
    { id: 'travelExpense', field: 'travel', label: 'Travel', icon: Plane, color: 'text-purple-500' },
    { id: 'otherExpense', field: 'other', label: 'Other', icon: HelpCircle, color: 'text-gray-500' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Select all applicable expenses:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {expenseConfig.map(({ id, field, label, icon, color }) => (
          <ExpenseToggleItem
            key={id}
            id={id}
            label={label}
            checked={formData.expenses?.[field as keyof typeof formData.expenses] || false}
            onCheckedChange={handleExpenseToggle(field as keyof typeof formData.expenses)}
            icon={icon}
            iconColor={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseToggles;
