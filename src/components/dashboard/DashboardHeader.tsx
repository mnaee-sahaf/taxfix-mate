
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { TaxFormData } from '@/components/tax-filing/types';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  taxFilings: Array<{
    id: string;
    form_data: TaxFormData;
    status: string;
    updated_at: string;
  }>;
  refreshData: () => Promise<void>;
}

const DashboardHeader = ({ taxFilings, refreshData }: DashboardHeaderProps) => {
  const navigate = useNavigate();

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

  const handleRefresh = async () => {
    try {
      // Clear any cached dashboard data
      localStorage.removeItem('dashboardCache');
      
      // Refresh data from server
      await refreshData();
      
      toast.success('Dashboard refreshed', {
        description: 'The latest tax data has been loaded'
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data', {
        description: 'Please try again later'
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Tax Dashboard</h1>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleRefresh} 
          title="Refresh dashboard data"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
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
  );
};

export default DashboardHeader;
