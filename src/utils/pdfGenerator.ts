
import jsPDF from 'jspdf';
import { TaxFilingData } from './pdf/pdfTypes';
import { PdfHelperContext } from './pdf/pdfHelpers';
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

// Consistent page dimensions and margins
const PAGE_CONFIG = {
  FORMAT: 'a4' as const,
  MARGINS: {
    LEFT: 20,
    RIGHT: 20,
    TOP: 25,
    BOTTOM: 25
  }
};

// Theme constants
const THEME = {
  COLORS: {
    PRIMARY: [0, 102, 204] as const,
    BACKGROUND: [255, 255, 255] as const,
    HEADER_BG: [240, 247, 255] as const,
    WATERMARK: [230, 230, 230] as const,
    TEXT_WHITE: [255, 255, 255] as const,
    TEXT_BLUE: [0, 82, 184] as const,
    TEXT_BLACK: [0, 0, 0] as const,
  },
  FONT: {
    PRIMARY: 'helvetica',
    SIZE_HEADER: 18,
    SIZE_SUBTITLE: 11,
    SIZE_BODY: 10,
    SIZE_FOOTER: 8,
    SIZE_WATERMARK: 50,
  }
};

const formatDate = (date: Date): string => {
  try {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return new Date().toLocaleDateString();
  }
};

interface PdfContext {
  doc: jsPDF;
  pageWidth: number;
  pageHeight: number;
  yPos: number;
  margins: typeof PAGE_CONFIG.MARGINS;
}

const addHeader = (doc: jsPDF, pageWidth: number, generatedDate: Date) => {
  try {
    // Main header background
    doc.setFillColor(...THEME.COLORS.PRIMARY);
    doc.rect(0, 0, pageWidth, 20, 'F');
    
    // Header title
    doc.setFontSize(THEME.FONT.SIZE_HEADER);
    doc.setFont(THEME.FONT.PRIMARY, 'bold');
    doc.setTextColor(...THEME.COLORS.TEXT_WHITE);
    doc.text("Pakistan Tax Return Summary", pageWidth / 2, 13, { align: "center" });
    
    // Subtitle section
    doc.setFillColor(...THEME.COLORS.HEADER_BG);
    doc.rect(0, 20, pageWidth, 15, 'F');
    doc.setFontSize(THEME.FONT.SIZE_SUBTITLE);
    doc.setTextColor(...THEME.COLORS.TEXT_BLUE);
    doc.text(`Generated on: ${formatDate(generatedDate)}`, pageWidth / 2, 30, { align: "center" });
    
    // Reset colors
    doc.setTextColor(...THEME.COLORS.TEXT_BLACK);
    doc.setFont(THEME.FONT.PRIMARY, 'normal');
    doc.setFontSize(THEME.FONT.SIZE_BODY);
  } catch (error) {
    console.warn('Error adding header:', error);
  }
};

const addMiniHeader = (doc: jsPDF, pageWidth: number) => {
  try {
    doc.setFillColor(...THEME.COLORS.HEADER_BG);
    doc.rect(0, 0, pageWidth, 18, 'F');
    doc.setFontSize(THEME.FONT.SIZE_SUBTITLE);
    doc.setTextColor(...THEME.COLORS.TEXT_BLUE);
    doc.text("Tax Return Summary (continued)", pageWidth / 2, 12, { align: "center" });
    doc.setTextColor(...THEME.COLORS.TEXT_BLACK);
    doc.setFontSize(THEME.FONT.SIZE_BODY);
  } catch (error) {
    console.warn('Error adding mini header:', error);
  }
};

const addFooterToAllPages = (doc: jsPDF, totalPages: number, pageWidth: number, pageHeight: number) => {
  try {
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Footer background
      doc.setFillColor(...THEME.COLORS.PRIMARY);
      doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
      
      // Footer text
      doc.setFontSize(THEME.FONT.SIZE_FOOTER);
      doc.setTextColor(...THEME.COLORS.TEXT_WHITE);
      
      // Page number (right aligned)
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - PAGE_CONFIG.MARGINS.RIGHT, pageHeight - 4);
      
      // Disclaimer text (left aligned)
      doc.text("For FBR submission, use official tax filing system with provided codes", PAGE_CONFIG.MARGINS.LEFT, pageHeight - 4);
    }
  } catch (error) {
    console.warn('Error adding footers:', error);
  }
};

const addWatermark = (doc: jsPDF, pageWidth: number, pageHeight: number) => {
  try {
    doc.setFontSize(THEME.FONT.SIZE_WATERMARK);
    doc.setTextColor(...THEME.COLORS.WATERMARK);
    doc.text("DRAFT", pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45,
    });
    doc.setTextColor(...THEME.COLORS.TEXT_BLACK);
  } catch (error) {
    console.warn('Error adding watermark:', error);
  }
};

