import jsPDF from 'jspdf';

interface TaxFilingData {
  // User Identification
  cnic: string;
  firstTimeFiler: boolean;
  taxpayerCategory: string;
  
  // Residency Status
  residencyDays: number;
  governmentEmployee: boolean;
  residencyStatus: string;
  
  // Income Sources & Values
  incomeStreams: {
    salary: boolean;
    business: boolean;
    rental: boolean;
    agricultural: boolean;
    capitalGains: boolean;
    foreign: boolean;
  };
  salaryIncome: number;
  businessIncome: number;
  rentalIncome: number;
  agriculturalIncome: number;
  capitalGainsIncome: number;
  foreignIncome: number;
  
  // Deductions & Credits
  eligibleDeductions: {
    lifeInsurance: boolean;
    pension: boolean;
    donations: boolean;
    education: boolean;
  };
  lifeInsuranceAmount: number;
  pensionAmount: number;
  donationAmount: number;
  educationAmount: number;
  
  // Other properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const generateTaxPDF = (formData: TaxFilingData): void => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add title and header
  doc.setFontSize(22);
  doc.setTextColor(0, 102, 204);
  doc.text("Tax Return Summary", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: "center" });
  
  // Add line separator
  doc.setDrawColor(220, 220, 220);
  doc.line(20, 35, pageWidth - 20, 35);
  
  // Personal Information Section
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Personal Information", 20, 45);
  
  doc.setFontSize(10);
  doc.text(`CNIC: ${formData.cnic}`, 20, 55);
  doc.text(`Taxpayer Category: ${formatTaxpayerCategory(formData.taxpayerCategory)}`, 20, 62);
  doc.text(`First Time Filer: ${formData.firstTimeFiler ? "Yes" : "No"}`, 20, 69);
  doc.text(`Residency Status: ${formatResidencyStatus(formData.residencyStatus)}`, 20, 76);
  doc.text(`Days in Pakistan: ${formData.residencyDays}`, 20, 83);
  
  // Income Section
  doc.setFontSize(16);
  doc.text("Income Summary", 20, 95);
  
  // Calculate total income
  const totalIncome = calculateTotalIncome(formData);
  const totalDeductions = calculateTotalDeductions(formData);
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  
  doc.setFontSize(10);
  let yPos = 105;
  
  if (formData.incomeStreams.salary) {
    doc.text(`Salary Income: PKR ${formatNumber(formData.salaryIncome)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.incomeStreams.business) {
    doc.text(`Business Income: PKR ${formatNumber(formData.businessIncome)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.incomeStreams.rental) {
    doc.text(`Rental Income: PKR ${formatNumber(formData.rentalIncome)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.incomeStreams.capitalGains) {
    doc.text(`Capital Gains: PKR ${formatNumber(formData.capitalGainsIncome)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.incomeStreams.agricultural) {
    doc.text(`Agricultural Income: PKR ${formatNumber(formData.agriculturalIncome)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.incomeStreams.foreign) {
    doc.text(`Foreign Income: PKR ${formatNumber(formData.foreignIncome)}`, 20, yPos);
    yPos += 7;
  }
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Income: PKR ${formatNumber(totalIncome)}`, 20, yPos + 5);
  
  // Deductions Section
  doc.setFontSize(16);
  doc.text("Deductions", 20, yPos + 20);
  
  doc.setFontSize(10);
  yPos += 30;
  
  if (formData.eligibleDeductions.lifeInsurance) {
    doc.text(`Life Insurance: PKR ${formatNumber(formData.lifeInsuranceAmount)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.eligibleDeductions.pension) {
    doc.text(`Pension Contribution: PKR ${formatNumber(formData.pensionAmount)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.eligibleDeductions.donations) {
    doc.text(`Charitable Donations: PKR ${formatNumber(formData.donationAmount)}`, 20, yPos);
    yPos += 7;
  }
  
  if (formData.eligibleDeductions.education) {
    doc.text(`Education Expenses: PKR ${formatNumber(formData.educationAmount)}`, 20, yPos);
    yPos += 7;
  }
  
  doc.setFontSize(12);
  doc.text(`Total Deductions: PKR ${formatNumber(totalDeductions)}`, 20, yPos + 5);
  
  // Tax Calculation Section
  doc.setFontSize(16);
  doc.text("Tax Calculation", 20, yPos + 20);
  
  // Calculate tax (simple calculation for demo)
  const taxLiability = calculateTaxLiability(taxableIncome, formData);
  
  yPos += 30;
  doc.setFontSize(10);
  doc.text(`Taxable Income: PKR ${formatNumber(taxableIncome)}`, 20, yPos);
  doc.text(`Tax Liability: PKR ${formatNumber(Math.round(taxLiability))}`, 20, yPos + 7);
  
  if (taxableIncome > 0) {
    doc.text(`Effective Tax Rate: ${Math.round((taxLiability / taxableIncome) * 100)}%`, 20, yPos + 14);
  }
  
  // Add disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This document is for information purposes only and does not constitute a legal tax filing. Please retain all relevant documents for official submissions.",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 20,
    { align: "center", maxWidth: pageWidth - 40 }
  );
  
  // Automatically download the PDF
  doc.save(`tax-return-summary-${new Date().getFullYear()}.pdf`);
};

// Helper functions
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const formatTaxpayerCategory = (category: string): string => {
  switch (category) {
    case 'salaried-low':
      return 'Salaried Individual (Basic Salary ≤ Rs. 100k)';
    case 'salaried-high':
      return 'Salaried Individual (Basic Salary > Rs. 100k)';
    case 'business':
      return 'Business Owner/Professional';
    case 'aop':
      return 'Association of Persons (AOP)';
    case 'non-resident':
      return 'Non-Resident Pakistani';
    default:
      return category;
  }
};

const formatResidencyStatus = (status: string): string => {
  switch (status) {
    case 'resident':
      return 'Resident';
    case 'non-resident':
      return 'Non-Resident';
    case 'conditional':
      return 'Conditional Resident';
    default:
      return status;
  }
};

const calculateTotalIncome = (data: TaxFilingData): number => {
  return (
    (data.incomeStreams.salary ? data.salaryIncome : 0) +
    (data.incomeStreams.business ? data.businessIncome : 0) +
    (data.incomeStreams.rental ? data.rentalIncome : 0) +
    (data.incomeStreams.agricultural ? data.agriculturalIncome : 0) +
    (data.incomeStreams.capitalGains ? data.capitalGainsIncome : 0) +
    (data.incomeStreams.foreign ? data.foreignIncome : 0)
  );
};

const calculateTotalDeductions = (data: TaxFilingData): number => {
  return (
    (data.eligibleDeductions.lifeInsurance ? data.lifeInsuranceAmount : 0) +
    (data.eligibleDeductions.pension ? data.pensionAmount : 0) +
    (data.eligibleDeductions.donations ? data.donationAmount : 0) +
    (data.eligibleDeductions.education ? data.educationAmount : 0)
  );
};

const calculateTaxLiability = (taxableIncome: number, data: TaxFilingData): number => {
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
  
  // Apply special tax credits
  if (data.specialTaxCredits?.firstTimeFiler) {
    taxLiability = Math.max(0, taxLiability - 50000);
  }
  
  if (data.specialTaxCredits?.itSector) {
    taxLiability = taxLiability * 0.85; // 15% reduced rate
  }
  
  return taxLiability;
};
