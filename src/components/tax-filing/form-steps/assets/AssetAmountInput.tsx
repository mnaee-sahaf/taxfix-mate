
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AssetAmountInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssetAmountInput = ({
  id,
  label,
  value,
  onChange
}: AssetAmountInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} 
        type="number" 
        placeholder="Enter value in PKR" 
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default AssetAmountInput;
