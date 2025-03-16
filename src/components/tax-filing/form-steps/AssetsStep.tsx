
import { useState, useEffect } from 'react';
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

  // No need to initialize here now that it's in initialFormData

  const handleAssetToggle = (field: keyof typeof formData.assets) => (checked: boolean) => {
    handleNestedChange('assets', field, checked);
  };

  const handleAssetAmountChange = (field: keyof typeof formData.assetValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleNestedChange('assetValues', field, Number(e.target.value));
  };

  return (
    <div className="space-y-6">
     <AssetNotes />
      <AssetToggles 
        formData={formData} 
        handleAssetToggle={handleAssetToggle} 
      />
        <AssetValues 
            formData={formData} 
            handleAssetAmountChange={handleAssetAmountChange} 
        />
    </div>
  );
};

export default AssetsStep;
