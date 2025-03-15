
import { PdfHelperContext } from '../pdfHelpers';

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
