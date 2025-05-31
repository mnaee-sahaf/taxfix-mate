
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import TaxFilingFree from './TaxFilingFree';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { useIsMobile } from '@/hooks/use-mobile';

const SimpleReturn: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only check for submitted returns if there's a specific flag in the URL or state
    // indicating the user is trying to view a submitted return
    const urlParams = new URLSearchParams(location.search);
    const viewSubmitted = urlParams.get('view') === 'submitted';
    
    if (viewSubmitted) {
      const savedProgress = localStorage.getItem('freeTaxFilingProgress');
      if (savedProgress) {
        try {
          const formData = JSON.parse(savedProgress);
          if (formData.isSubmitted) {
            toast({
              title: "Submitted Tax Return",
              description: "Viewing your submitted tax return PDF.",
            });
            
            // Show the PDF
            generateTaxPDF(formData);
            
            // Redirect to home page after showing PDF
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
        } catch (error) {
          console.error("Error parsing tax filing data:", error);
        }
      }
    }
  }, [navigate, toast, location.search]);

  const handleGoBack = () => {
    navigate('/taxfilingtypes');
  };

  const updateTaxData = (data: any) => {
    toast({
      title: "Tax calculation complete",
      description: `Your estimated tax is PKR ${data.calculatedTax.toLocaleString()}`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-4 md:py-8 mt-16 sm:mt-20 mb-6 sm:mb-12">
        <div className="mb-4 sm:mb-6 flex items-center">
          <Button 
            variant="ghost" 
            className="gap-1 sm:gap-2 text-muted-foreground text-sm sm:text-base p-2 sm:p-4" 
            onClick={handleGoBack}
          >
            <ArrowLeft size={isMobile ? 14 : 16} />
            Back to Filing Types
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-3 sm:p-6 md:p-8">
          <TaxFilingFree updateTaxData={updateTaxData} />
        </div>
      </div>
    </div>
  );
};

export default SimpleReturn;
