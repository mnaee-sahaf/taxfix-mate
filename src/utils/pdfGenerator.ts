
import jsPDF from 'jspdf';
import { TaxFilingData } from './pdf/pdfTypes';
import { 
  addPersonalSection,
  addResidencySection,
  addIncomeSourcesSection,
  addIncomeAmountsSection,
  addExpensesSection,
  addDeductionsSection,
  addAssetsSection,
  addWithholdingSection,
  addTaxCreditsSection,
  addTaxCalculationSection,
  addDisclaimerSection
} from './pdf/pdfSections';

export const generateTaxPDF = (formData: TaxFilingData): void => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;
  
  // Initialize PDF context
  let pdfContext = {
    doc,
    pageWidth,
    pageHeight,
    yPos
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
  
  // Update the yPos in our context
  pdfContext = { ...pdfContext, yPos };
  
  // Add all the sections
  pdfContext = addPersonalSection(pdfContext, formData);
  pdfContext = addResidencySection(pdfContext, formData);
  pdfContext = addIncomeSourcesSection(pdfContext, formData);
  pdfContext = addIncomeAmountsSection(pdfContext, formData);
  pdfContext = addExpensesSection(pdfContext, formData);
  pdfContext = addDeductionsSection(pdfContext, formData);
  pdfContext = addAssetsSection(pdfContext, formData);
  pdfContext = addWithholdingSection(pdfContext, formData);
  pdfContext = addTaxCreditsSection(pdfContext, formData);
  pdfContext = addTaxCalculationSection(pdfContext, formData);
  
  // Add disclaimer at the bottom
  addDisclaimerSection(pdfContext);
  
  // Automatically download the PDF
  doc.save(`tax-return-summary-${new Date().getFullYear()}.pdf`);
};

// Re-export the TaxFilingData type for backward compatibility
export type { TaxFilingData } from './pdf/pdfTypes';
