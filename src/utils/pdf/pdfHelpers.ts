
import jsPDF from 'jspdf';
import { formatNumber } from './formatterUtils';

export interface PdfHelperContext {
  doc: jsPDF;
  pageWidth: number;
  yPos: number;
  pageHeight: number;
  margins: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

// Helper to add section header with better spacing
export const addSectionHeader = (
  context: PdfHelperContext, 
  title: string
): PdfHelperContext => {
  const { doc, pageWidth, yPos: currentYPos, margins } = context;
  let yPos = currentYPos;
  
  try {
    // Ensure we have space for the header
    if (yPos > context.pageHeight - 60) {
      doc.addPage();
      yPos = margins.top;
    }
    
    // Add section header background
    const headerWidth = pageWidth - (margins.left + margins.right);
    doc.setFillColor(240, 247, 255);
    doc.rect(margins.left, yPos - 4, headerWidth, 14, 'F');
    
    // Add title text
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 82, 184);
    doc.text(title, margins.left + 5, yPos + 6);
    
    // Add underline
    yPos += 10;
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.3);
    doc.line(margins.left, yPos, pageWidth - margins.right, yPos);
    
    // Reset formatting
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setLineWidth(0.1);
  } catch (error) {
    console.warn('Error adding section header:', error);
    yPos += 18; // Fallback spacing
  }
  
  return { ...context, yPos };
};

// Helper to add field with proper text wrapping
export const addField = (
  context: PdfHelperContext, 
  label: string, 
  value: string | number | boolean
): PdfHelperContext => {
  const { doc, pageHeight, margins, yPos: currentYPos } = context;
  let yPos = currentYPos;
  
  try {
    // Check if we need a new page
    if (yPos > pageHeight - margins.bottom - 15) {
      doc.addPage();
      yPos = margins.top;
    }
    
    const displayValue = typeof value === 'boolean' 
      ? (value ? 'Yes' : 'No') 
      : (value?.toString() || 'N/A');
    
    // Calculate text width to prevent overflow
    const labelWidth = 55;
    const valueStartX = margins.left + labelWidth + 5;
    const maxValueWidth = context.pageWidth - valueStartX - margins.right;
    
    // Add label
    doc.setFont('helvetica', 'bold');
    doc.text(label + ':', margins.left, yPos);
    
    // Add value with text wrapping if necessary
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(displayValue, maxValueWidth);
    doc.text(lines, valueStartX, yPos);
    
    // Adjust yPos based on number of lines
    yPos += Math.max(6, lines.length * 5);
    
  } catch (error) {
    console.warn('Error adding field:', error, { label, value });
    yPos += 6; // Fallback spacing
  }
  
  return { ...context, yPos };
};

// Helper to add field with code reference
export const addFieldWithCode = (
  context: PdfHelperContext, 
  label: string, 
  value: string | number | boolean,
  code: string
): PdfHelperContext => {
  const { doc, pageHeight, margins, yPos: currentYPos } = context;
  let yPos = currentYPos;
  
  try {
    // Check if we need a new page
    if (yPos > pageHeight - margins.bottom - 15) {
      doc.addPage();
      yPos = margins.top;
    }
    
    const displayValue = typeof value === 'boolean' 
      ? (value ? 'Yes' : 'No') 
      : (value?.toString() || 'N/A');
    
    // Draw background row
    const rowWidth = context.pageWidth - (margins.left + margins.right);
    doc.setFillColor(250, 250, 250);
    doc.rect(margins.left, yPos - 3, rowWidth, 10, 'F');
    
    // Calculate column widths
    const labelWidth = 50;
    const valueWidth = 60;
    const codeStartX = margins.left + labelWidth + valueWidth + 10;
    
    // Add label
    doc.setFont('helvetica', 'bold');
    doc.text(label + ':', margins.left + 2, yPos + 2);
    
    // Add value
    doc.setFont('helvetica', 'normal');
    doc.text(displayValue, margins.left + labelWidth + 5, yPos + 2);
    
    // Add code in brackets
    if (code) {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.text(`[${code}]`, codeStartX, yPos + 2);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
    }
    
    yPos += 8;
    
  } catch (error) {
    console.warn('Error adding field with code:', error, { label, value, code });
    yPos += 8; // Fallback spacing
  }
  
  return { ...context, yPos };
};

// Helper to check for new page with proper margins
export const checkForNewPage = (
  context: PdfHelperContext, 
  requiredSpace: number = 40
): PdfHelperContext => {
  const { doc, pageHeight, margins, yPos } = context;
  
  if (yPos > pageHeight - margins.bottom - requiredSpace) {
    doc.addPage();
    return { ...context, yPos: margins.top };
  }
  
  return context;
};

// Helper to add emphasized text
export const addBoldText = (
  context: PdfHelperContext, 
  text: string
): PdfHelperContext => {
  const { doc, margins, yPos: currentYPos } = context;
  
  try {
    // Add highlighted background
    const textWidth = doc.getTextWidth(text);
    doc.setFillColor(240, 247, 255);
    doc.rect(margins.left - 1, currentYPos - 3, textWidth + 2, 8, 'F');
    
    // Add bold text
    doc.setFont('helvetica', 'bold');
    doc.text(text, margins.left, currentYPos);
    doc.setFont('helvetica', 'normal');
  } catch (error) {
    console.warn('Error adding bold text:', error, { text });
  }
  
  return { ...context, yPos: currentYPos + 8 };
};
