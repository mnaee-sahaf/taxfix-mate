
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import AuthContainer from '@/components/auth/AuthContainer';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate(from);
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          navigate(from);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, from]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="flex items-center justify-center flex-grow pt-20 pb-10">
        <AuthContainer />
      </div>
    </div>
  );
};

export default Auth;
