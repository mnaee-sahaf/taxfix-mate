
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WithholdingAmountInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WithholdingAmountInput = ({
  id,
  label,
  value,
  onChange
}: WithholdingAmountInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} 
        type="number" 
        placeholder="Enter amount in PKR" 
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default WithholdingAmountInput;
