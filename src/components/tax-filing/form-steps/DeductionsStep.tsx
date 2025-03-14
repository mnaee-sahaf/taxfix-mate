
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxFormData } from '../types';
import DeductionNotes from './deductions/DeductionNotes';

interface DeductionsStepProps {
  formData: TaxFormData;
}

const DeductionsStep = ({ formData }: DeductionsStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="space-y-6">
      <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm">Deductions section is under development.</p>
      </div>

      <Tabs defaultValue="deductions-form" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deductions-form">Deduction Details</TabsTrigger>
          <TabsTrigger value="deductions-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deductions-form">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm">Claim all eligible deductions to reduce your taxable income.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="deductions-notes">
          <DeductionNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeductionsStep;
