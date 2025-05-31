
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField } from '../pdfHelpers';
import { formatTaxpayerCategory, formatResidencyStatus } from '../formatterUtils';

export const addPersonalSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "1. Personal Information");
  
  // Add personal fields with proper spacing
  updatedContext = addField(updatedContext, "Full Name", formData.name || 'Not provided');
  updatedContext = addField(updatedContext, "CNIC", formData.cnic || 'Not provided');
  updatedContext = addField(updatedContext, "Taxpayer Category", formatTaxpayerCategory(formData.taxpayerCategory || ''));
  updatedContext = addField(updatedContext, "First Time Filer", formData.firstTimeFiler || false);
  
  if (formData.city || formData.province) {
    updatedContext = addField(updatedContext, "City", formData.city || 'Not specified');
    updatedContext = addField(updatedContext, "Province", formData.province || 'Not specified');
  }
  
  // Add section spacing
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 8 };
  
  return updatedContext;
};

export const addResidencySection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "2. Residency Status");
  
  updatedContext = addField(updatedContext, "Residency Status", formatResidencyStatus(formData.residencyStatus || 'Resident'));
  
  if (formData.residencyDays !== undefined) {
    updatedContext = addField(updatedContext, "Days in Pakistan", formData.residencyDays);
  }
  
  if (formData.governmentEmployee !== undefined) {
    updatedContext = addField(updatedContext, "Government Employee", formData.governmentEmployee);
  }
  
  // Add section spacing
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 8 };
  
  return updatedContext;
};
