
import { useState } from 'react';
import { TaxFormData } from '@/components/tax-filing/types';
import { initialTaxFormData } from '@/components/tax-filing/initialFormData';

export const useFormData = () => {
  const [formData, setFormData] = useState<TaxFormData>(initialTaxFormData);
  const [savedProgress, setSavedProgress] = useState(true);
  
  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSavedProgress(false);
  };
  
  const handleNestedChange = (category: string, field: string, value: boolean | string | number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev] as any,
        [field]: value
      }
    }));
    setSavedProgress(false);
  };

  return { 
    formData, 
    setFormData, 
    savedProgress, 
    setSavedProgress, 
    handleInputChange, 
    handleNestedChange 
  };
};
