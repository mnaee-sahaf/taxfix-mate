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

// Theme constants
const THEME = {
  COLORS: {
    PRIMARY: [0, 102, 204] as const,
    BACKGROUND: [252, 252, 252] as const,
    HEADER_BG: [240, 247, 255] as const,
    WATERMARK: [200, 200, 200] as const,
    TEXT_WHITE: [255, 255, 255] as const,
    TEXT_BLUE: [0, 82, 184] as const,
    TEXT_BLACK: [0, 0, 0] as const,
  },
  FONT: {
    PRIMARY: 'helvetica',
    SIZE_HEADER: 22,
    SIZE_SUBTITLE: 12,
    SIZE_BODY: 10,
    SIZE_FOOTER: 8,
    SIZE_WATERMARK: 60,
  }
};

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

interface PdfContext {
  doc: jsPDF;
  pageWidth: number;
  pageHeight: number;
  yPos: number;
}

const checkForNewPage = (context: PdfContext, marginBottom = 20): PdfContext => {
  const { doc, yPos, pageHeight } = context;
  if (yPos > pageHeight - marginBottom) {
    doc.addPage();
    addMiniHeader(doc, context.pageWidth);
    return { ...context, yPos: 30 };
  }
  return context;
};

const addMiniHeader = (doc: jsPDF, pageWidth: number) => {
  doc.setFillColor(...THEME.COLORS.HEADER_BG);
  doc.rect(0, 0, pageWidth, 15, 'F');
  doc.setFontSize(THEME.FONT.SIZE_SUBTITLE);
  doc.setTextColor(...THEME.COLORS.TEXT_BLUE);
  doc.text("Tax Return Summary (continued)", pageWidth / 2, 10, { align: "center" });
};

const addFooterToAllPages = (doc: jsPDF, totalPages: number, pageWidth: number, pageHeight: number) => {
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...THEME.COLORS.PRIMARY);
    doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');

    doc.setFontSize(THEME.FONT.SIZE_FOOTER);
    doc.setTextColor(...THEME.COLORS.TEXT_WHITE);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 4);
    doc.text("Use The FBR Tax Filing System To Submit The Data Against The Codes Mentioned", 20, pageHeight - 4);
  }
};

const addWatermark = (doc: jsPDF, pageWidth: number, pageHeight: number) => {
  doc.setFontSize(THEME.FONT.SIZE_WATERMARK);
  doc.setTextColor(...THEME.COLORS.WATERMARK);
  doc.text("CONFIDENTIAL", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 45,
  });
};

export const generateTaxPDF = (formData: TaxFilingData, generatedDate = new Date()): void => {
  try {
    const doc = new jsPDF();
    doc.setFont(THEME.FONT.PRIMARY, 'normal');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const initialYPos = 30;

    doc.setFillColor(...THEME.COLORS.BACKGROUND);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    let pdfContext: PdfContext = { doc, pageWidth, pageHeight, yPos: initialYPos };

    // Header
    doc.setFillColor(...THEME.COLORS.PRIMARY);
    doc.rect(0, 0, pageWidth, 15, 'F');
    doc.setFontSize(THEME.FONT.SIZE_HEADER);
    doc.setTextColor(...THEME.COLORS.TEXT_WHITE);
    doc.text("Tax Return Summary", pageWidth / 2, 10, { align: "center" });

    // Subtitle
    doc.setFillColor(...THEME.COLORS.HEADER_BG);
    doc.rect(0, 15, pageWidth, 18, 'F');
    doc.setFontSize(THEME.FONT.SIZE_SUBTITLE);
    doc.setTextColor(...THEME.COLORS.TEXT_BLUE);
    doc.text(`Generated on: ${formatDate(generatedDate)}`, pageWidth / 2, 26, { align: "center" });

    // Reset text color for content
    doc.setTextColor(...THEME.COLORS.TEXT_BLACK);

    const sections = [
      addPersonalSection,
      addResidencySection,
      addIncomeSourcesSection,
      addIncomeAmountsSection,
      addExpensesSection,
      addDeductionsSection,
      addAssetsSection,
      addWithholdingSection,
      addTaxCreditsSection,
      addTaxCalculationSection
    ];

    for (const section of sections) {
      try {
        pdfContext = checkForNewPage(pdfContext);
        pdfContext = section(pdfContext, formData);
      } catch (e) {
        console.warn(`Section failed to render: ${section.name}`, e);
      }
    }

    pdfContext = checkForNewPage(pdfContext);
    pdfContext = addDisclaimerSection(pdfContext);

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addWatermark(doc, pageWidth, pageHeight);
    }

    addFooterToAllPages(doc, totalPages, pageWidth, pageHeight);
    doc.save(`tax-return-summary-${generatedDate.getFullYear()}.pdf`);

  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate tax PDF');
  }
};

export type { TaxFilingData } from './pdf/pdfTypes';
