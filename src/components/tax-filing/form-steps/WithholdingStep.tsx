
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import WithholdingNotes from './withholding/WithholdingNotes';

interface WithholdingStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const WithholdingStep = ({ formData, handleInputChange, handleNestedChange }: WithholdingStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Select applicable withholding taxes:</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="mobileBills" 
              checked={formData.withholdingTaxes.mobileBills}
              onCheckedChange={(checked) => handleNestedChange('withholdingTaxes', 'mobileBills', checked)}
            />
            <Label htmlFor="mobileBills" className="cursor-pointer">Mobile Bills</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="vehicleRegistration" 
              checked={formData.withholdingTaxes.vehicleRegistration}
              onCheckedChange={(checked) => handleNestedChange('withholdingTaxes', 'vehicleRegistration', checked)}
            />
            <Label htmlFor="vehicleRegistration" className="cursor-pointer">Vehicle Registration</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="electricityBills" 
              checked={formData.withholdingTaxes.electricityBills}
              onCheckedChange={(checked) => handleNestedChange('withholdingTaxes', 'electricityBills', checked)}
            />
            <Label htmlFor="electricityBills" className="cursor-pointer">Electricity Bills (WHT if {'>'} Rs. 25k/month)</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 pt-4">
        <Label htmlFor="paidTax" className="text-base">Total Tax Already Paid:</Label>
        <Input 
          id="paidTax" 
          type="number" 
          value={formData.paidTax.toString()} 
          onChange={(e) => handleInputChange('paidTax', Number(e.target.value))}
          placeholder="0"
        />
      </div>

      <Tabs defaultValue="withholding-form" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="withholding-form">Withholding Details</TabsTrigger>
          <TabsTrigger value="withholding-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="withholding-form">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm">Report all withholding taxes paid to reduce your final tax liability.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="withholding-notes">
          <WithholdingNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WithholdingStep;
