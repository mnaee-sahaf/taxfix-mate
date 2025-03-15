
import { TaxFormData } from '@/components/tax-filing/types';

interface TaxFiling {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

interface IncomeDataItem {
  name: string;
  value: number;
}

export const useIncomeData = (taxFilings: TaxFiling[]): IncomeDataItem[] => {
  if (!taxFilings.length) return [];
  
  const latestFiling = taxFilings[0];
  const incomeData: IncomeDataItem[] = [];
  
  if (latestFiling.form_data.incomeStreams.salary) {
    incomeData.push({
      name: 'Salary',
      value: Number(latestFiling.form_data.incomeAmounts.salaryIncome || 0)
    });
  }
  
  if (latestFiling.form_data.incomeStreams.business) {
    incomeData.push({
      name: 'Business',
      value: Number(latestFiling.form_data.incomeAmounts.businessIncome || 0)
    });
  }
  
  if (latestFiling.form_data.incomeStreams.rental) {
    incomeData.push({
      name: 'Rental',
      value: Number(latestFiling.form_data.incomeAmounts.rentalIncome || 0)
    });
  }
  
  if (latestFiling.form_data.incomeStreams.agricultural) {
    incomeData.push({
      name: 'Agricultural',
      value: Number(latestFiling.form_data.incomeAmounts.agriculturalIncome || 0)
    });
  }
  
  if (latestFiling.form_data.incomeStreams.capitalGains) {
    incomeData.push({
      name: 'Capital Gains',
      value: Number(latestFiling.form_data.incomeAmounts.capitalGainsIncome || 0)
    });
  }
  
  if (latestFiling.form_data.incomeStreams.foreign) {
    incomeData.push({
      name: 'Foreign',
      value: Number(latestFiling.form_data.incomeAmounts.foreignIncome || 0)
    });
  }
  
  return incomeData;
};
