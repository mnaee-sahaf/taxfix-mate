
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TaxFormData } from '../../types';

interface IncomeToggleSectionProps {
  formData: TaxFormData;
  handleIncomeToggle: (field: keyof typeof formData.incomeStreams) => (checked: boolean) => void;
}

const IncomeToggleSection = ({ formData, handleIncomeToggle }: IncomeToggleSectionProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base">Select applicable income sources:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="salary" 
            checked={formData.incomeStreams.salary}
            onCheckedChange={handleIncomeToggle('salary')}
          />
          <Label htmlFor="salary" className="cursor-pointer">Salary</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="business" 
            checked={formData.incomeStreams.business}
            onCheckedChange={handleIncomeToggle('business')}
          />
          <Label htmlFor="business" className="cursor-pointer">Business</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="rental" 
            checked={formData.incomeStreams.rental}
            onCheckedChange={handleIncomeToggle('rental')}
          />
          <Label htmlFor="rental" className="cursor-pointer">Rental</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="agricultural" 
            checked={formData.incomeStreams.agricultural}
            onCheckedChange={handleIncomeToggle('agricultural')}
          />
          <Label htmlFor="agricultural" className="cursor-pointer">Agricultural</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="capitalGains" 
            checked={formData.incomeStreams.capitalGains}
            onCheckedChange={handleIncomeToggle('capitalGains')}
          />
          <Label htmlFor="capitalGains" className="cursor-pointer">Capital Gains</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="foreign" 
            checked={formData.incomeStreams.foreign}
            onCheckedChange={handleIncomeToggle('foreign')}
          />
          <Label htmlFor="foreign" className="cursor-pointer">Foreign</Label>
        </div>
      </div>
    </div>
  );
};

export default IncomeToggleSection;
