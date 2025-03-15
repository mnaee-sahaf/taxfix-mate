
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileTextIcon, Calendar, ArrowRight, CheckCircle, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyDashboard = () => {
  const navigate = useNavigate();
  
  const handleNewTaxFiling = () => {
    // Clear any existing tax filing data in localStorage
    localStorage.removeItem('taxFilingProgress');
    navigate('/filing');
  };
  
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-white dark:bg-white/10 rounded-full shadow-md flex items-center justify-center">
                <FileTextIcon className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Welcome to Your Tax Dashboard</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              Start your tax filing journey to track your tax situation, manage filings, and optimize your tax planning.
            </p>
            
            <div className="flex justify-center">
              <Button size="lg" onClick={handleNewTaxFiling} className="gap-2">
                Start Your First Tax Filing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-6 text-center">Why File Your Taxes With Us?</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-white/5 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <h4 className="font-medium mb-2">Save Time</h4>
                <p className="text-sm text-muted-foreground">Our streamlined process guides you through filing in minutes, not hours.</p>
              </div>
              
              <div className="bg-white dark:bg-white/5 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="h-10 w-10 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-500 mb-4">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h4 className="font-medium mb-2">Maximize Deductions</h4>
                <p className="text-sm text-muted-foreground">Discover all eligible deductions and credits to minimize your tax liability.</p>
              </div>
              
              <div className="bg-white dark:bg-white/5 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="h-10 w-10 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center text-amber-500 mb-4">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h4 className="font-medium mb-2">Stay Compliant</h4>
                <p className="text-sm text-muted-foreground">Ensure complete FBR compliance with our regularly updated tax forms.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyDashboard;
