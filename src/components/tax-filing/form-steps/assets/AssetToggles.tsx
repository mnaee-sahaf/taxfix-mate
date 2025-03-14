
import React from 'react';
import { Label } from '@/components/ui/label';
import AssetToggleItem from './AssetToggleItem';
import { 
  Wheat,
  Building,
  TrendingUp,
  Car,
  Bike,
  DollarSign,
  Trophy,
  HelpCircle,
  Globe
} from 'lucide-react';
import { TaxFormData } from '../../types';

interface AssetTogglesProps {
  formData: TaxFormData;
  handleAssetToggle: (field: keyof TaxFormData['assets']) => (checked: boolean) => void;
}

const AssetToggles = ({ formData, handleAssetToggle }: AssetTogglesProps) => {
  const assetConfig = [
    { id: 'agriculturalProperty', field: 'agriculturalProperty', label: 'Agricultural Property', icon: Wheat, color: 'text-green-500' },
    { id: 'residentialProperty', field: 'residentialProperty', label: 'Residential Property', icon: Building, color: 'text-blue-500' },
    { id: 'stocksBonds', field: 'stocksBonds', label: 'Stocks/Bonds', icon: TrendingUp, color: 'text-purple-500' },
    { id: 'car', field: 'car', label: 'Car', icon: Car, color: 'text-red-500' },
    { id: 'motorbike', field: 'motorbike', label: 'Motorbike', icon: Bike, color: 'text-orange-500' },
    { id: 'cash', field: 'cash', label: 'Cash', icon: DollarSign, color: 'text-yellow-500' },
    { id: 'gold', field: 'gold', label: 'Gold', icon: Trophy, color: 'text-amber-500' },
    { id: 'other', field: 'other', label: 'Other', icon: HelpCircle, color: 'text-gray-500' },
    { id: 'assetsOutsidePakistan', field: 'assetsOutsidePakistan', label: 'Assets outside Pakistan', icon: Globe, color: 'text-indigo-500' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Select all applicable assets:</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {assetConfig.map(({ id, field, label, icon, color }) => (
          <AssetToggleItem
            key={id}
            id={id}
            label={label}
            checked={formData.assets?.[field as keyof typeof formData.assets] || false}
            onCheckedChange={handleAssetToggle(field as keyof typeof formData.assets)}
            icon={icon}
            iconColor={color}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetToggles;
