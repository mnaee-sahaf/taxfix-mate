
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { TaxFormData } from '@/components/tax-filing/types';
import { FileText, Calendar, CheckCircle, Clock } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string | null;
  cnic: string | null;
  taxpayer_category: string | null;
  residency_status: string | null;
  created_at: string;
  updated_at: string;
}

interface TaxFiling {
  id: string;
  user_id: string;
  form_data: TaxFormData;
  status: string;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [taxFilings, setTaxFilings] = useState<TaxFiling[]>([]);
  const [profileEdits, setProfileEdits] = useState({
    name: '',
    cnic: '',
    taxpayer_category: '',
    residency_status: ''
  });
  
  useEffect(() => {
    if (!user) return;
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        setProfile(profileData);
        setProfileEdits({
          name: profileData.name || '',
          cnic: profileData.cnic || '',
          taxpayer_category: profileData.taxpayer_category || '',
          residency_status: profileData.residency_status || ''
        });
        
        // Fetch tax filings
        const { data: filingsData, error: filingsError } = await supabase
          .from('tax_filings')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (filingsError) throw filingsError;
        
        setTaxFilings(filingsData || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error loading profile",
          description: "There was an error loading your profile information.",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, toast]);
  
  const handleProfileUpdate = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileEdits.name,
          cnic: profileEdits.cnic,
          taxpayer_category: profileEdits.taxpayer_category,
          residency_status: profileEdits.residency_status,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name: profileEdits.name,
          cnic: profileEdits.cnic,
          taxpayer_category: profileEdits.taxpayer_category,
          residency_status: profileEdits.residency_status,
          updated_at: new Date().toISOString()
        };
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile information.",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileEdits(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const continueTaxFiling = (filing: TaxFiling) => {
    // Store the form data in localStorage and navigate to tax filing page
    localStorage.setItem('taxFilingProgress', JSON.stringify(filing.form_data));
    navigate('/filing');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 md:py-16 mt-16">
          <div className="flex items-center justify-center h-full">
            <p>Loading profile information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 md:py-16 mt-16">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="tax-filings">Tax Filings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ''} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={profileEdits.name} 
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC Number</Label>
                    <Input 
                      id="cnic" 
                      name="cnic"
                      value={profileEdits.cnic} 
                      onChange={handleInputChange}
                      placeholder="Enter your CNIC number" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxpayer_category">Taxpayer Category</Label>
                    <Input 
                      id="taxpayer_category" 
                      name="taxpayer_category"
                      value={profileEdits.taxpayer_category} 
                      onChange={handleInputChange}
                      placeholder="e.g. Salaried, Business, etc." 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="residency_status">Residency Status</Label>
                    <Input 
                      id="residency_status" 
                      name="residency_status"
                      value={profileEdits.residency_status} 
                      onChange={handleInputChange}
                      placeholder="e.g. Resident, Non-Resident" 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="tax-filings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Tax Filings</CardTitle>
                  <CardDescription>View and manage your tax filing history</CardDescription>
                </CardHeader>
                <CardContent>
                  {taxFilings.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No tax filings yet</h3>
                      <p className="text-muted-foreground">
                        You haven't submitted any tax filings yet. Start a new tax filing to see it here.
                      </p>
                      <Button className="mt-4" onClick={() => navigate('/filing')}>
                        Start New Filing
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {taxFilings.map((filing) => (
                        <div 
                          key={filing.id} 
                          className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              <h3 className="font-medium">
                                Tax Filing {filing.form_data.name ? `for ${filing.form_data.name}` : ''}
                              </h3>
                              {filing.status === 'submitted' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Submitted
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                  <Clock className="mr-1 h-3 w-3" />
                                  Draft
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Last updated: {formatDate(filing.updated_at)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {filing.status === 'draft' && (
                              <Button onClick={() => continueTaxFiling(filing)}>
                                Continue
                              </Button>
                            )}
                            {filing.status === 'submitted' && (
                              <Button variant="outline" onClick={() => continueTaxFiling(filing)}>
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
