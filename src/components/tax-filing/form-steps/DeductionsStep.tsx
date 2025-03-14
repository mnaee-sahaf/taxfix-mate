
import { TaxFormData } from '../types';

interface DeductionsStepProps {
  formData: TaxFormData;
}

const DeductionsStep = ({ formData }: DeductionsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm">Deductions section is under development.</p>
      </div>
    </div>
  );
};

export default DeductionsStep;
