
import { TaxFilingData } from './pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, checkForNewPage, addBoldText } from './pdfHelpers';
import { formatNumber, formatFieldName, formatTaxpayerCategory, formatResidencyStatus, formatPaymentMethod } from './formatterUtils';
import { calculateTotalIncome, calculateTotalDeductions, calculateTaxLiability } from './calculationUtils';

export const addPersonalSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "1. Personal Information");
  updatedContext = addField(updatedContext, "Name", formData.name);
  updatedContext = addField(updatedContext, "CNIC", formData.cnic);
  updatedContext = addField(updatedContext, "Taxpayer Category", formatTaxpayerCategory(formData.taxpayerCategory));
  updatedContext = addField(updatedContext, "First Time Filer", formData.firstTimeFiler);
  
  // Add some spacing
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};

export const addResidencySection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "2. Residency Status");
  updatedContext = addField(updatedContext, "Residency Status", formatResidencyStatus(formData.residencyStatus));
  updatedContext = addField(updatedContext, "Days in Pakistan", formData.residencyDays);
  updatedContext = addField(updatedContext, "Government Employee", formData.governmentEmployee);
  
  // Add some spacing
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};

export const addIncomeSourcesSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "3. Income Sources");
  const { doc } = updatedContext;
  
  // Display selected income sources
  if (Object.values(formData.incomeStreams).some(Boolean)) {
    const activeIncomes = Object.entries(formData.incomeStreams)
      .filter(([_, value]) => value)
      .map(([key, _]) => formatFieldName(key));
      
    doc.text("Selected Income Sources:", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 6 };
    
    activeIncomes.forEach(income => {
      doc.text(`• ${income}`, 30, updatedContext.yPos);
      updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
    });
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  } else {
    doc.text("No income sources selected", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};

export const addIncomeAmountsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "4. Income Amounts");
  
  if (formData.incomeStreams.salary) {
    updatedContext = addField(updatedContext, "Salary Income", `PKR ${formatNumber(formData.incomeAmounts?.salaryIncome || formData.salaryIncome || 0)}`);
  }
  
  if (formData.incomeStreams.business) {
    updatedContext = addField(updatedContext, "Business Income", `PKR ${formatNumber(formData.incomeAmounts?.businessIncome || formData.businessIncome || 0)}`);
  }
  
  if (formData.incomeStreams.rental) {
    updatedContext = addField(updatedContext, "Rental Income", `PKR ${formatNumber(formData.incomeAmounts?.rentalIncome || formData.rentalIncome || 0)}`);
  }
  
  if (formData.incomeStreams.capitalGains) {
    updatedContext = addField(updatedContext, "Capital Gains", `PKR ${formatNumber(formData.incomeAmounts?.capitalGainsIncome || formData.capitalGainsIncome || 0)}`);
  }
  
  if (formData.incomeStreams.agricultural) {
    updatedContext = addField(updatedContext, "Agricultural Income", `PKR ${formatNumber(formData.incomeAmounts?.agriculturalIncome || formData.agriculturalIncome || 0)}`);
  }
  
  if (formData.incomeStreams.foreign) {
    updatedContext = addField(updatedContext, "Foreign Income", `PKR ${formatNumber(formData.incomeAmounts?.foreignIncome || formData.foreignIncome || 0)}`);
  }
  
  const totalIncome = calculateTotalIncome(formData);
  
  updatedContext = addBoldText(updatedContext, `Total Income: PKR ${formatNumber(totalIncome)}`);
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 4 };
  
  return updatedContext;
};

export const addExpensesSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  // Ensure we have enough space for this section
  let updatedContext = checkForNewPage(context, 60);
  updatedContext = addSectionHeader(updatedContext, "5. Expenses");
  const { doc } = updatedContext;
  
  if (Object.values(formData.expenses || {}).some(Boolean)) {
    const activeExpenses = Object.entries(formData.expenses || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => formatFieldName(key));
      
    doc.text("Selected Expenses:", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 6 };
    
    activeExpenses.forEach(expense => {
      const amount = formData.expenseAmounts?.[expense.toLowerCase() as keyof typeof formData.expenseAmounts] || 0;
      doc.text(`• ${expense}: PKR ${formatNumber(amount)}`, 30, updatedContext.yPos);
      updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
    });
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  } else {
    doc.text("No expenses selected", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};

export const addDeductionsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "6. Deductions");
  
  if (formData.eligibleDeductions.lifeInsurance) {
    updatedContext = addField(updatedContext, "Life Insurance", `PKR ${formatNumber(formData.lifeInsuranceAmount)}`);
  }
  
  if (formData.eligibleDeductions.pension) {
    updatedContext = addField(updatedContext, "Pension Contribution", `PKR ${formatNumber(formData.pensionAmount)}`);
  }
  
  if (formData.eligibleDeductions.donations) {
    updatedContext = addField(updatedContext, "Charitable Donations", `PKR ${formatNumber(formData.donationAmount)}`);
  }
  
  if (formData.eligibleDeductions.education) {
    updatedContext = addField(updatedContext, "Education Expenses", `PKR ${formatNumber(formData.educationAmount)}`);
  }
  
  if (formData.eligibleDeductions.royalty) {
    updatedContext = addField(updatedContext, "Royalty Payments", `PKR ${formatNumber(formData.royaltyAmount || 0)}`);
  }
  
  if (formData.eligibleDeductions.zakat) {
    updatedContext = addField(updatedContext, "Zakat", `PKR ${formatNumber(formData.zakatAmount || 0)}`);
  }
  
  const totalDeductions = calculateTotalDeductions(formData);
  
  updatedContext = addBoldText(updatedContext, `Total Deductions: PKR ${formatNumber(totalDeductions)}`);
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 4 };
  
  return updatedContext;
};

