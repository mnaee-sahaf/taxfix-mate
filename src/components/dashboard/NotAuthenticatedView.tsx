
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotAuthenticatedView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 mt-16">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <FileTextIcon className="h-20 w-20 text-primary/50" />
          <h1 className="text-3xl font-bold">Dashboard Access Required</h1>
          <p className="text-muted-foreground max-w-md">
            Please sign in or create an account to access your personalized tax dashboard and manage your tax filings.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigate('/filing')}>
              Start Tax Filing
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotAuthenticatedView;
