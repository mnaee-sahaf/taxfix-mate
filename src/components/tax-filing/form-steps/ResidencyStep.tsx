
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Info } from 'lucide-react';
import { TaxFormData } from '../types';
import ResidencyNotes from './residency/ResidencyNotes';

interface ResidencyStepProps {
  formData: TaxFormData;
  handleInputChange: (name: string, value: string | number | boolean) => void;
}

const ResidencyStep = ({ formData, handleInputChange }: ResidencyStepProps) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="residencyDays" className="text-base">How many days did you physically reside in Pakistan during this tax year?</Label>
          <Input 
            id="residencyDays" 
            type="number" 
            value={formData.residencyDays.toString()} 
            onChange={(e) => {
              const days = Number(e.target.value);
              let status = '';
              
              if (days < 120) status = 'non-resident';
              else if (days < 183) status = 'conditional';
              else status = 'resident';
              
              handleInputChange('residencyDays', days);
              handleInputChange('residencyStatus', status);
            }}
            min="0"
            max="366"
          />
          <div className="px-3 py-2 bg-secondary/40 rounded mt-2 text-sm">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 text-primary" />
              <span>
                {formData.residencyDays < 120 ? 
                  "You are considered a Non-Resident for tax purposes." : 
                  formData.residencyDays < 183 ? 
                  "You are considered a Conditional Resident for tax purposes." : 
                  "You are considered a Resident for tax purposes."}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label className="text-base">Have you been a government employee posted abroad this tax year?</Label>
          <p className="text-sm text-muted-foreground">If yes, you are automatically classified as a resident per FBR rules.</p>
          <div className="flex items-center space-x-2 mt-2">
            <Switch 
              id="governmentEmployee" 
              checked={formData.governmentEmployee}
              onCheckedChange={(checked) => {
                handleInputChange('governmentEmployee', checked);
                if (checked) {
                  handleInputChange('residencyStatus', 'resident');
                } else {
                  const days = formData.residencyDays;
                  let status = '';
                  
                  if (days < 120) status = 'non-resident';
                  else if (days < 183) status = 'conditional';
                  else status = 'resident';
                  
                  handleInputChange('residencyStatus', status);
                }
              }}
            />
            <Label htmlFor="governmentEmployee" className="cursor-pointer">
              {formData.governmentEmployee ? 'Yes' : 'No'}
            </Label>
          </div>
          
          {formData.governmentEmployee && (
            <div className="px-3 py-2 bg-green-100 dark:bg-green-900/20 rounded mt-2 text-sm">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400" />
                <span>You are automatically classified as a resident for tax purposes.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="residency-form" className="w-full pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="residency-form">Residency Details</TabsTrigger>
          <TabsTrigger value="residency-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="residency-form">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm">Your residency status determines how your income will be taxed in Pakistan.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="residency-notes">
          <ResidencyNotes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResidencyStep;
