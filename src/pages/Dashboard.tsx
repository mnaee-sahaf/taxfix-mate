
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, FileTextIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { TaxData, TaxFormData } from '@/components/tax-filing/types';
import { calculateTax } from '@/utils/taxCalculation';

interface TaxFiling {
  id: string;
  form_data: TaxFormData;
  status: string;
  updated_at: string;
}

const Dashboard = ({ taxData: propsTaxData }: { taxData?: TaxData }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [taxFilings, setTaxFilings] = useState<TaxFiling[]>([]);
  const [taxData, setTaxData] = useState<TaxData | null>(propsTaxData || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propsTaxData) {
      setTaxData(propsTaxData);
    }
    
    const fetchTaxFilings = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tax_filings')
          .select('id, form_data, status, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setTaxFilings(data);
          
          // If we don't have tax data from props, calculate it from the most recent submitted filing
          if (!propsTaxData) {
            const submittedFiling = data.find(filing => filing.status === 'submitted');
            if (submittedFiling) {
              const calculatedTax = calculateTax(submittedFiling.form_data);
              setTaxData(calculatedTax);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching tax filings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTaxFilings();
  }, [user, isAuthenticated, propsTaxData]);

  const getIncomeData = () => {
    if (!taxFilings.length) return [];
    
    const latestFiling = taxFilings[0];
    const incomeData = [];
    
    if (latestFiling.form_data.incomeStreams.salary) {
      incomeData.push({
        name: 'Salary',
        value: Number(latestFiling.form_data.incomeAmounts.salaryIncome || 0)
      });
    }
    
    if (latestFiling.form_data.incomeStreams.business) {
      incomeData.push({
        name: 'Business',
        value: Number(latestFiling.form_data.incomeAmounts.businessIncome || 0)
      });
    }
    
    if (latestFiling.form_data.incomeStreams.rental) {
      incomeData.push({
        name: 'Rental',
        value: Number(latestFiling.form_data.incomeAmounts.rentalIncome || 0)
      });
    }
    
    if (latestFiling.form_data.incomeStreams.agricultural) {
      incomeData.push({
        name: 'Agricultural',
        value: Number(latestFiling.form_data.incomeAmounts.agriculturalIncome || 0)
      });
    }
    
    if (latestFiling.form_data.incomeStreams.capitalGains) {
      incomeData.push({
        name: 'Capital Gains',
        value: Number(latestFiling.form_data.incomeAmounts.capitalGainsIncome || 0)
      });
    }
    
    if (latestFiling.form_data.incomeStreams.foreign) {
      incomeData.push({
        name: 'Foreign',
        value: Number(latestFiling.form_data.incomeAmounts.foreignIncome || 0)
      });
    }
    
    return incomeData;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#AF19FF', '#FF1919'];

  if (!isAuthenticated) {
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
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 mt-16">
          <div className="flex items-center justify-center h-full">
            <p>Loading your tax dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 mt-16">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">Tax Dashboard</h1>
            <Button onClick={() => navigate('/filing')} className="flex items-center gap-2">
              New Tax Filing
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {taxFilings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileTextIcon className="h-16 w-16 text-primary/40 mb-4" />
                <h2 className="text-xl font-semibold">No tax filings yet</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  You haven't submitted any tax filings yet. Start your first tax filing to see a summary here.
                </p>
                <Button className="mt-6" onClick={() => navigate('/filing')}>
                  Start First Tax Filing
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Tax Overview Cards */}
              {taxData && (
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Tax Calculated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency(taxData.calculatedTax)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Tax Paid
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency(taxData.paidTax)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Balance Due
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <div className="text-2xl font-bold">
                        {formatCurrency(taxData.balanceDue)}
                      </div>
                      {taxData.balanceDue > 0 ? (
                        <AlertTriangleIcon className="h-5 w-5 text-amber-500 ml-2" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Detailed Analysis */}
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Tax Overview</TabsTrigger>
                  <TabsTrigger value="income">Income Breakdown</TabsTrigger>
                  <TabsTrigger value="history">Filing History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tax Return Overview</CardTitle>
                      <CardDescription>
                        Summary of your most recent tax filing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {taxFilings.length > 0 ? (
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-2">Filing Status</h3>
                            <div className="flex items-center">
                              {taxFilings[0].status === 'submitted' ? (
                                <>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <CheckCircleIcon className="mr-1 h-3 w-3" />
                                    Submitted
                                  </span>
                                  <span className="ml-2 text-sm text-muted-foreground">
                                    on {new Date(taxFilings[0].updated_at).toLocaleDateString()}
                                  </span>
                                </>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                  Draft
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h3 className="font-semibold mb-2">Personal Information</h3>
                              <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {taxFilings[0].form_data.name || 'Not provided'}</p>
                                <p><span className="text-muted-foreground">CNIC:</span> {taxFilings[0].form_data.cnic || 'Not provided'}</p>
                                <p><span className="text-muted-foreground">Taxpayer Category:</span> {taxFilings[0].form_data.taxpayerCategory || 'Not specified'}</p>
                                <p><span className="text-muted-foreground">Residency Status:</span> {taxFilings[0].form_data.residencyStatus || 'Not specified'}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Income Sources</h3>
                              <div className="space-y-1 text-sm">
                                {Object.entries(taxFilings[0].form_data.incomeStreams).map(([key, value]) => 
                                  value && (
                                    <p key={key}>
                                      <span className="text-muted-foreground capitalize">{key}:</span> {formatCurrency(Number(taxFilings[0].form_data.incomeAmounts?.[key as keyof typeof taxFilings[0].form_data.incomeAmounts] || 0))}
                                    </p>
                                  )
                                )}
                                {!Object.values(taxFilings[0].form_data.incomeStreams).some(Boolean) && (
                                  <p>No income sources specified</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>No tax filing information available</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" onClick={() => navigate('/filing')}>
                        View Complete Tax Return
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="income">
                  <Card>
                    <CardHeader>
                      <CardTitle>Income Breakdown</CardTitle>
                      <CardDescription>
                        Visual breakdown of your income sources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {getIncomeData().length > 0 ? (
                        <div className="h-[300px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getIncomeData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                              <Bar dataKey="value">
                                {getIncomeData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <p className="text-muted-foreground">No income data available</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Filing History</CardTitle>
                      <CardDescription>
                        Your recent tax filing history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {taxFilings.map((filing, index) => (
                          <div 
                            key={filing.id} 
                            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <FileTextIcon className="h-5 w-5 text-primary" />
                                <h3 className="font-medium">
                                  Tax Filing {index + 1} {filing.form_data.name ? `for ${filing.form_data.name}` : ''}
                                </h3>
                                {filing.status === 'submitted' ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <CheckCircleIcon className="mr-1 h-3 w-3" />
                                    Submitted
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                    Draft
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Last updated: {new Date(filing.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <Button variant="outline" size="sm" onClick={() => {
                              localStorage.setItem('taxFilingProgress', JSON.stringify(filing.form_data));
                              navigate('/filing');
                            }}>
                              {filing.status === 'submitted' ? 'View' : 'Continue'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
