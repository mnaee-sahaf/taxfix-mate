
import { TaxFormData, TaxData } from '@/components/tax-filing/types';

export interface UseTaxFormProps {
  updateTaxData?: (data: TaxData) => void;
}

export interface UseTaxFormReturn {
  currentStep: number;
  formData: TaxFormData;
  savedProgress: boolean;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveProgress: () => void;
  handleSubmit: () => void;
}
