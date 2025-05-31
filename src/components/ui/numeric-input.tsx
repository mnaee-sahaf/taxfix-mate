import React from 'react';
import { Input } from '@/components/ui/input';
import { useLogger } from '@/hooks/useLogger';

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  min?: number;
  max?: number;
  decimalPlaces?: number;
  label?: string;
  error?: string;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  onValidationChange,
  min,
  max,
  decimalPlaces = 2,
  label,
  error,
  ...props
}) => {
  const logger = useLogger('NumericInput');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Allow empty input
    if (input === '') {
      onChange('');
      onValidationChange?.(true);
      return;
    }

    // Validate numeric input with optional decimals
    const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
    if (!regex.test(input)) {
      logger.warn('Invalid numeric input', { input }, 'validation');
      return;
    }

    // Convert to number for validation
    const numValue = parseFloat(input);
    
    // Validate min/max if provided
    if (
      (min !== undefined && numValue < min) ||
      (max !== undefined && numValue > max)
    ) {
      logger.warn('Value outside allowed range', { value: numValue, min, max }, 'validation');
      return;
    }

    onChange(input);
    onValidationChange?.(true);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <Input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
