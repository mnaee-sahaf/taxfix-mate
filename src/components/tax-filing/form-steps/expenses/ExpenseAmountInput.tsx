
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExpenseAmountInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpenseAmountInput = ({
  id,
  label,
  value,
  onChange
}: ExpenseAmountInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} 
        type="number" 
        placeholder="Enter amount" 
        value={value === 0 ? '' : value} 
        onChange={onChange}
      />
    </div>
  );
};

export default ExpenseAmountInput;
