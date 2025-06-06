
import { TaxFormData } from '../../types';
import IncomeAmountInput from './IncomeAmountInput';

interface IncomeAmountInputsProps {
  formData: TaxFormData;
  handleIncomeAmountChange: (field: keyof TaxFormData['incomeAmounts']) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IncomeAmountInputs = ({ formData, handleIncomeAmountChange }: IncomeAmountInputsProps) => {
  return (
    <>
      {formData.incomeStreams.salary && (
        <IncomeAmountInput
          id="salaryIncome"
          label="Salary Income"
          value={formData.incomeAmounts.salaryIncome === 0 ? '' : formData.incomeAmounts.salaryIncome.toString()}
          onChange={handleIncomeAmountChange('salaryIncome')}
        />
      )}

      {formData.incomeStreams.business && (
        <IncomeAmountInput
          id="businessIncome"
          label="Business Income"
          value={formData.incomeAmounts.businessIncome === 0 ? '' : formData.incomeAmounts.businessIncome.toString()}
          onChange={handleIncomeAmountChange('businessIncome')}
        />
      )}

      {formData.incomeStreams.rental && (
        <IncomeAmountInput
          id="rentalIncome"
          label="Rental Income"
          value={formData.incomeAmounts.rentalIncome === 0 ? '' : formData.incomeAmounts.rentalIncome.toString()}
          onChange={handleIncomeAmountChange('rentalIncome')}
        />
      )}

      {formData.incomeStreams.agricultural && (
        <IncomeAmountInput
          id="agriculturalIncome"
          label="Agricultural Income"
          value={formData.incomeAmounts.agriculturalIncome === 0 ? '' : formData.incomeAmounts.agriculturalIncome.toString()}
          onChange={handleIncomeAmountChange('agriculturalIncome')}
        />
      )}

      {formData.incomeStreams.capitalGains && (
        <IncomeAmountInput
          id="capitalGainsIncome"
          label="Capital Gains Income"
          value={formData.incomeAmounts.capitalGainsIncome === 0 ? '' : formData.incomeAmounts.capitalGainsIncome.toString()}
          onChange={handleIncomeAmountChange('capitalGainsIncome')}
        />
      )}

      {formData.incomeStreams.foreign && (
        <IncomeAmountInput
          id="foreignIncome"
          label="Foreign Income"
          value={formData.incomeAmounts.foreignIncome === 0 ? '' : formData.incomeAmounts.foreignIncome.toString()}
          onChange={handleIncomeAmountChange('foreignIncome')}
        />
      )}
    </>
  );
};

export default IncomeAmountInputs;