export const addAssetsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  // Ensure we have enough space for this section
  let updatedContext = checkForNewPage(context, 60);
  updatedContext = addSectionHeader(updatedContext, "7. Assets");
  
  if (Object.values(formData.assets || {}).some(Boolean)) {
    const assets = Object.entries(formData.assets || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ 
        name: formatFieldName(key),
        value: formData.assetValues?.[key as keyof typeof formData.assetValues] || 0
      }));
      
    assets.forEach(asset => {
      updatedContext = addField(updatedContext, asset.name, `PKR ${formatNumber(asset.value)}`);
    });
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  } else {
    updatedContext.doc.text("No assets declared", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};

export const addWithholdingSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "8. Withholding Taxes");
  
  if (Object.values(formData.withholding || {}).some(Boolean)) {
    const withholdings = Object.entries(formData.withholding || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ 
        name: formatFieldName(key),
        value: formData.withholdingAmounts?.[key as keyof typeof formData.withholdingAmounts] || 0
      }));
      
    withholdings.forEach(withholding => {
      updatedContext = addField(updatedContext, withholding.name, `PKR ${formatNumber(withholding.value)}`);
    });
    
    updatedContext = addBoldText(updatedContext, `Total Paid Tax: PKR ${formatNumber(formData.paidTax || 0)}`);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 4 };
  } else {
    updatedContext.doc.text("No withholding taxes declared", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};

export const addTaxCreditsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "9. Special Tax Credits");
  
  if (Object.values(formData.specialTaxCredits || {}).some(Boolean)) {
    if (formData.specialTaxCredits?.firstTimeFiler) {
      updatedContext = addField(updatedContext, "First Time Filer Credit", "Applied");
    }
    
    if (formData.specialTaxCredits?.itSector) {
      updatedContext = addField(updatedContext, "IT Sector Reduced Rate", "Applied (15% reduction)");
    }
    
    if (formData.specialTaxCredits?.exportIndustry) {
      updatedContext = addField(updatedContext, "Export Industry Credit", "Applied");
    }
  } else {
    updatedContext.doc.text("No special tax credits applied", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};

export const addTaxCalculationSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  // Ensure we have enough space for this section
  let updatedContext = checkForNewPage(context, 80);
  updatedContext = addSectionHeader(updatedContext, "10. Tax Calculation Summary");
  const { doc } = updatedContext;
  
  // Calculate tax
  const totalIncome = calculateTotalIncome(formData);
  const totalDeductions = calculateTotalDeductions(formData);
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  const taxLiability = calculateTaxLiability(taxableIncome, formData);
  const balanceDue = Math.max(0, taxLiability - (formData.paidTax || 0));
  
  updatedContext = addField(updatedContext, "Taxable Income", `PKR ${formatNumber(taxableIncome)}`);
  updatedContext = addField(updatedContext, "Tax Liability", `PKR ${formatNumber(Math.round(taxLiability))}`);
  updatedContext = addField(updatedContext, "Taxes Already Paid", `PKR ${formatNumber(formData.paidTax || 0)}`);
  
  doc.setFont(undefined, 'bold');
  if (balanceDue > 0) {
    doc.text(`Balance Due: PKR ${formatNumber(Math.round(balanceDue))}`, 20, updatedContext.yPos);
  } else {
    doc.text(`Refund Amount: PKR ${formatNumber(Math.round(Math.abs(balanceDue)))}`, 20, updatedContext.yPos);
  }
  doc.setFont(undefined, 'normal');
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 6 };
  
  if (taxableIncome > 0) {
    updatedContext = addField(updatedContext, "Effective Tax Rate", `${Math.round((taxLiability / taxableIncome) * 100)}%`);
  }
  
  // Payment method if applicable
  if (formData.paymentMethod && balanceDue > 0) {
    updatedContext = addField(updatedContext, "Selected Payment Method", formatPaymentMethod(formData.paymentMethod));
  }
  
  return updatedContext;
};

export const addDisclaimerSection = (context: PdfHelperContext): PdfHelperContext => {
  const { doc, pageWidth, pageHeight } = context;
  
  // Add disclaimer at the bottom of the page
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This document is for information purposes only and does not constitute a legal tax filing. Please retain all relevant documents for official submissions.",
    pageWidth / 2,
    pageHeight - 20,
    { align: "center", maxWidth: pageWidth - 40 }
  );
  
  return context;
};
