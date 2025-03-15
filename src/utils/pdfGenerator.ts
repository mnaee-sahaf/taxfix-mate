import jsPDF from 'jspdf';

interface TaxFilingData {
  // User Identification
  name: string;
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
  incomeAmounts: {
    salaryIncome: number;
    businessIncome: number;
    rentalIncome: number;
    agriculturalIncome: number;
    capitalGainsIncome: number;
    foreignIncome: number;
  };
  
  // Expenses
  expenses: {
    gas: boolean;
    electricity: boolean;
    water: boolean;
    telephone: boolean;
    medical: boolean;
    educational: boolean;
    travel: boolean;
    other: boolean;
  };
  expenseAmounts: {
    gas: number;
    electricity: number;
    water: number;
    telephone: number;
    medical: number;
    educational: number;
    travel: number;
    other: number;
  };
  
  // Deductions & Credits
  eligibleDeductions: {
    lifeInsurance: boolean;
    pension: boolean;
    donations: boolean;
    education: boolean;
    royalty: boolean;
    zakat: boolean;
  };
  lifeInsuranceAmount: number;
  pensionAmount: number;
  donationAmount: number;
  educationAmount: number;
  royaltyAmount: number;
  zakatAmount: number;
  
  // Assets
  assets: {
    agriculturalProperty: boolean;
    residentialProperty: boolean;
    stocksBonds: boolean;
    car: boolean;
    motorbike: boolean;
    cash: boolean;
    gold: boolean;
    other: boolean;
    assetsOutsidePakistan: boolean;
  };
  assetValues: {
    agriculturalProperty: number;
    residentialProperty: number;
    stocksBonds: number;
    car: number;
    motorbike: number;
    cash: number;
    gold: number;
    other: number;
    assetsOutsidePakistan: number;
  };
  
  // Withholding
  withholding: {
    salary: boolean;
    bankTransactions: boolean;
    utilities: boolean;
    mobilePhone: boolean;
    vehicleTax: boolean;
    otherTaxes: boolean;
  };
  withholdingAmounts: {
    salary: number;
    bankTransactions: number;
    utilities: number;
    mobilePhone: number;
    vehicleTax: number;
    otherTaxes: number;
  };
  
  // Tax Credits
  specialTaxCredits: {
    firstTimeFiler: boolean;
    itSector: boolean;
    exportIndustry: boolean;
  };
  
  // Other properties
  paymentMethod: string;
  paidTax: number;
  penaltyUnderstanding: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const generateTaxPDF = (formData: TaxFilingData): void => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;
  
  // Helper to add section header
  const addSectionHeader = (title: string) => {
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text(title, 20, yPos);
    yPos += 8;
    doc.setDrawColor(220, 220, 220);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
  };
  
