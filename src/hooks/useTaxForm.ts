
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TaxFormData } from '@/components/tax-filing/types';
import { initialTaxFormData } from '@/components/tax-filing/initialFormData';
import { useFormNavigation } from './tax-form/useFormNavigation';
import { useFormData } from './tax-form/useFormData';
import { useFormPersistence } from './tax-form/useFormPersistence';
import { useFormSubmission } from './tax-form/useFormSubmission';
import { UseTaxFormProps, UseTaxFormReturn } from './tax-form/types';

export const useTaxForm = ({ updateTaxData }: UseTaxFormProps): UseTaxFormReturn => {
  const { user, isAuthenticated } = useAuth();
  const { currentStep, nextStep, prevStep } = useFormNavigation();
  const { 
    formData, 
    setFormData, 
    savedProgress, 
    setSavedProgress, 
    handleInputChange, 
    handleNestedChange 
  } = useFormData();
  
  const { saveProgress, loadSavedData } = useFormPersistence({ 
    formData, 
    setSavedProgress, 
    user, 
    isAuthenticated 
  });
  
  const { handleSubmit } = useFormSubmission({
    formData,
    user,
    isAuthenticated,
    updateTaxData
  });

  // Load saved form data if available
  useEffect(() => {
    const fetchSavedData = async () => {
      const savedFormData = await loadSavedData();
      if (savedFormData) {
        setFormData(savedFormData);
      }
    };
    
    fetchSavedData();
  }, [isAuthenticated, user]);
  
  return {
    currentStep,
    formData,
    savedProgress,
    handleInputChange,
    handleNestedChange,
    nextStep,
    prevStep,
    saveProgress,
    handleSubmit
  };
};
