import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaxData, TaxFormData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';
import TaxOverviewCards from '@/components/dashboard/TaxOverviewCards';
import TaxReturnOverview from '@/components/dashboard/TaxReturnOverview';
import IncomeBreakdown from '@/components/dashboard/IncomeBreakdown';
import FilingHistory from '@/components/dashboard/FilingHistory';
import EmptyDashboard from '@/components/dashboard/EmptyDashboard';
import NotAuthenticatedView from '@/components/dashboard/NotAuthenticatedView';
import LoadingView from '@/components/dashboard/LoadingView';
import { useIncomeData } from '@/hooks/useIncomeData';
import { formatCurrency } from '@/utils/currencyFormatter';

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
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Cast the data array to TaxFiling[] with appropriate type conversion
          const typedData: TaxFiling[] = data.map(item => ({
            ...item,
            form_data: item.form_data as unknown as TaxFormData
          }));
          
          setTaxFilings(typedData);
          
          // If we don't have tax data from props, calculate it from the most recent submitted filing
          if (!propsTaxData) {
            const submittedFiling = typedData.find(filing => filing.status === 'submitted');
            if (submittedFiling) {
              const calculatedTax = calculateTax(submittedFiling.form_data);
              setTaxData(calculatedTax);
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

  if (!isAuthenticated) {
    return <NotAuthenticatedView />;
  }

  if (loading) {
    return <LoadingView />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 mt-16">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">Tax Dashboard</h1>
            <Button onClick={() => navigate('/filing')} className="flex items-center gap-2">
              New Tax Filing
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {taxFilings.length === 0 ? (
            <EmptyDashboard />
          ) : (
            <>
              {/* Tax Overview Cards */}
              {taxData && <TaxOverviewCards taxData={taxData} formatCurrency={formatCurrency} />}

              {/* Detailed Analysis */}
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Tax Overview</TabsTrigger>
                  <TabsTrigger value="income">Income Breakdown</TabsTrigger>
                  <TabsTrigger value="history">Filing History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <TaxReturnOverview taxFilings={taxFilings} formatCurrency={formatCurrency} />
                </TabsContent>

                <TabsContent value="income">
                  <IncomeBreakdown incomeData={incomeData} formatCurrency={formatCurrency} colors={colors} />
                </TabsContent>

                <TabsContent value="history">
                  <FilingHistory taxFilings={taxFilings} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
