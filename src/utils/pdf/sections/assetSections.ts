
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, checkForNewPage } from '../pdfHelpers';
import { formatNumber, formatFieldName } from '../formatterUtils';

export const addAssetsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  // Ensure we have enough space for this section
  let updatedContext = checkForNewPage(context, 60);
  updatedContext = addSectionHeader(updatedContext, "7. Assets");
  
  if (Object.values(formData.assets || {}).some(Boolean)) {
    const assets = Object.entries(formData.assets || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ 
        name: formatFieldName(key),
        value: formData.assetValues?.[key as keyof typeof formData.assetValues] || 0
      }));
      
    assets.forEach(asset => {
      updatedContext = addField(updatedContext, asset.name, `PKR ${formatNumber(asset.value)}`);
    });
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  } else {
    updatedContext.doc.text("No assets declared", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};
