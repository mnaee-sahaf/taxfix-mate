
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TaxFormData } from '../types';

interface IdentificationStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
}

const IdentificationStep = ({ formData, handleInputChange }: IdentificationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cnic" className="text-base">Provide your 13-digit Computerized National Identity Card (CNIC) number</Label>
          <p className="text-sm text-muted-foreground">Enter without hyphens. This is mandatory for FBR registration.</p>
          <Input 
            id="cnic" 
            value={formData.cnic} 
            onChange={(e) => handleInputChange('cnic', e.target.value)}
            placeholder="3420112345671"
            maxLength={13}
          />
        </div>
        
        <div className="space-y-2 pt-4">
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
        
        <div className="space-y-2 pt-4">
          <Label htmlFor="taxpayerCategory" className="text-base">Select your taxpayer category:</Label>
          <Select 
            value={formData.taxpayerCategory} 
            onValueChange={(value) => handleInputChange('taxpayerCategory', value)}
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
    </div>
  );
};

export default IdentificationStep;
