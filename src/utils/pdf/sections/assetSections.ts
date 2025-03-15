
import { TaxFilingData } from '../pdfTypes';
import { PdfHelperContext, addSectionHeader, addField, checkForNewPage, addFieldWithCode } from '../pdfHelpers';
import { formatNumber, formatFieldName } from '../formatterUtils';

export const addAssetsSection = (context: PdfHelperContext, formData: TaxFilingData): PdfHelperContext => {
  // Ensure we have enough space for this section
  let updatedContext = checkForNewPage(context, 60);
  updatedContext = addSectionHeader(context, "7. Assets");
  
  // Asset codes mapping
  const assetCodes = {
    agriculturalProperty: '7001',
    residentialProperty: '7002',
    stocksBonds: '',
    car: '7008',
    motorbike: '7008',
    cash: '7012',
    gold: '7013',
    other: '',
    assetsOutsidePakistan: '7020'
  };
  
  if (Object.values(formData.assets || {}).some(Boolean)) {
    const assets = Object.entries(formData.assets || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => ({ 
        key: key,
        name: formatFieldName(key),
        value: formData.assetValues?.[key as keyof typeof formData.assetValues] || 0
      }));
      
    assets.forEach(asset => {
      const code = assetCodes[asset.key as keyof typeof assetCodes] || '';
      
      if (code) {
        updatedContext = addFieldWithCode(
          updatedContext, 
          asset.name, 
          `PKR ${formatNumber(asset.value)}`,
          code
        );
      } else {
        updatedContext = addField(
          updatedContext, 
          asset.name, 
          `PKR ${formatNumber(asset.value)}`
        );
      }
    });
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 5 };
  } else {
    updatedContext.doc.text("No assets declared", 20, updatedContext.yPos);
    updatedContext = { ...updatedContext, yPos: updatedContext.yPos + 10 };
  }
  
  return updatedContext;
};
