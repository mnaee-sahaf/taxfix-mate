
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, checkForNewPage, addBoldText } from '../pdfHelpers';
import { formatNumber, formatPaymentMethod } from '../formatterUtils';
import { calculateTotalIncome, calculateTotalDeductions, calculateTaxLiability } from '../calculationUtils';

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
