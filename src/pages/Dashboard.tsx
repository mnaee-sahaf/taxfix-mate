
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, BarChart3, Download, FileText, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaxData, TaxFormData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';
import TaxOverviewCards from '@/components/dashboard/TaxOverviewCards';
import TaxReturnOverview from '@/components/dashboard/TaxReturnOverview';
import IncomeBreakdown from '@/components/dashboard/IncomeBreakdown';
import FilingHistory from '@/components/dashboard/FilingHistory';
import EmptyDashboard from '@/components/dashboard/EmptyDashboard';
import LoadingView from '@/components/dashboard/LoadingView';
import { useIncomeData } from '@/hooks/useIncomeData';
import { formatCurrency } from '@/utils/currencyFormatter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import TaxDeadlineCard from '@/components/dashboard/TaxDeadlineCard';
import TaxInsightsPanel from '@/components/dashboard/TaxInsightsPanel';
import TaxSavingTips from '@/components/dashboard/TaxSavingTips';

interface TaxFiling {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

const Dashboard = ({ taxData: propsTaxData }: { taxData?: TaxData }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [taxFilings, setTaxFilings] = useState<TaxFiling[]>([]);
  const [taxData, setTaxData] = useState<TaxData | null>(propsTaxData || null);
  const [loading, setLoading] = useState(true);
  const [completionProgress, setCompletionProgress] = useState(0);
  
  const incomeData = useIncomeData(taxFilings);
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#AF19FF', '#FF1919'];

  useEffect(() => {
    if (propsTaxData) {
      setTaxData(propsTaxData);
    }
    
    const fetchTaxFilings = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tax_filings')
          .select('id, form_data, status, updated_at')
          .eq('user_id', user.id as any)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Properly convert data with type assertions
          const typedData: TaxFiling[] = data.map(item => ({
            id: item.id,
            form_data: item.form_data as unknown as TaxFormData,
            status: item.status,
            updated_at: item.updated_at
          }));
          
          setTaxFilings(typedData);
          
          // If we don't have tax data from props, calculate it from the most recent submitted filing
          if (!propsTaxData) {
            const submittedFiling = typedData.find(filing => filing.status === 'submitted');
            if (submittedFiling) {
              const calculatedTax = calculateTax(submittedFiling.form_data);
              setTaxData(calculatedTax);
              
              // Calculate completion progress based on filled sections
              calculateCompletionProgress(submittedFiling.form_data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching tax filings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTaxFilings();
  }, [user, isAuthenticated, propsTaxData]);

  const calculateCompletionProgress = (formData: TaxFormData) => {
    if (!formData) return;
    
    const sections = [
      !!formData.name && !!formData.cnic, // Personal info
      !!formData.residencyStatus, // Residency
      Object.values(formData.incomeStreams || {}).some(Boolean), // Income sources
      Object.values(formData.incomeAmounts || {}).some(val => val > 0), // Income amounts
      Object.values(formData.expenses || {}).some(Boolean), // Expenses
      Object.values(formData.eligibleDeductions || {}).some(Boolean), // Deductions
      Object.values(formData.assets || {}).some(Boolean), // Assets
      Object.values(formData.withholding || {}).some(Boolean), // Withholdings
    ];
    
    const completedSections = sections.filter(Boolean).length;
    setCompletionProgress((completedSections / sections.length) * 100);
  };

  const handleNewTaxFiling = () => {
    // Clear any existing tax filing data in localStorage
    localStorage.removeItem('taxFilingProgress');
    navigate('/filing');
  };

  const handleDownloadPDF = () => {
    if (taxFilings.length > 0) {
      const latestFiling = taxFilings.find(filing => filing.status === 'submitted') || taxFilings[0];
      generateTaxPDF(latestFiling.form_data);
    }
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tax Dashboard</h1>
          <div className="flex gap-3">
            {taxFilings.length > 0 && taxFilings.some(filing => filing.status === 'submitted') && (
              <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Tax Return PDF
              </Button>
            )}
            <Button onClick={handleNewTaxFiling} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              New Tax Filing
            </Button>
          </div>
        </div>

        {taxFilings.length === 0 ? (
          <EmptyDashboard />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Tax Progress Overview */}
                <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Tax Return Status</CardTitle>
                      {completionProgress === 100 && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          Complete
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-medium">{Math.round(completionProgress)}%</span>
                      </div>
                      <Progress value={completionProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
