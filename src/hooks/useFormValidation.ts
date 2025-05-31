// src/hooks/useFormValidation.ts
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { ValidationResult, ValidationError } from '@/utils/validation';
import { logger } from '@/utils/logger';
import { useLogger } from './useLogger';

export const useFormValidation = (componentName: string) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const logger = useLogger(componentName);

  const validateField = useCallback((
    value: any,
    schema: z.ZodTypeAny,
    fieldName: string
  ): ValidationResult => {
    try {
      schema.parse(value);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: fieldName,
          message: err.message
        }));
        
        logger.warn(
          `Validation failed for ${fieldName}`,
          { value, errors: validationErrors },
          'validation'
        );
        
        return { isValid: false, errors: validationErrors };
      }
      return { isValid: false, errors: [{ field: fieldName, message: 'Invalid value' }] };
    }
  }, [logger]);

  const validateForm = useCallback((
    data: Record<string, any>,
    schema: Record<string, z.ZodTypeAny>
  ): ValidationResult => {
    const allErrors: ValidationError[] = [];
    let isValid = true;

    Object.entries(schema).forEach(([field, fieldSchema]) => {
      const result = validateField(data[field], fieldSchema, field);
      if (!result.isValid) {
        isValid = false;
        allErrors.push(...result.errors);
      }
    });

    setErrors(allErrors);
    return { isValid, errors: allErrors };
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  };
};