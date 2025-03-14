
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import DeductionNotes from './deductions/DeductionNotes';
import DeductionToggles from './deductions/DeductionToggles';
import DeductionValues from './deductions/DeductionValues';

interface DeductionsStepProps {
  formData: TaxFormData;
  handleInputChange?: (name: string, value: string | number | boolean) => void;
  handleNestedChange?: (category: string, field: string, value: boolean | string | number) => void;
}

const DeductionsStep = ({ 
  formData, 
  handleInputChange, 
  handleNestedChange 
}: DeductionsStepProps) => {
  const [activeTab, setActiveTab] = useState('deductions-form');
  
  const handleDeductionToggle = (field: keyof TaxFormData['eligibleDeductions']) => (checked: boolean) => {
    if (handleNestedChange) {
      handleNestedChange('eligibleDeductions', field, checked);
    }
  };

  const handleDeductionAmountChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleInputChange) {
      handleInputChange(field, Number(e.target.value) || 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm">Claim all eligible deductions to reduce your taxable income.</p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full pt-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deductions-form">Deduction Details</TabsTrigger>
          <TabsTrigger value="deductions-notes">Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deductions-form">
          <div className="space-y-6">
            <DeductionToggles 
              formData={formData} 
              handleDeductionToggle={handleDeductionToggle} 
            />
            
            {Object.values(formData.eligibleDeductions || {}).some(Boolean) && (
              <DeductionValues 
                formData={formData} 
                handleDeductionAmountChange={handleDeductionAmountChange} 
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="deductions-notes">
          <DeductionNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeductionsStep;