const validateFormData = (formData: TaxFilingData): boolean => {
  if (!formData) {
    console.error('Form data is required');
    return false;
  }
  
  if (!formData.name || !formData.cnic) {
    console.error('Name and CNIC are required fields');
    return false;
  }
  
  return true;
};

export const generateTaxPDF = (formData: TaxFilingData, generatedDate = new Date()): void => {
  try {
    if (!validateFormData(formData)) {
      throw new Error('Invalid form data provided');
    }

    // Create PDF with consistent settings
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: PAGE_CONFIG.FORMAT
    });
    
    // Set consistent font
    doc.setFont(THEME.FONT.PRIMARY, 'normal');
    doc.setFontSize(THEME.FONT.SIZE_BODY);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Set white background
    doc.setFillColor(...THEME.COLORS.BACKGROUND);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Add main header
    addHeader(doc, pageWidth, generatedDate);

    let pdfContext: PdfContext = { 
      doc, 
      pageWidth, 
      pageHeight, 
      yPos: 40, // Start after header
      margins: PAGE_CONFIG.MARGINS
    };

    // Helper function to convert PdfContext to PdfHelperContext
    const convertToHelperContext = (context: PdfContext): PdfHelperContext => ({
      doc: context.doc,
      pageWidth: context.pageWidth,
      pageHeight: context.pageHeight,
      yPos: context.yPos,
      margins: {
        LEFT: context.margins.LEFT,
        RIGHT: context.margins.RIGHT,
        TOP: context.margins.TOP,
        BOTTOM: context.margins.BOTTOM
      }
    });

    // Helper function to convert PdfHelperContext back to PdfContext
    const convertFromHelperContext = (context: PdfHelperContext): PdfContext => ({
      doc: context.doc,
      pageWidth: context.pageWidth,
      pageHeight: context.pageHeight,
      yPos: context.yPos,
      margins: {
        LEFT: context.margins.LEFT,
        RIGHT: context.margins.RIGHT,
        TOP: context.margins.TOP,
        BOTTOM: context.margins.BOTTOM
      }
    });

    // Define sections with error handling
    const sections = [
      { func: addPersonalSection, name: 'Personal Information' },
      { func: addResidencySection, name: 'Residency Status' },
      { func: addIncomeSourcesSection, name: 'Income Sources' },
      { func: addIncomeAmountsSection, name: 'Income Amounts' },
      { func: addExpensesSection, name: 'Expenses' },
      { func: addDeductionsSection, name: 'Deductions' },
      { func: addAssetsSection, name: 'Assets' },
      { func: addWithholdingSection, name: 'Withholding' },
      { func: addTaxCreditsSection, name: 'Tax Credits' },
      { func: addTaxCalculationSection, name: 'Tax Calculation' }
    ];

    // Process each section
    for (const section of sections) {
      try {
        // Check if we need a new page before each major section
        if (pdfContext.yPos > pageHeight - 60) {
          doc.addPage();
          addMiniHeader(doc, pageWidth);
          pdfContext.yPos = 25;
        }
        
        const helperContext = convertToHelperContext(pdfContext);
        const updatedHelperContext = section.func(helperContext, formData);
        pdfContext = convertFromHelperContext(updatedHelperContext);
      } catch (error) {
        console.warn(`Section "${section.name}" failed to render:`, error);
        // Add error indicator in PDF
        doc.setTextColor(150, 0, 0);
        doc.text(`[Error in ${section.name} section]`, pdfContext.margins.LEFT, pdfContext.yPos);
        pdfContext.yPos += 10;
        doc.setTextColor(...THEME.COLORS.TEXT_BLACK);
      }
    }

    // Add disclaimer
    try {
      if (pdfContext.yPos > pageHeight - 40) {
        doc.addPage();
        addMiniHeader(doc, pageWidth);
        pdfContext.yPos = 25;
      }
      const helperContext = convertToHelperContext(pdfContext);
      const updatedHelperContext = addDisclaimerSection(helperContext);
      pdfContext = convertFromHelperContext(updatedHelperContext);
    } catch (error) {
      console.warn('Error adding disclaimer:', error);
    }

    // Add watermarks and footers to all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addWatermark(doc, pageWidth, pageHeight);
    }

    addFooterToAllPages(doc, totalPages, pageWidth, pageHeight);

    // Generate and save PDF
    const filename = `tax-return-${formData.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'summary'}-${generatedDate.getFullYear()}.pdf`;
    doc.save(filename);

    console.log(`PDF generated successfully: ${filename}`);

  } catch (error) {
    console.error('PDF generation failed:', error);
    
    // Show user-friendly error
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Failed to generate PDF. Please check your form data and try again.');
    }
    
    throw new Error(`Failed to generate tax PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Re-export types for convenience
export type { TaxFilingData } from './pdf/pdfTypes';
