
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { triggerSuccessfulSubmission } from '@/utils/animations';
import { TaxFormData, TaxData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

interface UseFormSubmissionProps {
  formData: TaxFormData;
  user: any;
  isAuthenticated: boolean;
  updateTaxData?: (data: TaxData) => void;
}

export const useFormSubmission = ({
  formData,
  user,
  isAuthenticated,
  updateTaxData
}: UseFormSubmissionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    // If not authenticated, redirect to authentication page
    if (!isAuthenticated) {
      localStorage.setItem('taxFilingProgress', JSON.stringify(formData));
      toast({
        title: "Authentication required",
        description: "Please sign in to submit your tax return.",
        duration: 5000,
      });
      navigate('/auth');
      return;
    }
    
    const taxData = calculateTax(formData);
    
    console.log("Calculated Values:", taxData);

    if (updateTaxData) {
      updateTaxData(taxData);
    }

    try {
      // Safe type conversion for Supabase
      const formDataJson = formData as unknown as Json;
      
      // Save the completed form to Supabase
      if (user) {
        // Check if a draft already exists
        const { data: existingDrafts, error: queryError } = await supabase
          .from('tax_filings')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'draft' as any);
        
        if (queryError) throw queryError;
        
        if (existingDrafts && existingDrafts.length > 0) {
          // Update existing draft to submitted
          const { error } = await supabase
            .from('tax_filings')
            .update({ 
              form_data: formDataJson, 
              status: 'submitted',
              updated_at: new Date().toISOString() 
            } as any)
            .eq('id', existingDrafts[0]?.id);
          
          if (error) throw error;
        } else {
          // Create new submitted entry
          const { error } = await supabase
            .from('tax_filings')
            .insert({ 
              user_id: user.id, 
              form_data: formDataJson, 
              status: 'submitted' 
            } as any);
          
          if (error) throw error;
        }
        
        // Update profile information
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: formData.name,
            cnic: formData.cnic,
            taxpayer_category: formData.taxpayerCategory,
            residency_status: formData.residencyStatus,
            updated_at: new Date().toISOString()
          } as any)
          .eq('id', user.id);
        
        if (profileError) console.error('Error updating profile:', profileError);
      }
      
      // Generate PDF
      generateTaxPDF(formData);
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Error submitting return",
        description: "There was an error submitting your tax return. Please try again.",
        duration: 5000,
      });
      return;
    }
    
    // Clean up localStorage
    localStorage.removeItem('taxFilingProgress');
    
    triggerSuccessfulSubmission();
    
    toast({
      title: "Tax return submitted!",
      description: "Your tax return has been successfully submitted to FBR and a PDF report has been downloaded.",
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return { handleSubmit };
};