  // Helper to add field
  const addField = (label: string, value: string | number | boolean) => {
    const displayValue = typeof value === 'boolean' 
      ? (value ? 'Yes' : 'No') 
      : (value?.toString() || 'N/A');
    
    doc.setFont(undefined, 'bold');
    doc.text(`${label}:`, 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(displayValue, 70, yPos);
    yPos += 6;
    
    // Add a new page if we're near the bottom
    if (yPos > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
    }
  };
  
  // Add title and header
  doc.setFontSize(22);
  doc.setTextColor(0, 102, 204);
  doc.text("Tax Return Summary", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 15;
  
  // Personal Information Section
  addSectionHeader("1. Personal Information");
  addField("Name", formData.name);
  addField("CNIC", formData.cnic);
  addField("Taxpayer Category", formatTaxpayerCategory(formData.taxpayerCategory));
  addField("First Time Filer", formData.firstTimeFiler);
  yPos += 5;
  
  // Residency Section
  addSectionHeader("2. Residency Status");
  addField("Residency Status", formatResidencyStatus(formData.residencyStatus));
  addField("Days in Pakistan", formData.residencyDays);
  addField("Government Employee", formData.governmentEmployee);
  yPos += 5;
  
  // Income Section
  addSectionHeader("3. Income Sources");
  
  // Display selected income sources
  if (Object.values(formData.incomeStreams).some(Boolean)) {
    const activeIncomes = Object.entries(formData.incomeStreams)
      .filter(([_, value]) => value)
      .map(([key, _]) => formatFieldName(key));
      
    doc.text("Selected Income Sources:", 20, yPos);
    yPos += 6;
    
    activeIncomes.forEach(income => {
      doc.text(`• ${income}`, 30, yPos);
      yPos += 5;
    });
    yPos += 5;
  } else {
    doc.text("No income sources selected", 20, yPos);
    yPos += 10;
  }
  
  // Income Amounts
  addSectionHeader("4. Income Amounts");
  
  if (formData.incomeStreams.salary) {
    addField("Salary Income", `PKR ${formatNumber(formData.incomeAmounts?.salaryIncome || formData.salaryIncome || 0)}`);
  }
  
  if (formData.incomeStreams.business) {
    addField("Business Income", `PKR ${formatNumber(formData.incomeAmounts?.businessIncome || formData.businessIncome || 0)}`);
  }
  
  if (formData.incomeStreams.rental) {
    addField("Rental Income", `PKR ${formatNumber(formData.incomeAmounts?.rentalIncome || formData.rentalIncome || 0)}`);
  }
  
  if (formData.incomeStreams.capitalGains) {
    addField("Capital Gains", `PKR ${formatNumber(formData.incomeAmounts?.capitalGainsIncome || formData.capitalGainsIncome || 0)}`);
  }
  
  if (formData.incomeStreams.agricultural) {
    addField("Agricultural Income", `PKR ${formatNumber(formData.incomeAmounts?.agriculturalIncome || formData.agriculturalIncome || 0)}`);
  }
  
  if (formData.incomeStreams.foreign) {
    addField("Foreign Income", `PKR ${formatNumber(formData.incomeAmounts?.foreignIncome || formData.foreignIncome || 0)}`);
  }
  
  const totalIncome = calculateTotalIncome(formData);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Income: PKR ${formatNumber(totalIncome)}`, 20, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 10;
  
  // Check if we need a new page
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }
  
  // Expenses Section
  addSectionHeader("5. Expenses");
  
  if (Object.values(formData.expenses || {}).some(Boolean)) {
    const activeExpenses = Object.entries(formData.expenses || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => formatFieldName(key));
      
    doc.text("Selected Expenses:", 20, yPos);
    yPos += 6;
    
    activeExpenses.forEach(expense => {
      const amount = formData.expenseAmounts?.[expense.toLowerCase() as keyof typeof formData.expenseAmounts] || 0;
      doc.text(`• ${expense}: PKR ${formatNumber(amount)}`, 30, yPos);
      yPos += 5;
    });
    yPos += 5;
  } else {
    doc.text("No expenses selected", 20, yPos);
    yPos += 10;
  }
  
  // Deductions Section
  addSectionHeader("6. Deductions");
  
  if (formData.eligibleDeductions.lifeInsurance) {
    addField("Life Insurance", `PKR ${formatNumber(formData.lifeInsuranceAmount)}`);
  }
  
  if (formData.eligibleDeductions.pension) {
    addField("Pension Contribution", `PKR ${formatNumber(formData.pensionAmount)}`);
  }
  
  if (formData.eligibleDeductions.donations) {
    addField("Charitable Donations", `PKR ${formatNumber(formData.donationAmount)}`);
  }
  
  if (formData.eligibleDeductions.education) {
    addField("Education Expenses", `PKR ${formatNumber(formData.educationAmount)}`);
  }
  
  if (formData.eligibleDeductions.royalty) {
    addField("Royalty Payments", `PKR ${formatNumber(formData.royaltyAmount || 0)}`);
  }
  
  if (formData.eligibleDeductions.zakat) {
    addField("Zakat", `PKR ${formatNumber(formData.zakatAmount || 0)}`);
  }
  
  const totalDeductions = calculateTotalDeductions(formData);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Deductions: PKR ${formatNumber(totalDeductions)}`, 20, yPos);
  doc.setFont(undefined, 'normal');
  yPos += 10;
  
  // Check if we need a new page
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }
  
  // Assets Section
  addSectionHeader("7. Assets");
  
