
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { TaxFormData } from '@/components/tax-filing/types';

interface DashboardHeaderProps {
  taxFilings: Array<{
    id: string;
    form_data: TaxFormData;
    status: string;
    updated_at: string;
  }>;
}

const DashboardHeader = ({ taxFilings }: DashboardHeaderProps) => {
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

  return (
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
  );
};

export default DashboardHeader;
