
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import ReviewNotes from './review/ReviewNotes';
import { calculateTotalIncome, calculateTotalDeductions } from '@/utils/pdf/calculationUtils';

interface ReviewStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
}

const ReviewStep = ({ formData, handleInputChange }: ReviewStepProps) => {
  const [showNotes, setShowNotes] = useState(false);
  
  // Calculate totals using the utility functions for consistency
  const totalIncome = calculateTotalIncome(formData);
  const totalDeductions = calculateTotalDeductions(formData);

  return (
    
    <div className="space-y-6">
     <ReviewNotes />
      <div className="bg-secondary/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Review Your Information</h3>
        <p className="text-sm text-muted-foreground mb-4">Please review the information you've provided before final submission.</p>
        
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium">CNIC:</span> 
            <span className="text-sm ml-2">{formData.cnic}</span>
          </div>
          
          <div>
            <span className="text-sm font-medium">Taxpayer Category:</span> 
            <span className="text-sm ml-2">{formData.taxpayerCategory}</span>
          </div>
          
          <div>
            <span className="text-sm font-medium">Residency Status:</span> 
            <span className="text-sm ml-2">{formData.residencyStatus}</span>
          </div>
          
          <div>
            <span className="text-sm font-medium">Total Income:</span> 
            <span className="text-sm ml-2">
              {new Intl.NumberFormat('en-US').format(totalIncome)} PKR
            </span>
          </div>
          
          <div>
            <span className="text-sm font-medium">Total Deductions:</span>
            <span className="text-sm ml-2">
              {new Intl.NumberFormat('en-US').format(totalDeductions)} PKR
            </span>
          </div>
          
          <div>
            <span className="text-sm font-medium">Taxes Already Paid:</span>
            <span className="text-sm ml-2">{new Intl.NumberFormat('en-US').format(formData.paidTax)} PKR</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="penaltyUnderstanding" 
            checked={formData.penaltyUnderstanding}
            onCheckedChange={(checked) => handleInputChange('penaltyUnderstanding', checked)}
          />
          <Label htmlFor="penaltyUnderstanding" className="cursor-pointer text-sm">
            I understand that providing false information may result in penalties under Section 181 of Income Tax Ordinance, 2001.
          </Label>
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <Label htmlFor="paymentMethod" className="text-base">Select payment method for balance due (if applicable):</Label>
        <Select 
          value={formData.paymentMethod} 
          onValueChange={(value) => handleInputChange('paymentMethod', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            <SelectItem value="digital-payment">Digital Payment</SelectItem>
            <SelectItem value="credit-card">Credit Card</SelectItem>
            <SelectItem value="installments">Pay in Installments</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ReviewStep;
