
import { TaxFilingData } from './pdfTypes';

export const calculateTotalIncome = (data: TaxFilingData): number => {
  const incomeAmounts = data.incomeAmounts || {
    salaryIncome: data.salaryIncome || 0,
    businessIncome: data.businessIncome || 0,
    rentalIncome: data.rentalIncome || 0,
    agriculturalIncome: data.agriculturalIncome || 0,
    capitalGainsIncome: data.capitalGainsIncome || 0,
    foreignIncome: data.foreignIncome || 0
  };
  
  return (
    (data.incomeStreams?.salary ? incomeAmounts.salaryIncome : 0) +
    (data.incomeStreams?.business ? incomeAmounts.businessIncome : 0) +
    (data.incomeStreams?.rental ? incomeAmounts.rentalIncome : 0) +
    (data.incomeStreams?.agricultural ? incomeAmounts.agriculturalIncome : 0) +
    (data.incomeStreams?.capitalGains ? incomeAmounts.capitalGainsIncome : 0) +
    (data.incomeStreams?.foreign ? incomeAmounts.foreignIncome : 0)
  );
};

export const calculateTotalDeductions = (data: TaxFilingData): number => {
  // Add safe checks for all properties
  return (
    (data.eligibleDeductions?.lifeInsurance ? data.lifeInsuranceAmount || 0 : 0) +
    (data.eligibleDeductions?.pension ? data.pensionAmount || 0 : 0) +
    (data.eligibleDeductions?.donations ? data.donationAmount || 0 : 0) +
    (data.eligibleDeductions?.education ? data.educationAmount || 0 : 0) +
    (data.eligibleDeductions?.royalty ? (data.royaltyAmount || 0) : 0) +
    (data.eligibleDeductions?.zakat ? (data.zakatAmount || 0) : 0)
  );
};

export const calculateTaxLiability = (taxableIncome: number, data: TaxFilingData): number => {
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
  
  // Apply special tax credits with null checks
  if (data.specialTaxCredits?.firstTimeFiler) {
    taxLiability = Math.max(0, taxLiability - 50000);
  }
  
  if (data.specialTaxCredits?.itSector) {
    taxLiability = taxLiability * 0.85; // 15% reduced rate
  }
  
  return taxLiability;
};
