
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import AssetToggles from './assets/AssetToggles';
import AssetValues from './assets/AssetValues';
import AssetNotes from './assets/AssetNotes';

interface AssetsStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const AssetsStep = ({ formData, handleInputChange, handleNestedChange }: AssetsStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  // Initialize assets and assetValues if they don't exist
  if (!formData.assets) {
    const defaultAssets = {
      agriculturalProperty: false,
      residentialProperty: false,
      stocksBonds: false,
      car: false,
      motorbike: false,
      cash: false,
      gold: false,
      other: false,
      assetsOutsidePakistan: false
    };
    
    Object.entries(defaultAssets).forEach(([key, value]) => {
      handleNestedChange('assets', key, value);
    });
  }

  if (!formData.assetValues) {
    const defaultAssetValues = {
      agriculturalProperty: 0,
      residentialProperty: 0,
      stocksBonds: 0,
      car: 0,
      motorbike: 0,
      cash: 0,
      gold: 0,
      other: 0,
      assetsOutsidePakistan: 0
    };
    
    Object.entries(defaultAssetValues).forEach(([key, value]) => {
      handleNestedChange('assetValues', key, value);
    });
  }

  const handleAssetToggle = (field: keyof typeof formData.assets) => (checked: boolean) => {
    handleNestedChange('assets', field, checked);
  };

  const handleAssetAmountChange = (field: keyof typeof formData.assetValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('assetValues', field, Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <AssetToggles 
        formData={formData} 
        handleAssetToggle={handleAssetToggle} 
      />
      
      <Tabs defaultValue="asset-values" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="asset-values">Asset Values</TabsTrigger>
          <TabsTrigger value="asset-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="asset-values">
          <AssetValues 
            formData={formData} 
            handleAssetAmountChange={handleAssetAmountChange} 
          />
        </TabsContent>
        
        <TabsContent value="asset-notes">
          <AssetNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetsStep;
