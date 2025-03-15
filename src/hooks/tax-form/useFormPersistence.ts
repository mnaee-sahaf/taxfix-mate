
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TaxFormData } from '@/components/tax-filing/types';

interface UseFormPersistenceProps {
  formData: TaxFormData;
  setSavedProgress: (value: boolean) => void;
  user: any;
  isAuthenticated: boolean;
}

export const useFormPersistence = ({ 
  formData, 
  setSavedProgress, 
  user, 
  isAuthenticated 
}: UseFormPersistenceProps) => {
  const { toast } = useToast();

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
          const savedFormData = data.form_data as TaxFormData;
          toast({
            title: "Draft loaded",
            description: "Your previous tax filing draft has been loaded.",
            duration: 3000,
          });
          return savedFormData;
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
        const parsedData = JSON.parse(savedData) as TaxFormData;
        toast({
          title: "Draft loaded",
          description: "Your previous tax filing draft has been loaded.",
          duration: 3000,
        });
        return parsedData;
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
    
    return null;
  };

  return { saveProgress, loadSavedData };
};
