
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField } from '../pdfHelpers';
import { formatTaxpayerCategory, formatResidencyStatus } from '../formatterUtils';

export const addPersonalSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "1. Personal Information");
  updatedContext = addField(updatedContext, "Name", formData.name);
  updatedContext = addField(updatedContext, "CNIC", formData.cnic);
  updatedContext = addField(updatedContext, "Taxpayer Category", formatTaxpayerCategory(formData.taxpayerCategory));
  updatedContext = addField(updatedContext, "First Time Filer", formData.firstTimeFiler);
  
  // Add some spacing
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};

export const addResidencySection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  let updatedContext = addSectionHeader(context, "2. Residency Status");
  updatedContext = addField(updatedContext, "Residency Status", formatResidencyStatus(formData.residencyStatus));
  updatedContext = addField(updatedContext, "Days in Pakistan", formData.residencyDays);
  updatedContext = addField(updatedContext, "Government Employee", formData.governmentEmployee);
  
  // Add some spacing
  updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  
  return updatedContext;
};
