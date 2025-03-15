
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, addBoldText } from '../pdfHelpers';
import { formatNumber, formatFieldName } from '../formatterUtils';
import { calculateTotalIncome } from '../calculationUtils';

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
