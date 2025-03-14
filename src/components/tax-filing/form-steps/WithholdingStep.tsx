
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TaxFormData } from '../types';

interface WithholdingStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const WithholdingStep = ({ formData, handleInputChange, handleNestedChange }: WithholdingStepProps) => {
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
    </div>
  );
};

export default WithholdingStep;
