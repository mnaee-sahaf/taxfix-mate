
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyDashboard = () => {
  const navigate = useNavigate();
  
  const handleNewTaxFiling = () => {
    // Clear any existing tax filing data in localStorage
    localStorage.removeItem('taxFilingProgress');
    navigate('/filing');
  };
  
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <FileTextIcon className="h-16 w-16 text-primary/40 mb-4" />
        <h2 className="text-xl font-semibold">No tax filings yet</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          You haven't submitted any tax filings yet. Start your first tax filing to see a summary here.
        </p>
        <Button className="mt-6" onClick={handleNewTaxFiling}>
          Start First Tax Filing
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyDashboard;
