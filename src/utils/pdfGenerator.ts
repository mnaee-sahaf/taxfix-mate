
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
} from './pdf/sections';

export const generateTaxPDF = (formData: TaxFilingData): void => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 30; // Start a bit lower to make room for header
  
  // Add a background color to the entire document
  doc.setFillColor(252, 252, 252);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Initialize PDF context
  let pdfContext = {
    doc,
    pageWidth,
    pageHeight,
    yPos
  };
  
  // Add decorative header
  doc.setFillColor(0, 102, 204);
  doc.rect(0, 0, pageWidth, 15, 'F');
  
  // Add title and header
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Tax Return Summary", pageWidth / 2, 10, { align: "center" });
  
  // Add subtitle below the header
  doc.setFillColor(240, 247, 255);
  doc.rect(0, 15, pageWidth, 18, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 82, 184);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 26, { align: "center" });
  
  // Add simple logo/watermark
  doc.setGlobalAlpha(0.03);
  doc.setFillColor(0, 82, 184);
  doc.circle(pageWidth / 2, pageHeight / 2, 50, 'F');
  doc.setGlobalAlpha(1);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
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
  
  // Add decorative footer to each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(0, 102, 204);
    doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 4);
    doc.text("FBR Tax Filing System", 20, pageHeight - 4);
  }
  
  // Go back to the last page for the disclaimer
  doc.setPage(totalPages);
  
  // Add disclaimer at the bottom
  addDisclaimerSection(pdfContext);
  
  // Automatically download the PDF
  doc.save(`tax-return-summary-${new Date().getFullYear()}.pdf`);
};

// Re-export the TaxFilingData type for backward compatibility
export type { TaxFilingData } from './pdf/pdfTypes';
