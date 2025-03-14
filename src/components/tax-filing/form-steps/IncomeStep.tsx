
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import IncomeNotes from './income/IncomeNotes';

interface IncomeStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const IncomeStep = ({ formData, handleInputChange, handleNestedChange }: IncomeStepProps) => {
  const [showNotes, setShowNotes] = useState(false);
  
  // Initialize incomeStreams if it doesn't exist
  if (!formData.incomeStreams) {
    const defaultIncomeStreams = {
      salary: false,
      business: false,
      rental: false,
      agricultural: false,
      capitalGains: false,
      foreign: false
    };
    
    Object.entries(defaultIncomeStreams).forEach(([key, value]) => {
      handleNestedChange('incomeStreams', key, value);
    });
  }

  // Initialize income amounts if they don't exist
  if (!formData.incomeAmounts) {
    const defaultIncomeAmounts = {
      salaryIncome: 0,
      businessIncome: 0,
      rentalIncome: 0,
      agriculturalIncome: 0,
      capitalGainsIncome: 0,
      foreignIncome: 0
    };
    
    Object.entries(defaultIncomeAmounts).forEach(([key, value]) => {
      handleNestedChange('incomeAmounts', key, value);
    });
  }

  const handleIncomeToggle = (field: keyof typeof formData.incomeStreams) => (checked: boolean) => {
    handleNestedChange('incomeStreams', field, checked);
  };

  const handleIncomeAmountChange = (field: keyof typeof formData.incomeAmounts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('incomeAmounts', field as string, Number(e.target.value));
  };
  
  return (
    <div className="space-y-6">
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
      
      {formData.incomeStreams.salary && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="salaryIncome" className="text-base">Salary Income:</Label>
          <Input 
            id="salaryIncome" 
            type="number" 
            value={formData.incomeAmounts.salaryIncome.toString()}
            onChange={handleIncomeAmountChange('salaryIncome')}
            placeholder="0"
          />
        </div>
      )}

      {formData.incomeStreams.business && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="businessIncome" className="text-base">Business Income:</Label>
          <Input 
            id="businessIncome" 
            type="number" 
            value={formData.incomeAmounts.businessIncome.toString()}
            onChange={handleIncomeAmountChange('businessIncome')}
            placeholder="0"
          />
        </div>
      )}

      {formData.incomeStreams.rental && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="rentalIncome" className="text-base">Rental Income:</Label>
          <Input 
            id="rentalIncome" 
            type="number" 
            value={formData.incomeAmounts.rentalIncome.toString()}
            onChange={handleIncomeAmountChange('rentalIncome')}
            placeholder="0"
          />
        </div>
      )}

      {formData.incomeStreams.agricultural && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="agriculturalIncome" className="text-base">Agricultural Income:</Label>
          <Input 
            id="agriculturalIncome" 
            type="number" 
            value={formData.incomeAmounts.agriculturalIncome.toString()}
            onChange={handleIncomeAmountChange('agriculturalIncome')}
            placeholder="0"
          />
        </div>
      )}

      {formData.incomeStreams.capitalGains && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="capitalGainsIncome" className="text-base">Capital Gains Income:</Label>
          <Input 
            id="capitalGainsIncome" 
            type="number" 
            value={formData.incomeAmounts.capitalGainsIncome.toString()}
            onChange={handleIncomeAmountChange('capitalGainsIncome')}
            placeholder="0"
          />
        </div>
      )}

      {formData.incomeStreams.foreign && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="foreignIncome" className="text-base">Foreign Income:</Label>
          <Input 
            id="foreignIncome" 
            type="number" 
            value={formData.incomeAmounts.foreignIncome.toString()}
            onChange={handleIncomeAmountChange('foreignIncome')}
            placeholder="0"
          />
        </div>
      )}
      
      <Tabs defaultValue="income-form" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income-form">Income Details</TabsTrigger>
          <TabsTrigger value="income-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="income-form">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm">Please ensure you report all income sources accurately as per FBR guidelines.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="income-notes">
          <IncomeNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncomeStep;
