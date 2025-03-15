
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
  
  // Add a gradient background for the section header
  const oldFillColor = doc.getFillColor();
  doc.setFillColor(240, 247, 255);
  doc.rect(15, yPos - 6, pageWidth - 30, 16, 'F');
  doc.setFillColor(oldFillColor);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 82, 184);
  doc.text(title, 20, yPos);
  yPos += 8;
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setLineWidth(0.1);
  
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
  doc.text(displayValue, 80, yPos);
  yPos += 6;
  
  // Add a new page if we're near the bottom
  if (yPos > pageHeight - 20) {
    doc.addPage();
    yPos = 20;
  }
  
  return { ...context, yPos };
};

// Helper to add field with code
export const addFieldWithCode = (
  context: PdfHelperContext, 
  label: string, 
  value: string | number | boolean,
  code: string,
  indent: number = 20
): PdfHelperContext => {
  const { doc, pageHeight, yPos: currentYPos } = context;
  let yPos = currentYPos;
  
  const displayValue = typeof value === 'boolean' 
    ? (value ? 'Yes' : 'No') 
    : (value?.toString() || 'N/A');
  
  // Draw a light background for the row
  const oldFillColor = doc.getFillColor();
  doc.setFillColor(250, 250, 250);
  doc.rect(indent - 3, yPos - 4, context.pageWidth - (indent * 2) + 6, 8, 'F');
  doc.setFillColor(oldFillColor);
  
  doc.setFont(undefined, 'bold');
  doc.text(`${label}:`, indent, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(displayValue, indent + 60, yPos);
  
  // Add code in brackets with a different color
  doc.setTextColor(100, 100, 100);
  doc.text(`[Code: ${code}]`, indent + 150, yPos);
  doc.setTextColor(0, 0, 0);
  
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
  
  // Add a highlight behind the text
  const oldFillColor = doc.getFillColor();
  doc.setFillColor(240, 247, 255);
  
  // Get the width of the text
  const textWidth = doc.getTextWidth(text);
  doc.rect(indent - 2, currentYPos - 4, textWidth + 4, 8, 'F');
  doc.setFillColor(oldFillColor);
  
  doc.setFont(undefined, 'bold');
  doc.text(text, indent, currentYPos);
  doc.setFont(undefined, 'normal');
  
  return { ...context, yPos: currentYPos + 6 };
};
