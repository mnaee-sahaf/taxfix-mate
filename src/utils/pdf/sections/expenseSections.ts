
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, checkForNewPage, addBoldText } from '../pdfHelpers';
import { formatNumber, formatFieldName } from '../formatterUtils';
import { calculateTotalDeductions } from '../calculationUtils';

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
