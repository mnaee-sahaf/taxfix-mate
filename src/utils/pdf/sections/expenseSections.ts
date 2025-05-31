
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, checkForNewPage, addBoldText, addFieldWithCode } from '../pdfHelpers';
import { formatNumber, formatFieldName } from '../formatterUtils';
import { calculateTotalDeductions } from '../calculationUtils';

export const addExpensesSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  // Ensure we have enough space for this section
  let updatedContext = checkForNewPage(context, 60);
  updatedContext = addSectionHeader(updatedContext, "5. Expenses");
  const { doc } = updatedContext;
  
  // Expense codes mapping
  const expenseCodes = {
    rent: '7051',
    electricity: '7058',
    gas: '7060',
    telephone: '7061',
    medical: '7070',
    educational: '7071',
    travel: '7056',
    other: '7087'
  };
  
  if (Object.values(formData.expenses || {}).some(Boolean)) {
    const activeExpenses = Object.entries(formData.expenses || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ name: key, displayName: formatFieldName(key) }));
      
    doc.text("Selected Expenses:", updatedContext.margins.LEFT, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 6 };
    
    activeExpenses.forEach(expense => {
      const amount = formData.expenseAmounts?.[expense.name.toLowerCase() as keyof typeof formData.expenseAmounts] || 0;
      const code = expenseCodes[expense.name.toLowerCase() as keyof typeof expenseCodes] || '';
      
      if (code) {
        updatedContext = addFieldWithCode(updatedContext, expense.displayName, `PKR ${formatNumber(amount)}`, code);
      } else {
        doc.text(`• ${expense.displayName}: PKR ${formatNumber(amount)}`, updatedContext.margins.LEFT + 10, updatedContext.yPos);
        updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
      }
    });
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  } else {
    doc.text("No expenses selected", updatedContext.margins.LEFT, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};

export const addDeductionsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "6. Deductions");
  
  // Deduction codes mapping
  const deductionCodes = {
    lifeInsurance: '',
    pension: '5007',
    donations: '',
    education: '',
    royalty: '5002',
    zakat: ''
  };
  
  if (formData.eligibleDeductions.lifeInsurance) {
    updatedContext = addField(updatedContext, "Life Insurance", `PKR ${formatNumber(formData.lifeInsuranceAmount)}`);
  }
  
  if (formData.eligibleDeductions.pension) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Pension Contribution", 
      `PKR ${formatNumber(formData.pensionAmount)}`,
      deductionCodes.pension
    );
  }
  
  if (formData.eligibleDeductions.donations) {
    updatedContext = addField(updatedContext, "Charitable Donations", `PKR ${formatNumber(formData.donationAmount)}`);
  }
  
  if (formData.eligibleDeductions.education) {
    updatedContext = addField(updatedContext, "Education Expenses", `PKR ${formatNumber(formData.educationAmount)}`);
  }
  
  if (formData.eligibleDeductions.royalty) {
    updatedContext = addFieldWithCode(
      updatedContext, 
      "Royalty Payments", 
      `PKR ${formatNumber(formData.royaltyAmount || 0)}`,
      deductionCodes.royalty
    );
  }
  
  if (formData.eligibleDeductions.zakat) {
    updatedContext = addField(updatedContext, "Zakat", `PKR ${formatNumber(formData.zakatAmount || 0)}`);
  }
  
  const totalDeductions = calculateTotalDeductions(formData);
  
  updatedContext = addBoldText(updatedContext, `Total Deductions: PKR ${formatNumber(totalDeductions)}`);
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 4 };
  
  return updatedContext;
};
