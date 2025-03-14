
import { TaxFormData } from '../types';
import IncomeToggleSection from './income/IncomeToggleSection';
import IncomeAmountInputs from './income/IncomeAmountInputs';
import IncomeTabSection from './income/IncomeTabSection';

interface IncomeStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const IncomeStep = ({ formData, handleInputChange, handleNestedChange }: IncomeStepProps) => {
  
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
      <IncomeToggleSection 
        formData={formData} 
        handleIncomeToggle={handleIncomeToggle} 
      />
      
      <IncomeAmountInputs 
        formData={formData} 
        handleIncomeAmountChange={handleIncomeAmountChange}
      />
      
      <IncomeTabSection />
    </div>
  );
};

export default IncomeStep;
