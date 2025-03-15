
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TaxFiling from './TaxFiling';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { generateTaxPDF } from '@/utils/pdfGenerator';

const Filing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is trying to edit a submitted return
    const savedProgress = localStorage.getItem('taxFilingProgress');
    if (savedProgress) {
      try {
        const formData = JSON.parse(savedProgress);
        if (formData.isSubmitted) {
          // This is a submitted return, redirect to dashboard and show PDF
          toast({
            title: "Submitted Tax Return",
            description: "You cannot edit a submitted tax return. Viewing the PDF instead.",
            variant: "destructive",
          });
          
          // Show the PDF
          generateTaxPDF(formData);
          
          // Redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error parsing tax filing data:", error);
      }
    }
  }, [navigate, toast]);

  const handleGoBack = () => {
    navigate('/dashboard');
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
      <div className="container max-w-4xl mx-auto px-4 py-4 md:py-8 mt-16">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            className="gap-2 text-muted-foreground" 
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6 md:p-8">
          <TaxFiling updateTaxData={updateTaxData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Filing;
