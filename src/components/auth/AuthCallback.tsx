
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current hash and search params
        const hash = window.location.hash;
        const searchParams = new URLSearchParams(window.location.search);
        
        // Exchange the code for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(searchParams.get('code') || '');
        
        if (error) {
          console.error('Error in auth callback:', error);
          setError(error.message);
          toast({
            title: "Authentication Failed",
            description: error.message,
            variant: "destructive"
          });
          // Redirect to auth page after a short delay
          setTimeout(() => navigate('/auth'), 1500);
          return;
        }
        
        if (data.session) {
          toast({
            title: "Authentication Successful",
            description: "You have been signed in successfully."
          });
          // Redirect to dashboard
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Exception in auth callback:', err);
        setError('An unexpected error occurred during authentication.');
        toast({
          title: "Authentication Failed",
          description: "An unexpected error occurred during authentication.",
          variant: "destructive"
        });
        // Redirect to auth page after a short delay
        setTimeout(() => navigate('/auth'), 1500);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {error ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Authentication Error</h2>
          <p className="mt-2">{error}</p>
          <p className="mt-4">Redirecting to login page...</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Completing Authentication</h2>
          <p className="mt-2">Please wait while we complete the authentication process...</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallback;
