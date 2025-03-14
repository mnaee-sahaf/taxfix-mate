
import { TaxFormData } from './types';
import IdentificationStep from './form-steps/IdentificationStep';
import ResidencyStep from './form-steps/ResidencyStep';
import IncomeStep from './form-steps/IncomeStep';
import ExpensesStep from './form-steps/ExpensesStep';
import DeductionsStep from './form-steps/DeductionsStep';
import AssetsStep from './form-steps/AssetsStep';
import WithholdingStep from './form-steps/WithholdingStep';
import ReviewStep from './form-steps/ReviewStep';

interface StepRendererProps {
  stepId: string;
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const StepRenderer = ({ stepId, formData, handleInputChange, handleNestedChange }: StepRendererProps) => {
  switch (stepId) {
    case 'identification':
      return <IdentificationStep formData={formData} handleInputChange={handleInputChange} />;
    
    case 'residency':
      return <ResidencyStep formData={formData} handleInputChange={handleInputChange} />;
    
    case 'income':
      return <IncomeStep formData={formData} handleInputChange={handleInputChange} handleNestedChange={handleNestedChange} />;

    case 'expenses':
      return <ExpensesStep formData={formData} handleInputChange={handleInputChange} handleNestedChange={handleNestedChange} />;

    case 'deductions':
      return <DeductionsStep formData={formData} />;
    
    case 'assets':
      return <AssetsStep formData={formData} />;
    
    case 'withholding':
      return <WithholdingStep formData={formData} handleInputChange={handleInputChange} handleNestedChange={handleNestedChange} />;
    
    case 'review':
      return <ReviewStep formData={formData} handleInputChange={handleInputChange} />;
    
    default:
      return null;
  }
};

export default StepRenderer;