  if (Object.values(formData.assets || {}).some(Boolean)) {
    const assets = Object.entries(formData.assets || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ 
        name: formatFieldName(key),
        value: formData.assetValues?.[key as keyof typeof formData.assetValues] || 0
      }));
      
    assets.forEach(asset => {
      addField(asset.name, `PKR ${formatNumber(asset.value)}`);
    });
    yPos += 5;
  } else {
    doc.text("No assets declared", 20, yPos);
    yPos += 10;
  }
  
  // Withholding Taxes Section
  addSectionHeader("8. Withholding Taxes");
  
  if (Object.values(formData.withholding || {}).some(Boolean)) {
    const withholdings = Object.entries(formData.withholding || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ 
        name: formatFieldName(key),
        value: formData.withholdingAmounts?.[key as keyof typeof formData.withholdingAmounts] || 0
      }));
      
    withholdings.forEach(withholding => {
      addField(withholding.name, `PKR ${formatNumber(withholding.value)}`);
    });
    
    doc.setFont(undefined, 'bold');
    doc.text(`Total Paid Tax: PKR ${formatNumber(formData.paidTax || 0)}`, 20, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
  } else {
    doc.text("No withholding taxes declared", 20, yPos);
    yPos += 10;
  }
  
  // Special Tax Credits
  addSectionHeader("9. Special Tax Credits");
  
  if (Object.values(formData.specialTaxCredits || {}).some(Boolean)) {
    if (formData.specialTaxCredits?.firstTimeFiler) {
      addField("First Time Filer Credit", "Applied");
    }
    
    if (formData.specialTaxCredits?.itSector) {
      addField("IT Sector Reduced Rate", "Applied (15% reduction)");
    }
    
    if (formData.specialTaxCredits?.exportIndustry) {
      addField("Export Industry Credit", "Applied");
    }
  } else {
    doc.text("No special tax credits applied", 20, yPos);
    yPos += 10;
  }
  
  // Check if we need a new page
  if (yPos > pageHeight - 80) {
    doc.addPage();
    yPos = 20;
  }
  
  // Tax Calculation Section
  addSectionHeader("10. Tax Calculation Summary");
  
  // Calculate tax (simple calculation for demo)
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  const taxLiability = calculateTaxLiability(taxableIncome, formData);
  const balanceDue = Math.max(0, taxLiability - (formData.paidTax || 0));
  
  addField("Taxable Income", `PKR ${formatNumber(taxableIncome)}`);
  addField("Tax Liability", `PKR ${formatNumber(Math.round(taxLiability))}`);
  addField("Taxes Already Paid", `PKR ${formatNumber(formData.paidTax || 0)}`);
  
  doc.setFont(undefined, 'bold');
  if (balanceDue > 0) {
    doc.text(`Balance Due: PKR ${formatNumber(Math.round(balanceDue))}`, 20, yPos);
  } else {
    doc.text(`Refund Amount: PKR ${formatNumber(Math.round(Math.abs(balanceDue)))}`, 20, yPos);
  }
  doc.setFont(undefined, 'normal');
  yPos += 6;
  
  if (taxableIncome > 0) {
    addField("Effective Tax Rate", `${Math.round((taxLiability / taxableIncome) * 100)}%`);
  }
  
  // Payment method if applicable
  if (formData.paymentMethod && balanceDue > 0) {
    addField("Selected Payment Method", formatPaymentMethod(formData.paymentMethod));
  }
  
  // Add disclaimer
  yPos = pageHeight - 20;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This document is for information purposes only and does not constitute a legal tax filing. Please retain all relevant documents for official submissions.",
    pageWidth / 2,
    yPos,
    { align: "center", maxWidth: pageWidth - 40 }
  );
  
  // Automatically download the PDF
  doc.save(`tax-return-summary-${new Date().getFullYear()}.pdf`);
};

// Helper functions
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const formatFieldName = (key: string): string => {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
    .trim();
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

const formatPaymentMethod = (method: string): string => {
  switch (method) {
    case 'bank-transfer':
      return 'Bank Transfer';
    case 'digital-payment':
      return 'Digital Payment';
    case 'credit-card':
      return 'Credit Card';
    case 'installments':
      return 'Payment in Installments';
    default:
      return method;
  }
};

const calculateTotalIncome = (data: TaxFilingData): number => {
  const incomeAmounts = data.incomeAmounts || {
    salaryIncome: data.salaryIncome || 0,
    businessIncome: data.businessIncome || 0,
    rentalIncome: data.rentalIncome || 0,
    agriculturalIncome: data.agriculturalIncome || 0,
    capitalGainsIncome: data.capitalGainsIncome || 0,
    foreignIncome: data.foreignIncome || 0
  };
  
  return (
    (data.incomeStreams.salary ? incomeAmounts.salaryIncome : 0) +
    (data.incomeStreams.business ? incomeAmounts.businessIncome : 0) +
    (data.incomeStreams.rental ? incomeAmounts.rentalIncome : 0) +
    (data.incomeStreams.agricultural ? incomeAmounts.agriculturalIncome : 0) +
    (data.incomeStreams.capitalGains ? incomeAmounts.capitalGainsIncome : 0) +
    (data.incomeStreams.foreign ? incomeAmounts.foreignIncome : 0)
  );
};

const calculateTotalDeductions = (data: TaxFilingData): number => {
  return (
    (data.eligibleDeductions.lifeInsurance ? data.lifeInsuranceAmount : 0) +
    (data.eligibleDeductions.pension ? data.pensionAmount : 0) +
    (data.eligibleDeductions.donations ? data.donationAmount : 0) +
    (data.eligibleDeductions.education ? data.educationAmount : 0) +
    (data.eligibleDeductions.royalty ? (data.royaltyAmount || 0) : 0) +
    (data.eligibleDeductions.zakat ? (data.zakatAmount || 0) : 0)
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
