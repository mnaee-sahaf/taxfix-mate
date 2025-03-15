
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TaxData, TaxFormData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';
import { useIncomeData } from './useIncomeData';

interface TaxFiling {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

interface UseDashboardDataReturn {
  taxFilings: TaxFiling[];
  taxData: TaxData | null;
  loading: boolean;
  completionProgress: number;
  incomeData: Array<{ name: string; value: number }>;
}

export const useDashboardData = (propsTaxData?: TaxData): UseDashboardDataReturn => {
  const { user, isAuthenticated } = useAuth();
  const [taxFilings, setTaxFilings] = useState<TaxFiling[]>([]);
  const [taxData, setTaxData] = useState<TaxData | null>(propsTaxData || null);
  const [loading, setLoading] = useState(true);
  const [completionProgress, setCompletionProgress] = useState(0);
  
  const incomeData = useIncomeData(taxFilings);

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

  return { taxFilings, taxData, loading, completionProgress, incomeData };
};
