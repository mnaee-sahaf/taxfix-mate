// src/utils/validation.ts
import { z } from 'zod';

// CNIC validation (13 digits)
export const cnicSchema = z.string()
  .length(13, 'CNIC must be exactly 13 digits')
  .regex(/^\d+$/, 'CNIC must contain only numbers');

// Amount validation (positive number with optional decimals)
export const amountSchema = z.number()
  .positive('Amount must be positive')
  .max(99999999, 'Amount exceeds maximum limit');

// Percentage validation (0-100)
export const percentageSchema = z.number()
  .min(0, 'Percentage must be at least 0')
  .max(100, 'Percentage cannot exceed 100');

// Date validation
export const dateSchema = z.date()
  .min(new Date('1900-01-01'), 'Date too old')
  .max(new Date(), 'Date cannot be in the future');

// Validation error type
export type ValidationError = {
  field: string;
  message: string;
};

// Validation result type
export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};