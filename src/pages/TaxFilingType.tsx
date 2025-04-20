
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator as CalculatorIcon } from 'lucide-react';
import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const TaxFilingTypePage: React.FC = () => {
  const navigate = useNavigate(); 
  const isMobile = useIsMobile();

  const SimpleTab = () => {
    return (
      <div className="animate-fade-up space-y-4">
        <Card>
          <CardHeader className="space-y-1 sm:space-y-2">
            <CardTitle className="text-lg sm:text-xl md:text-2xl">Simple Tax Return</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base">
              Good for people that just need to file their taxes to become filers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
              <h2 className="text-base sm:text-lg md:text-xl font-medium">Whats included</h2>
              <ul className="list-disc pl-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>No thinking required</li>
                <li>Free Filing</li>
                <li>3 simple steps</li>
                <li>PDF Generation</li>
                <li>Instructions on how to add into FBR</li>  
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full sm:w-auto button-shine text-sm sm:text-base" 
              onClick={() => navigate('/simple-return')}
              size={isMobile ? "sm" : "default"}
            >
              <CalculatorIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Start Filing
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const AdvancedTab = () => (
    <div className="animate-fade-up">
      <Card>
        <CardHeader className="space-y-1 sm:space-y-2">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Advanced Tax Return</CardTitle>
          <CardDescription className="text-xs sm:text-sm md:text-base">
            For smart folks that want to better understand their taxes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
            <h2 className="text-base sm:text-lg md:text-xl font-medium">What's included</h2>
            <ul className="list-disc pl-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>System inbuilt calculations</li>
              <li>Guided return process</li>
              <li>8 Step Process</li>
              <li>PDF Generation</li>
              <li>Instructions on how to add into FBR</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full sm:w-auto button-shine text-sm sm:text-base" 
            onClick={() => navigate('/dashboard')}
            size={isMobile ? "sm" : "default"}
          >
            <CalculatorIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Start Filing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow px-4 pt-16 sm:pt-20 pb-8 sm:pb-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4 sm:mb-6 md:mb-10 animate-fade-down">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Tax Return Type</h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Select the type of tax return you want to file
              </p>
            </div>
            
            <Tabs defaultValue="simple-return" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 md:mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="simple-return" 
                  className="py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-md transition-colors duration-300 data-[state=active]:bg-green-100 data-[state=active]:text-black"
                >
                  Simple Return
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced-return"  
                  className="py-1 sm:py-2 text-xs sm:text-sm md:text-base rounded-md transition-colors duration-300 data-[state=active]:bg-green-100 data-[state=active]:text-black"
                >
                  Advanced Return
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="simple-return">
                <SimpleTab />
              </TabsContent>
              
              <TabsContent value="advanced-return">
                <AdvancedTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaxFilingTypePage;
