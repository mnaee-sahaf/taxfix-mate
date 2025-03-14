
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LucideIcon } from 'lucide-react';

interface ExpenseToggleItemProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon: LucideIcon;
  iconColor: string;
}

const ExpenseToggleItem = ({
  id,
  label,
  checked,
  onCheckedChange,
  icon: Icon,
  iconColor
}: ExpenseToggleItemProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <div className="flex-1">
        <Label htmlFor={id} className="cursor-pointer">{label}</Label>
      </div>
      <Switch 
        id={id} 
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export default ExpenseToggleItem;
