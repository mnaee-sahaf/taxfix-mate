
import React from 'react';
import { Label } from '@/components/ui/label';
import WithholdingToggleItem from './WithholdingToggleItem';
import { 
  Briefcase, 
  CreditCard, 
  Zap, 
  Phone, 
  Car, 
  Receipt 
} from 'lucide-react';
import { TaxFormData } from '../../types';

interface WithholdingTogglesProps {
  formData: TaxFormData;
  handleWithholdingToggle: (field: keyof TaxFormData['withholding']) => (checked: boolean) => void;
}

const WithholdingToggles = ({ formData, handleWithholdingToggle }: WithholdingTogglesProps) => {
  const withholdingConfig = [
    { id: 'salary', field: 'salary', label: 'Salary Tax', icon: Briefcase, color: 'text-blue-500' },
    { id: 'bankTransactions', field: 'bankTransactions', label: 'Bank Transactions', icon: CreditCard, color: 'text-green-500' },
    { id: 'utilities', field: 'utilities', label: 'Utility Bills', icon: Zap, color: 'text-yellow-500' },
    { id: 'mobilePhone', field: 'mobilePhone', label: 'Mobile Phone', icon: Phone, color: 'text-purple-500' },
    { id: 'vehicleTax', field: 'vehicleTax', label: 'Vehicle Tax', icon: Car, color: 'text-red-500' },
    { id: 'otherTaxes', field: 'otherTaxes', label: 'Other Taxes', icon: Receipt, color: 'text-gray-500' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Select applicable withholding taxes:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {withholdingConfig.map(({ id, field, label, icon, color }) => (
          <WithholdingToggleItem
            key={id}
            id={id}
            label={label}
            checked={formData.withholding?.[field as keyof typeof formData.withholding] || false}
            onCheckedChange={handleWithholdingToggle(field as keyof typeof formData.withholding)}
            icon={icon}
            iconColor={color}
          />
        ))}
      </div>
    </div>
  );
};

export default WithholdingToggles;
