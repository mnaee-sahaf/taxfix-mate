
import { TaxFormData, TaxData } from '@/components/tax-filing/types';

export function calculateTax(formData: TaxFormData): TaxData {
  // Use incomeAmounts object for calculations if it exists, otherwise use individual fields
  const incomeAmounts = formData.incomeAmounts || {
    salaryIncome: formData.salaryIncome,
    businessIncome: formData.businessIncome,
    rentalIncome: formData.rentalIncome,
    agriculturalIncome: formData.agriculturalIncome,
    capitalGainsIncome: formData.capitalGainsIncome,
    foreignIncome: formData.foreignIncome
  };
  
  const totalIncome = 
    (formData.incomeStreams.salary ? incomeAmounts.salaryIncome : 0) + 
    (formData.incomeStreams.business ? incomeAmounts.businessIncome : 0) + 
    (formData.incomeStreams.rental ? incomeAmounts.rentalIncome : 0) + 
    (formData.incomeStreams.agricultural ? incomeAmounts.agriculturalIncome : 0) + 
    (formData.incomeStreams.capitalGains ? incomeAmounts.capitalGainsIncome : 0) + 
    (formData.incomeStreams.foreign ? incomeAmounts.foreignIncome : 0);
  
  const totalDeductions = 
    (formData.eligibleDeductions.lifeInsurance ? formData.lifeInsuranceAmount : 0) + 
    (formData.eligibleDeductions.pension ? formData.pensionAmount : 0) + 
    (formData.eligibleDeductions.donations ? formData.donationAmount : 0) + 
    (formData.eligibleDeductions.education ? formData.educationAmount : 0);
  
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  
  let taxLiability = 0;
  if (taxableIncome <= 600000) {
    taxLiability = 0;
  } else if (taxableIncome <= 1200000) {
    taxLiability = (taxableIncome - 600000) * 0.05;
  } else if (taxableIncome <= 2400000) {
    taxLiability = 30000 + (taxableIncome - 1200000) * 0.10;
  } else if (taxableIncome <= 3600000) {
    taxLiability = 150000 + (taxableIncome - 2400000) * 0.15;
  } else if (taxableIncome <= 6000000) {
    taxLiability = 330000 + (taxableIncome - 3600000) * 0.20;
  } else {
    taxLiability = 810000 + (taxableIncome - 6000000) * 0.25;
  }
  
  if (formData.specialTaxCredits.firstTimeFiler) {
    taxLiability = Math.max(0, taxLiability - 50000);
  }
  
  if (formData.specialTaxCredits.itSector) {
    taxLiability = taxLiability * 0.85; // 15% reduced rate
  }
  
  return {
    calculatedTax: taxLiability,
    paidTax: formData.paidTax || 0,
    balanceDue: Math.max(0, taxLiability - (formData.paidTax || 0)),
  };
}
