
import React from 'react';
import { TaxData, TaxFormData } from '@/components/tax-filing/types';
import { formatCurrency } from '@/utils/currencyFormatter';
import TaxOverviewCards from './TaxOverviewCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaxReturnOverview from './TaxReturnOverview';
import IncomeBreakdown from './IncomeBreakdown';
import FilingHistory from './FilingHistory';
import CompletionProgressCard from './CompletionProgressCard';
import TaxDeadlineCard from './TaxDeadlineCard';
import TaxInsightsPanel from './TaxInsightsPanel';
import TaxSavingTips from './TaxSavingTips';

interface TaxFiling {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

interface DashboardContentProps {
  taxFilings: TaxFiling[];
  taxData: TaxData | null;
  completionProgress: number;
  incomeData: Array<{ name: string; value: number }>;
}

const DashboardContent = ({ 
  taxFilings, 
  taxData, 
  completionProgress,
  incomeData 
}: DashboardContentProps) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#AF19FF', '#FF1919'];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Tax Progress Overview */}
          <CompletionProgressCard completionProgress={completionProgress} />
          
          {/* Tax Overview Cards */}
          {taxData && <TaxOverviewCards taxData={taxData} formatCurrency={formatCurrency} />}

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="bg-white dark:bg-black/20 shadow-sm rounded-lg border">
            <TabsList className="w-full border-b rounded-none p-0 h-auto">
              <TabsTrigger value="overview" className="rounded-none flex-1 py-3">Tax Overview</TabsTrigger>
              <TabsTrigger value="income" className="rounded-none flex-1 py-3">Income Breakdown</TabsTrigger>
              <TabsTrigger value="history" className="rounded-none flex-1 py-3">Filing History</TabsTrigger>
            </TabsList>

            <div className="p-4">
              <TabsContent value="overview" className="mt-0 border-none">
                <TaxReturnOverview taxFilings={taxFilings} formatCurrency={formatCurrency} />
              </TabsContent>

              <TabsContent value="income" className="mt-0 border-none">
                <IncomeBreakdown incomeData={incomeData} formatCurrency={formatCurrency} colors={colors} />
              </TabsContent>

              <TabsContent value="history" className="mt-0 border-none">
                <FilingHistory taxFilings={taxFilings} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          <TaxDeadlineCard />
          <TaxInsightsPanel taxData={taxData} />
          <TaxSavingTips />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
