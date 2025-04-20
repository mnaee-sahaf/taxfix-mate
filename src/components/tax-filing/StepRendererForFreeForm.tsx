
import React from 'react';
import { FreeTaxFormData } from './types';
import IdentificationStep from './form-steps/IdentificationStep';
import IncomeStep from './form-steps/IncomeStep';
import ExpensesStep from './form-steps/ExpensesStep';
import ReviewStep from './form-steps/ReviewStep';
import { useIsMobile } from '@/hooks/use-mobile';

interface StepRendererForFreeFormProps {
  stepId: string;
  formData: FreeTaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  handleNestedChange: (category: string, field: string, value: boolean | string | number) => void;
}

const StepRendererForFreeForm: React.FC<StepRendererForFreeFormProps> = ({ 
  stepId, 
  formData, 
  handleInputChange, 
  handleNestedChange 
}) => {
  const isMobile = useIsMobile();

  // Create adapted form data for components expecting TaxFormData
  const adaptedFormData = {
    ...formData,
    // Add missing properties with default values
    residencyDays: 365,
    governmentEmployee: false,
    residencyStatus: 'Resident',
    employerWithholdingTax: false,
    taxExemptAllowances: {
      conveyance: false,
      medical: false,
      houseRent: false
    },
    eligibleDeductions: {
      lifeInsurance: false,
      pension: false,
      donations: false,
      education: false,
      royalty: false,
      zakat: false
    },
    specialTaxCredits: {
      firstTimeFiler: false,
      itSector: false,
      exportIndustry: false
    },
    lifeInsuranceAmount: 0,
    pensionAmount: 0,
    donationAmount: 0,
    educationAmount: 0,
    royaltyAmount: 0,
    zakatAmount: 0,
    bankAccounts: [],
    immovableProperty: {
      residential: false,
      commercial: false,
      agricultural: false
    },
    withholdingTaxes: {
      mobileBills: false,
      vehicleRegistration: false,
      electricityBills: false,
      contractPayments: false
    },
    withholding: {
      salary: false,
      bankTransactions: false,
      utilities: false,
      mobilePhone: false,
      vehicleTax: false,
      otherTaxes: false
    },
    withholdingAmounts: {
      salary: 0,
      bankTransactions: 0,
      utilities: 0,
      mobilePhone: 0,
      vehicleTax: 0,
      otherTaxes: 0
    },
    assets: {
      agriculturalProperty: false,
      residentialProperty: false,
      stocksBonds: false,
      car: false,
      motorbike: false,
      cash: false,
      gold: false,
      other: false,
      assetsOutsidePakistan: false
    },
    assetValues: {
      agriculturalProperty: 0,
      residentialProperty: 0,
      stocksBonds: 0,
      car: 0,
      motorbike: 0,
      cash: 0,
      gold: 0,
      other: 0,
      assetsOutsidePakistan: 0
    }
  };

  // Map of step IDs to their corresponding components with required props
  const stepComponents: Record<string, React.ReactNode> = {
    'identification': (
      <div className="space-y-3 sm:space-y-4">
        <IdentificationStep 
          formData={adaptedFormData}
          handleInputChange={handleInputChange} 
        />
      </div>
    ),
    'income': (
      <div className="space-y-3 sm:space-y-4">
        <IncomeStep 
          formData={adaptedFormData}
          handleInputChange={handleInputChange} 
          handleNestedChange={handleNestedChange} 
        />
      </div>
    ),
    'expenses': (
      <div className="space-y-3 sm:space-y-4">
        <ExpensesStep 
          formData={adaptedFormData}
          handleInputChange={handleInputChange} 
          handleNestedChange={handleNestedChange} 
        />
      </div>
    ),
    'review': (
      <div className="space-y-3 sm:space-y-4">
        <ReviewStep 
          formData={adaptedFormData}
          handleInputChange={handleInputChange} 
        />
      </div>
    ),
  };

  // Return the component for the current step or null if not found
  return stepComponents[stepId] || null;
};

export default StepRendererForFreeForm;
