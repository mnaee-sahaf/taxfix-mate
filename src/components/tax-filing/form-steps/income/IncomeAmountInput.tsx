
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface IncomeAmountInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const IncomeAmountInput = ({ id, label, value, onChange, required }: IncomeAmountInputProps) => {
  return (
    <div className="space-y-2 pt-4">
      <div className="flex items-center gap-1">
        <Label htmlFor={id} className="text-base">{label}:</Label>
        {required && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-amber-500 ml-1">*</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>This field is required</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
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
