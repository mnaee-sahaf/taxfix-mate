
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';

interface IncomeStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const IncomeStep = ({ formData, handleInputChange, handleNestedChange }: IncomeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Select all applicable income sources:</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="salary" 
              checked={formData.incomeStreams.salary}
              onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'salary', checked)}
            />
            <Label htmlFor="salary" className="cursor-pointer">Salary/Wages</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="business" 
              checked={formData.incomeStreams.business}
              onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'business', checked)}
            />
            <Label htmlFor="business" className="cursor-pointer">Business Income</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="rental" 
              checked={formData.incomeStreams.rental}
              onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'rental', checked)}
            />
            <Label htmlFor="rental" className="cursor-pointer">Rental Income</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="agricultural" 
              checked={formData.incomeStreams.agricultural}
              onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'agricultural', checked)}
            />
            <Label htmlFor="agricultural" className="cursor-pointer">Agricultural Income</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="capitalGains" 
              checked={formData.incomeStreams.capitalGains}
              onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'capitalGains', checked)}
            />
            <Label htmlFor="capitalGains" className="cursor-pointer">Capital Gains</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="foreign" 
              checked={formData.incomeStreams.foreign}
              onCheckedChange={(checked) => handleNestedChange('incomeStreams', 'foreign', checked)}
            />
            <Label htmlFor="foreign" className="cursor-pointer">Foreign Income</Label>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="income-values" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income-values">Income Values</TabsTrigger>
          <TabsTrigger value="income-details">Additional Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="income-values" className="space-y-4 pt-4">
          {formData.incomeStreams.salary && (
            <div className="space-y-2">
              <Label htmlFor="salaryIncome">Salary/Wages Income (Annual in PKR)</Label>
              <Input 
                id="salaryIncome" 
                type="number" 
                value={formData.salaryIncome.toString()} 
                onChange={(e) => handleInputChange('salaryIncome', Number(e.target.value))}
              />
            </div>
          )}
          
          {formData.incomeStreams.business && (
            <div className="space-y-2">
              <Label htmlFor="businessIncome">Business Income (Annual in PKR)</Label>
              <Input 
                id="businessIncome" 
                type="number" 
                value={formData.businessIncome.toString()} 
                onChange={(e) => handleInputChange('businessIncome', Number(e.target.value))}
              />
            </div>
          )}
          
          {formData.incomeStreams.rental && (
            <div className="space-y-2">
              <Label htmlFor="rentalIncome">Rental Income (Annual in PKR)</Label>
              <Input 
                id="rentalIncome" 
                type="number" 
                value={formData.rentalIncome.toString()} 
                onChange={(e) => handleInputChange('rentalIncome', Number(e.target.value))}
              />
            </div>
          )}
          
          {formData.incomeStreams.agricultural && (
            <div className="space-y-2">
              <Label htmlFor="agriculturalIncome">Agricultural Income (Annual in PKR)</Label>
              <Input 
                id="agriculturalIncome" 
                type="number" 
                value={formData.agriculturalIncome.toString()} 
                onChange={(e) => handleInputChange('agriculturalIncome', Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Note: Exempt up to Rs. 4.8M</p>
            </div>
          )}
          
          {formData.incomeStreams.capitalGains && (
            <div className="space-y-2">
              <Label htmlFor="capitalGainsIncome">Capital Gains Income (Annual in PKR)</Label>
              <Input 
                id="capitalGainsIncome" 
                type="number" 
                value={formData.capitalGainsIncome.toString()} 
                onChange={(e) => handleInputChange('capitalGainsIncome', Number(e.target.value))}
              />
            </div>
          )}
          
          {formData.incomeStreams.foreign && (
            <div className="space-y-2">
              <Label htmlFor="foreignIncome">Foreign Income (Annual in PKR)</Label>
              <Input 
                id="foreignIncome" 
                type="number" 
                value={formData.foreignIncome.toString()} 
                onChange={(e) => handleInputChange('foreignIncome', Number(e.target.value))}
              />
            </div>
          )}
          
          <div className="p-4 bg-secondary/30 rounded-lg mt-4">
            <h3 className="font-medium mb-2">Total Annual Income</h3>
            <p className="text-2xl font-bold">
              PKR {
                new Intl.NumberFormat('en-US').format(
                  (formData.incomeStreams.salary ? formData.salaryIncome : 0) + 
                  (formData.incomeStreams.business ? formData.businessIncome : 0) + 
                  (formData.incomeStreams.rental ? formData.rentalIncome : 0) + 
                  (formData.incomeStreams.agricultural ? formData.agriculturalIncome : 0) + 
                  (formData.incomeStreams.capitalGains ? formData.capitalGainsIncome : 0) + 
                  (formData.incomeStreams.foreign ? formData.foreignIncome : 0)
                )
              }
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="income-details" className="space-y-4 pt-4">
          {formData.incomeStreams.salary && (
            <>
              <div className="space-y-2">
                <Label className="text-base">Does your employer deduct withholding tax at source?</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch 
                    id="employerWithholdingTax" 
                    checked={formData.employerWithholdingTax}
                    onCheckedChange={(checked) => handleInputChange('employerWithholdingTax', checked)}
                  />
                  <Label htmlFor="employerWithholdingTax" className="cursor-pointer">
                    {formData.employerWithholdingTax ? 'Yes (please provide monthly deduction certificates)' : 'No (we will calculate advance tax liability)'}
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label className="text-base">Select tax-exempt allowances you receive:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="conveyance" 
                      checked={formData.taxExemptAllowances.conveyance}
                      onCheckedChange={(checked) => handleNestedChange('taxExemptAllowances', 'conveyance', checked)}
                    />
                    <Label htmlFor="conveyance" className="cursor-pointer">Conveyance (up to Rs. 7,200/month exempt)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="medical" 
                      checked={formData.taxExemptAllowances.medical}
                      onCheckedChange={(checked) => handleNestedChange('taxExemptAllowances', 'medical', checked)}
                    />
                    <Label htmlFor="medical" className="cursor-pointer">Medical (up to 10% of basic salary)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="houseRent" 
                      checked={formData.taxExemptAllowances.houseRent}
                      onCheckedChange={(checked) => handleNestedChange('taxExemptAllowances', 'houseRent', checked)}
                    />
                    <Label htmlFor="houseRent" className="cursor-pointer">House Rent (50% of basic salary exempt)</Label>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {formData.incomeStreams.business && (
            <div className="px-4 py-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm">For business income, please attach your audited P&L statement in the next step.</p>
            </div>
          )}
          
          {formData.incomeStreams.rental && (
            <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm">For rental income, you'll need to provide lease agreements in the next step.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncomeStep;
