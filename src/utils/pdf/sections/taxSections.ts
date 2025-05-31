
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, addBoldText, addFieldWithCode, checkForNewPage } from '../pdfHelpers';
import { formatNumber } from '../formatterUtils';
import { calculateTotalIncome, calculateTotalDeductions, calculateTaxLiability } from '../calculationUtils';

export const addWithholdingSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = checkForNewPage(context, 60);
  updatedContext = addSectionHeader(updatedContext, "8. Withholding Taxes");
  
  // Withholding codes mapping
  const withholdingCodes = {
    salary: '1009',
    bankTransactions: '4001',
    utilities: '4010',
    mobilePhone: '4011',
    vehicleTax: '4015',
    otherTaxes: '4020'
  };
  
  if (formData.withholding?.salary) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Salary Withholding", 
      `PKR ${formatNumber(formData.withholdingAmounts?.salary || 0)}`,
      withholdingCodes.salary
    );
  }
  
  if (formData.withholding?.bankTransactions) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Bank Transaction Tax", 
      `PKR ${formatNumber(formData.withholdingAmounts?.bankTransactions || 0)}`,
      withholdingCodes.bankTransactions
    );
  }
  
  if (formData.withholding?.utilities) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Utility Bills Tax", 
      `PKR ${formatNumber(formData.withholdingAmounts?.utilities || 0)}`,
      withholdingCodes.utilities
    );
  }
  
  if (formData.withholding?.mobilePhone) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Mobile Phone Tax", 
      `PKR ${formatNumber(formData.withholdingAmounts?.mobilePhone || 0)}`,
      withholdingCodes.mobilePhone
    );
  }
  
  if (formData.withholding?.vehicleTax) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Vehicle Tax", 
      `PKR ${formatNumber(formData.withholdingAmounts?.vehicleTax || 0)}`,
      withholdingCodes.vehicleTax
    );
  }
  
  if (formData.withholding?.otherTaxes) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Other Withholding Taxes", 
      `PKR ${formatNumber(formData.withholdingAmounts?.otherTaxes || 0)}`,
      withholdingCodes.otherTaxes
    );
  }
  
  const totalWithholding = Object.values(formData.withholdingAmounts || {}).reduce((sum, amount) => sum + (amount || 0), 0);
  
  if (totalWithholding > 0) {
    updatedContext = addBoldText(updatedContext, `Total Withholding: PKR ${formatNumber(totalWithholding)}`);
  } else {
    updatedContext.doc.text("No withholding taxes reported", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 6 };
  }
  
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};

export const addTaxCreditsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "9. Tax Credits & Special Status");
  
  if (formData.specialTaxCredits?.firstTimeFiler) {
    updatedContext = addField(updatedContext, "First Time Filer Credit", "Applied (PKR 50,000 reduction)");
  }
  
  if (formData.specialTaxCredits?.itSector) {
    updatedContext = addField(updatedContext, "IT Sector Reduced Rate", "Applied (15% rate reduction)");
  }
  
  if (formData.specialTaxCredits?.exportIndustry) {
    updatedContext = addField(updatedContext, "Export Industry Credit", "Applied");
  }
  
  if (!Object.values(formData.specialTaxCredits || {}).some(Boolean)) {
    updatedContext.doc.text("No special tax credits claimed", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 6 };
  }
  
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};

export const addTaxCalculationSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = checkForNewPage(context, 80);
  updatedContext = addSectionHeader(updatedContext, "10. Tax Calculation Summary");
  
  const totalIncome = calculateTotalIncome(formData);
  const totalDeductions = calculateTotalDeductions(formData);
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  const taxLiability = calculateTaxLiability(taxableIncome, formData);
  const totalWithholding = Object.values(formData.withholdingAmounts || {}).reduce((sum, amount) => sum + (amount || 0), 0);
  const balanceDue = Math.max(0, taxLiability - totalWithholding);
  const refundDue = Math.max(0, totalWithholding - taxLiability);
  
  updatedContext = addField(updatedContext, "Total Income", `PKR ${formatNumber(totalIncome)}`);
  updatedContext = addField(updatedContext, "Total Deductions", `PKR ${formatNumber(totalDeductions)}`);
  updatedContext = addField(updatedContext, "Taxable Income", `PKR ${formatNumber(taxableIncome)}`);
  updatedContext = addField(updatedContext, "Tax Liability", `PKR ${formatNumber(taxLiability)}`);
  updatedContext = addField(updatedContext, "Total Withholding", `PKR ${formatNumber(totalWithholding)}`);
  
  if (balanceDue > 0) {
    updatedContext = addBoldText(updatedContext, `Balance Due: PKR ${formatNumber(balanceDue)}`);
    if (formData.paymentMethod) {
      updatedContext = addField(updatedContext, "Payment Method", formData.paymentMethod);
    }
  } else if (refundDue > 0) {
    updatedContext = addBoldText(updatedContext, `Refund Due: PKR ${formatNumber(refundDue)}`);
  } else {
    updatedContext = addBoldText(updatedContext, "No Balance Due - Taxes Fully Paid");
  }
  
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};
