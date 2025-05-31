
import React from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import IdentificationNotes from './identification/IdentificationNotes';
import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormValidation } from '@/hooks/useFormValidation';
import { cnicSchema } from '@/utils/validation';
import { useLogger } from '@/hooks/useLogger';

interface IdentificationStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const IdentificationStep = ({ formData, handleInputChange, onValidationChange }: IdentificationStepProps) => {
  const [activeTab, setActiveTab] = useState('identification-form');
  const logger = useLogger('IdentificationStep');
  const { errors, validateField } = useFormValidation('IdentificationStep');

  const handleCNICChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      logger.warn('Non-numeric input attempted in CNIC field', { value }, 'input');
      return;
    }

    // Validate CNIC
    const result = validateField(value, cnicSchema, 'cnic');
    onValidationChange?.(result.isValid);
    
    handleInputChange('cnic', value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Basic name validation (letters, spaces, and common name characters)
    if (!/^[a-zA-Z\s\-'\.]*$/.test(value)) {
      logger.warn('Invalid characters in name field', { value }, 'input');
      return;
    }
    
    handleInputChange('name', value);
  };

  return (
    <div className="space-y-6 mb-6">
      <IdentificationNotes />
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="name" className="text-base">Full Name (as per CNIC)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-amber-500 ml-1">*</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please enter your full name as it appears on your CNIC</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={handleNameChange}
            placeholder="Muhammad Ahmed"
            required
          />
          {errors.find(e => e.field === 'name') && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find(e => e.field === 'name')?.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="cnic" className="text-base">Provide your 13-digit Computerized National Identity Card (CNIC) number</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-amber-500 ml-1">*</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your CNIC number is required for tax filing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-muted-foreground">Enter without hyphens. This is mandatory for FBR registration.</p>
          <Input 
            id="cnic" 
            value={formData.cnic} 
            onChange={handleCNICChange}
            placeholder="3420112345671"
            maxLength={13}
            required
          />
          {errors.find(e => e.field === 'cnic') && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find(e => e.field === 'cnic')?.message}
            </p>
          )}
        </div>
        
        {/* <div className="space-y-2 pt-4">
          <Label className="text-base">Is this your first time filing taxes through digital channels?</Label>
          <div className="flex items-center space-x-2 mt-2">
            <Switch 
              id="firstTimeFiler" 
              checked={formData.firstTimeFiler}
              onCheckedChange={(checked) => handleInputChange('firstTimeFiler', checked)}
            />
            <Label htmlFor="firstTimeFiler" className="cursor-pointer">
              {formData.firstTimeFiler ? 'Yes (you will receive guided onboarding)' : 'No'}
            </Label>
          </div>
        </div>
         */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-1">
            <Label htmlFor="taxpayerCategory" className="text-base">Select your taxpayer category:</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-amber-500 ml-1">*</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please select your taxpayer category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select 
            value={formData.taxpayerCategory} 
            onValueChange={(value) => handleInputChange('taxpayerCategory', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your taxpayer category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salaried-low">Salaried Individual (Basic Salary ≤ Rs. 100k)</SelectItem>
              <SelectItem value="salaried-high">Salaried Individual (Basic Salary {'>'} Rs. 100k)</SelectItem>
              <SelectItem value="business">Business Owner/Professional</SelectItem>
              <SelectItem value="aop">Association of Persons (AOP)</SelectItem>
              <SelectItem value="non-resident">Non-Resident Pakistani</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm">Please ensure all identification details match your NADRA official records</p>
      </div> */}
    </div>
  );
};

export default IdentificationStep;
