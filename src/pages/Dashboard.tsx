
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { TaxData } from '@/components/tax-filing/types';
import EmptyDashboard from '@/components/dashboard/EmptyDashboard';
import LoadingView from '@/components/dashboard/LoadingView';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = ({ taxData: propsTaxData }: { taxData?: TaxData }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { 
    taxFilings, 
    taxData, 
    loading, 
    completionProgress,
    incomeData,
    refreshData
  } = useDashboardData(propsTaxData);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <div className="p-6">
      <div className="grid gap-6">
        <DashboardHeader 
          taxFilings={taxFilings} 
          refreshData={refreshData}
        />

        {taxFilings.length === 0 ? (
          <EmptyDashboard />
        ) : (
          <DashboardContent 
            taxFilings={taxFilings}
            taxData={taxData}
            completionProgress={completionProgress}
            incomeData={incomeData}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
