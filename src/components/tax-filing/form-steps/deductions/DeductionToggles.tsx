
import React from 'react';
import { Label } from '@/components/ui/label';
import DeductionToggleItem from './DeductionToggleItem';
import { 
  BookOpen,
  HeartPulse,
  GraduationCap,
  ScrollText,
  Landmark
} from 'lucide-react';
import { TaxFormData } from '../../types';

interface DeductionTogglesProps {
  formData: TaxFormData;
  handleDeductionToggle: (field: keyof TaxFormData['eligibleDeductions']) => (checked: boolean) => void;
}

const DeductionToggles = ({ formData, handleDeductionToggle }: DeductionTogglesProps) => {
  const deductionConfig = [
    { id: 'royaltyDeduction', field: 'royalty', label: 'Royalty', icon: BookOpen, color: 'text-purple-500' },
    { id: 'pensionDeduction', field: 'pension', label: 'Pension', icon: Landmark, color: 'text-blue-500' },
    { id: 'zakatDeduction', field: 'zakat', label: 'Zakat', icon: HeartPulse, color: 'text-green-500' },
    { id: 'charityDeduction', field: 'donations', label: 'Charity', icon: HeartPulse, color: 'text-red-500' },
    { id: 'educationDeduction', field: 'education', label: 'Educational Expenses', icon: GraduationCap, color: 'text-indigo-500' },
    { id: 'insuranceDeduction', field: 'lifeInsurance', label: 'Life Insurance', icon: ScrollText, color: 'text-amber-500' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Select applicable deductions:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {deductionConfig.map(({ id, field, label, icon, color }) => (
          <DeductionToggleItem
            key={id}
            id={id}
            label={label}
            checked={formData.eligibleDeductions?.[field as keyof typeof formData.eligibleDeductions] || false}
            onCheckedChange={handleDeductionToggle(field as keyof typeof formData.eligibleDeductions)}
            icon={icon}
            iconColor={color}
          />
        ))}
      </div>
    </div>
  );
};

export default DeductionToggles;
