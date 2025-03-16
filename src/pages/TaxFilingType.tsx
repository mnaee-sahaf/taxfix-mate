
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calculator as CalculatorIcon, Download } from 'lucide-react';
import React from 'react'; 
import { useNavigate } from 'react-router-dom';


const TaxFilingTypePage: React.FC = () => {
   
const navigate = useNavigate(); 


const SimpleTab = () => {
  
    return (
      <div className="animate-fade-up space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Simple Tax Return</CardTitle>
            <CardDescription>Good for people that just need to file their taxes to become filers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <h2>Whats included</h2>
              <ul className="list-disc pl-4">
                <li>No thinking required</li>
                <li>Free Filing</li>
                <li>3 simple steps</li>
                <li>PDF Generation</li>
                <li>Instructions on how to add into FBR</li>  
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="button-shine" onClick={() => navigate('/simple-return')}>
              <CalculatorIcon className="mr-2 h-4 w-4" />
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
          <CardHeader>
            <CardTitle>Advanced Tax Return</CardTitle>
            <CardDescription>For smart folks that want to better understand their taxes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <h2>What's included</h2>
              <ul className="list-disc pl-4">
                <li>System inbuilt calculations</li>
                <li>Guided return process</li>
                <li>8 Step Process</li>
                <li>PDF Generation</li>
                <li>Instructions on how to add into FBR</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="button-shine"  onClick={() => navigate('/dashboard')}>
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Start Filing
            </Button>
          </CardFooter>
        </Card>
    </div>
  );


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-fade-down">
              <h1 className="text-3xl font-bold mb-2">Tax Return Type</h1>
              <p className="text-muted-foreground">
                Select the type of tax return you want to file
              </p>
            </div>
            
            <Tabs defaultValue="advanced-return" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                value="simple-return" 
                className="py-2 rounded-md transition-colors duration-300 data-[state=active]:bg-green-200 data-[state=active]:text-black"

                >
                  Simple Return</TabsTrigger>
                <TabsTrigger 
                value="advanced-return"  
                className="py-2 rounded-md transition-colors duration-300 data-[state=active]:bg-green-200 data-[state=active]:text-black"

                >
                  Advanced Return</TabsTrigger>
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
