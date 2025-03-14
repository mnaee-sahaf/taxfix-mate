
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeNotes from './IncomeNotes';

const IncomeTabSection = () => {
  const [showNotes, setShowNotes] = useState(false);
  
  return (
    <Tabs defaultValue="income-form" className="w-full pt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="income-form">Income Details</TabsTrigger>
        <TabsTrigger value="income-notes" onClick={() => setShowNotes(true)}>Additional Notes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="income-form">
        <div className="p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm">Please ensure you report all income sources accurately as per FBR guidelines.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="income-notes">
        <IncomeNotes />
      </TabsContent>
    </Tabs>
  );
};

export default IncomeTabSection;
