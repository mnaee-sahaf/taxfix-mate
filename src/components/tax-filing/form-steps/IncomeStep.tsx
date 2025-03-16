
import { TaxFormData } from '../types';
import IncomeToggleSection from './income/IncomeToggleSection';
import IncomeAmountInputs from './income/IncomeAmountInputs';
import IncomeTabSection from './income/IncomeTabSection';
import IncomeNotes from './income/IncomeNotes';


interface IncomeStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const IncomeStep = ({ formData, handleInputChange, handleNestedChange }: IncomeStepProps) => {
  
  // No need to initialize here now that it's in initialFormData

  const handleIncomeToggle = (field: keyof typeof formData.incomeStreams) => (checked: boolean) => {
    handleNestedChange('incomeStreams', field, checked);
  };

  const handleIncomeAmountChange = (field: keyof typeof formData.incomeAmounts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('incomeAmounts', field as string, Number(e.target.value));
  };
  
  return (
    <div className="spae-y-2 pb-6">
      <IncomeNotes />
      <IncomeToggleSection 
        formData={formData} 
        handleIncomeToggle={handleIncomeToggle} 
      />
      <IncomeAmountInputs 
        formData={formData} 
        handleIncomeAmountChange={handleIncomeAmountChange}
      />
      {/* <IncomeTabSection /> */}
    </div>
  );
};

export default IncomeStep;
