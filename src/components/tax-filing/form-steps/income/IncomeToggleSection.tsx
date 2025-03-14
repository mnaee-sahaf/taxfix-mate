
import React from 'react';
import { Label } from '@/components/ui/label';
import IncomeToggleItem from './IncomeToggleItem';
import { 
  Briefcase, 
  Building2, 
  Home, 
  LandPlot, 
  TrendingUp, 
  Globe 
} from 'lucide-react';
import { TaxFormData } from '../../types';

interface IncomeToggleSectionProps {
  formData: TaxFormData;
  handleIncomeToggle: (field: keyof TaxFormData['incomeStreams']) => (checked: boolean) => void;
}

const IncomeToggleSection = ({ formData, handleIncomeToggle }: IncomeToggleSectionProps) => {
  const incomeConfig = [
    { id: 'salary', field: 'salary', label: 'Salary', icon: Briefcase, color: 'text-blue-500' },
    { id: 'business', field: 'business', label: 'Business', icon: Building2, color: 'text-green-500' },
    { id: 'rental', field: 'rental', label: 'Rental', icon: Home, color: 'text-purple-500' },
    { id: 'agricultural', field: 'agricultural', label: 'Agricultural', icon: LandPlot, color: 'text-orange-500' },
    { id: 'capitalGains', field: 'capitalGains', label: 'Capital Gains', icon: TrendingUp, color: 'text-red-500' },
    { id: 'foreign', field: 'foreign', label: 'Foreign', icon: Globe, color: 'text-indigo-500' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Select applicable income sources:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {incomeConfig.map(({ id, field, label, icon, color }) => (
          <IncomeToggleItem
            key={id}
            id={id}
            label={label}
            checked={formData.incomeStreams[field as keyof typeof formData.incomeStreams] || false}
            onCheckedChange={handleIncomeToggle(field as keyof typeof formData.incomeStreams)}
            icon={icon}
            iconColor={color}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeToggleSection;
