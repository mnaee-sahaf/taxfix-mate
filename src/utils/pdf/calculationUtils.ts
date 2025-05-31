
import { TaxFilingData } from './pdfTypes';

export const calculateTotalIncome = (data: TaxFilingData): number => {
  try {
    if (!data) return 0;
    
    const incomeAmounts = data.incomeAmounts || {
      salaryIncome: 0,
      businessIncome: 0,
      rentalIncome: 0,
      agriculturalIncome: 0,
      capitalGainsIncome: 0,
      foreignIncome: 0
    };
    
    const incomeStreams = data.incomeStreams || {
      salary: false,
      business: false,
      rental: false,
      agricultural: false,
      capitalGains: false,
      foreign: false
    };
    
    return (
      (incomeStreams.salary ? (incomeAmounts.salaryIncome || data.salaryIncome || 0) : 0) +
      (incomeStreams.business ? (incomeAmounts.businessIncome || data.businessIncome || 0) : 0) +
      (incomeStreams.rental ? (incomeAmounts.rentalIncome || data.rentalIncome || 0) : 0) +
      (incomeStreams.agricultural ? (incomeAmounts.agriculturalIncome || data.agriculturalIncome || 0) : 0) +
      (incomeStreams.capitalGains ? (incomeAmounts.capitalGainsIncome || data.capitalGainsIncome || 0) : 0) +
      (incomeStreams.foreign ? (incomeAmounts.foreignIncome || data.foreignIncome || 0) : 0)
    );
  } catch (error) {
    console.warn('Error calculating total income:', error);
    return 0;
  }
};

export const calculateTotalDeductions = (data: TaxFilingData): number => {
  try {
    if (!data || !data.eligibleDeductions) return 0;
    
    return (
      (data.eligibleDeductions.lifeInsurance ? (data.lifeInsuranceAmount || 0) : 0) +
      (data.eligibleDeductions.pension ? (data.pensionAmount || 0) : 0) +
      (data.eligibleDeductions.donations ? (data.donationAmount || 0) : 0) +
      (data.eligibleDeductions.education ? (data.educationAmount || 0) : 0) +
      (data.eligibleDeductions.royalty ? (data.royaltyAmount || 0) : 0) +
      (data.eligibleDeductions.zakat ? (data.zakatAmount || 0) : 0)
    );
  } catch (error) {
    console.warn('Error calculating total deductions:', error);
    return 0;
  }
};

export const calculateTaxLiability = (taxableIncome: number, data: TaxFilingData): number => {
  try {
    if (!taxableIncome || taxableIncome <= 0) return 0;
    
    let taxLiability = 0;
    
    // Pakistan tax slabs for 2023-24
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
    
    // Apply special tax credits with proper null checks
    if (data?.specialTaxCredits?.firstTimeFiler) {
      taxLiability = Math.max(0, taxLiability - 50000);
    }
    
    if (data?.specialTaxCredits?.itSector) {
      taxLiability = taxLiability * 0.85; // 15% reduced rate
    }
    
    return Math.max(0, taxLiability);
  } catch (error) {
    console.warn('Error calculating tax liability:', error);
    return 0;
  }
};

export const calculateTotalWithholding = (data: TaxFilingData): number => {
  try {
    if (!data?.withholdingAmounts) return 0;
    
    return Object.values(data.withholdingAmounts).reduce((sum, amount) => {
      return sum + (typeof amount === 'number' ? amount : 0);
    }, 0);
  } catch (error) {
    console.warn('Error calculating total withholding:', error);
    return 0;
  }
};

export const calculateNetTaxPosition = (data: TaxFilingData): {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxLiability: number;
  totalWithholding: number;
  balanceDue: number;
  refundDue: number;
} => {
  try {
    const totalIncome = calculateTotalIncome(data);
    const totalDeductions = calculateTotalDeductions(data);
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);
    const taxLiability = calculateTaxLiability(taxableIncome, data);
    const totalWithholding = calculateTotalWithholding(data);
    const balanceDue = Math.max(0, taxLiability - totalWithholding);
    const refundDue = Math.max(0, totalWithholding - taxLiability);
    
    return {
      totalIncome,
      totalDeductions,
      taxableIncome,
      taxLiability,
      totalWithholding,
      balanceDue,
      refundDue
    };
  } catch (error) {
    console.warn('Error calculating net tax position:', error);
    return {
      totalIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      taxLiability: 0,
      totalWithholding: 0,
      balanceDue: 0,
      refundDue: 0
    };
  }
};
