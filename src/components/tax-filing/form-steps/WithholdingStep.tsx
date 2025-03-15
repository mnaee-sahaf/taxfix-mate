
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import WithholdingNotes from './withholding/WithholdingNotes';
import WithholdingToggles from './withholding/WithholdingToggles';
import WithholdingValues from './withholding/WithholdingValues';

interface WithholdingStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const WithholdingStep = ({ formData, handleInputChange, handleNestedChange }: WithholdingStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  // Initialize withholding and withholdingAmounts if they don't exist
  if (!formData.withholding) {
    const defaultWithholding = {
      salary: false,
      bankTransactions: false,
      utilities: false,
      mobilePhone: false,
      vehicleTax: false,
      otherTaxes: false
    };
    
    Object.entries(defaultWithholding).forEach(([key, value]) => {
      handleNestedChange('withholding', key, value);
    });
  }

  if (!formData.withholdingAmounts) {
    const defaultWithholdingAmounts = {
      salary: 0,
      bankTransactions: 0,
      utilities: 0,
      mobilePhone: 0,
      vehicleTax: 0,
      otherTaxes: 0
    };
    
    Object.entries(defaultWithholdingAmounts).forEach(([key, value]) => {
      handleNestedChange('withholdingAmounts', key, value);
    });
  }

  const handleWithholdingToggle = (field: keyof typeof formData.withholding) => (checked: boolean) => {
    handleNestedChange('withholding', field, checked);
  };

  const handleWithholdingAmountChange = (field: keyof typeof formData.withholdingAmounts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('withholdingAmounts', field, Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm">Enter all withholding taxes paid during the tax year to calculate your final tax liability.</p>
      </div>

      <WithholdingToggles 
        formData={formData} 
        handleWithholdingToggle={handleWithholdingToggle} 
      />
      
      <Tabs defaultValue="withholding-values" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="withholding-values">Withholding Values</TabsTrigger>
          <TabsTrigger value="withholding-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="withholding-values">
          <WithholdingValues 
            formData={formData} 
            handleWithholdingAmountChange={handleWithholdingAmountChange} 
          />
        </TabsContent>
        
        <TabsContent value="withholding-notes">
          <WithholdingNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WithholdingStep;
