
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
    // Calculate tax data
    const taxData = calculateTax(formData);
    console.log("Calculated Values:", taxData);

    if (updateTaxData) {
      updateTaxData(taxData);
    }

    try {
      // Show processing toast
      toast({
        title: "Processing your submission",
        description: "Please wait while we save your tax filing...",
        duration: 3000,
      });
      
      // Mark form as submitted
      const submittedFormData = {
        ...formData,
        isSubmitted: true, // Add this flag to mark it as submitted
      };
      
      // Safe type conversion for Supabase
      const formDataJson = submittedFormData as unknown as Json;
      
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
              status: 'submitted' as any,
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
              status: 'submitted' as any 
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
      
      // Also update localStorage with the submitted flag
      localStorage.setItem('taxFilingProgress', JSON.stringify(submittedFormData));
      
      // Generate PDF
      generateTaxPDF(submittedFormData);
      console.log("PDF generated successfully");
      
      // Show success animation and message
      triggerSuccessfulSubmission();
      
      toast({
        title: "Success!",
        description: "Your tax return has been submitted and a PDF report has been downloaded.",
        duration: 5000,
      });
      
      // Use a slightly longer delay before redirecting to give the user time to see the success message
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            submissionSuccess: true,
            taxData: taxData
          } 
        });
      }, 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Error submitting return",
        description: "There was an error submitting your tax return. Please try again.",
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  return { handleSubmit };
};
