
import jsPDF from 'jspdf';
import { formatNumber } from './formatterUtils';

export interface PdfHelperContext {
  doc: jsPDF;
  pageWidth: number;
  yPos: number;
  pageHeight: number;
}

// Helper to add section header
export const addSectionHeader = (
  context: PdfHelperContext, 
  title: string
): PdfHelperContext => {
  const { doc, pageWidth, yPos: currentYPos } = context;
  let yPos = currentYPos;
  
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204);
  doc.text(title, 20, yPos);
  yPos += 8;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  return { ...context, yPos };
};

// Helper to add field
export const addField = (
  context: PdfHelperContext, 
  label: string, 
  value: string | number | boolean
): PdfHelperContext => {
  const { doc, pageHeight, yPos: currentYPos } = context;
  let yPos = currentYPos;
  
  const displayValue = typeof value === 'boolean' 
    ? (value ? 'Yes' : 'No') 
    : (value?.toString() || 'N/A');
  
  doc.setFont(undefined, 'bold');
  doc.text(`${label}:`, 20, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(displayValue, 70, yPos);
  yPos += 6;
  
  // Add a new page if we're near the bottom
  if (yPos > pageHeight - 20) {
    doc.addPage();
    yPos = 20;
  }
  
  return { ...context, yPos };
};

// Helper to check if we need a new page and add one if needed
export const checkForNewPage = (
  context: PdfHelperContext, 
  requiredSpace: number = 60
): PdfHelperContext => {
  const { doc, pageHeight, yPos } = context;
  
  if (yPos > pageHeight - requiredSpace) {
    doc.addPage();
    return { ...context, yPos: 20 };
  }
  
  return context;
};

// Helper to add bold text
export const addBoldText = (
  context: PdfHelperContext, 
  text: string, 
  indent: number = 20
): PdfHelperContext => {
  const { doc, yPos: currentYPos } = context;
  
  doc.setFont(undefined, 'bold');
  doc.text(text, indent, currentYPos);
  doc.setFont(undefined, 'normal');
  
  return { ...context, yPos: currentYPos + 6 };
};
