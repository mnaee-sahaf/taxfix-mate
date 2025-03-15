
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { generateTaxPDF } from '@/utils/pdfGenerator';
import { triggerSuccessfulSubmission } from '@/utils/animations';
import { TaxFormData, TaxData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';
import { initialTaxFormData } from '@/components/tax-filing/initialFormData';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UseTaxFormProps {
  updateTaxData?: (data: TaxData) => void;
}

export const useTaxForm = ({ updateTaxData }: UseTaxFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [savedProgress, setSavedProgress] = useState(true);
  const [formData, setFormData] = useState<TaxFormData>(initialTaxFormData);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Load saved form data if available
  useEffect(() => {
    const loadSavedData = async () => {
      // First try to load from Supabase if user is authenticated
      if (isAuthenticated && user) {
        try {
          const { data, error } = await supabase
            .from('tax_filings')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'draft')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();
          
          if (data && !error) {
            setFormData(data.form_data as TaxFormData);
            toast({
              title: "Draft loaded",
              description: "Your previous tax filing draft has been loaded.",
              duration: 3000,
            });
            return;
          }
        } catch (error) {
          // If no draft found or error, fall back to localStorage
          console.log('No draft found in database, checking localStorage');
        }
      }
      
      // Fall back to localStorage
      const savedData = localStorage.getItem('taxFilingProgress');
      if (savedData) {
        try {
          setFormData(JSON.parse(savedData));
          toast({
            title: "Draft loaded",
            description: "Your previous tax filing draft has been loaded.",
            duration: 3000,
          });
        } catch (error) {
          console.error('Error parsing saved data:', error);
        }
      }
    };
    
    loadSavedData();
  }, [isAuthenticated, user, toast]);
  
  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSavedProgress(false);
  };
  
  const handleNestedChange = (category: string, field: string, value: boolean | string | number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev] as any,
        [field]: value
      }
    }));
    setSavedProgress(false);
  };
  
  const nextStep = () => {
    if (currentStep < 7) { // 7 is the last index of STEPS array
      setCurrentStep(current => current + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const saveProgress = async () => {
    // Save to Supabase if authenticated
    if (isAuthenticated && user) {
      try {
        // Check if a draft already exists
        const { data: existingDrafts } = await supabase
          .from('tax_filings')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'draft');
        
        if (existingDrafts && existingDrafts.length > 0) {
          // Update existing draft
          const { error } = await supabase
            .from('tax_filings')
            .update({ form_data: formData, updated_at: new Date().toISOString() })
            .eq('id', existingDrafts[0].id);
          
          if (error) throw error;
        } else {
          // Create new draft
          const { error } = await supabase
            .from('tax_filings')
            .insert({ user_id: user.id, form_data: formData, status: 'draft' });
          
          if (error) throw error;
        }
        
        // Update user profile with basic info
        if (formData.name || formData.cnic || formData.taxpayerCategory || formData.residencyStatus) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              name: formData.name,
              cnic: formData.cnic,
              taxpayer_category: formData.taxpayerCategory,
              residency_status: formData.residencyStatus,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
          
          if (profileError) console.error('Error updating profile:', profileError);
        }
        
        toast({
          title: "Progress saved to account",
          description: "Your tax filing progress has been saved to your account.",
          duration: 3000,
        });
      } catch (error: any) {
        console.error('Error saving to Supabase:', error);
        // Fall back to localStorage
        localStorage.setItem('taxFilingProgress', JSON.stringify(formData));
        toast({
          title: "Error saving to account",
          description: "Your progress was saved locally instead.",
          duration: 3000,
        });
      }
    } else {
      // Save to localStorage if not authenticated
      localStorage.setItem('taxFilingProgress', JSON.stringify(formData));
      toast({
        title: "Progress saved locally",
        description: "Sign in to save your progress to your account.",
        duration: 3000,
      });
    }
    
    setSavedProgress(true);
  };
  
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
      // Save the completed form to Supabase
      if (user) {
        // Check if a draft already exists
        const { data: existingDrafts } = await supabase
          .from('tax_filings')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'draft');
        
        if (existingDrafts && existingDrafts.length > 0) {
          // Update existing draft to submitted
          const { error } = await supabase
            .from('tax_filings')
            .update({ 
              form_data: formData, 
              status: 'submitted',
              updated_at: new Date().toISOString() 
            })
            .eq('id', existingDrafts[0].id);
          
          if (error) throw error;
        } else {
          // Create new submitted entry
          const { error } = await supabase
            .from('tax_filings')
            .insert({ 
              user_id: user.id, 
              form_data: formData, 
              status: 'submitted' 
            });
          
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
          })
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
  
  return {
    currentStep,
    formData,
    savedProgress,
    handleInputChange,
    handleNestedChange,
    nextStep,
    prevStep,
    saveProgress,
    handleSubmit
  };
};
