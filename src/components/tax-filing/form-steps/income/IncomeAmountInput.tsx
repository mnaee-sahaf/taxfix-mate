
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IncomeAmountInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IncomeAmountInput = ({ id, label, value, onChange }: IncomeAmountInputProps) => {
  return (
    <div className="space-y-2 pt-4">
      <Label htmlFor={id} className="text-base">{label}:</Label>
      <Input 
        id={id} 
        type="number" 
        value={value === '0' ? '' : value}
        onChange={onChange}
        placeholder="0"
      />
    </div>
  );
};

export default IncomeAmountInput;
