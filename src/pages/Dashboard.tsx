import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, Bell, CreditCard, ArrowRight, Calendar, ChevronRight } from 'lucide-react';

const currentYear = new Date().getFullYear();
const Dashboard = ({ taxData }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 animate-fade-up">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hi there!</h1>
              <p className="text-muted-foreground">Here's an overview of your tax filing status</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <Button variant="outline" className="rounded-full">
                <Bell size={18} className="mr-2" />
                Notifications
              </Button>
              <Button onClick={() => navigate('/filing')} className="rounded-full button-shine">
                <FileText size={18} className="mr-2" />
                New Return
              </Button>
            </div>
          </div>
          
          {/* Status Card */}
          <Card className="mb-8 glass-panel">
            <CardHeader>
              <CardTitle>{currentYear} Tax Return Status</CardTitle>
              <CardDescription>Begin and submit your Tax Return to the FBR to avoid penalty charges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm font-medium">Completion: 65%</span>
                <span className="text-sm text-muted-foreground">Due: September 30, {currentYear}</span>
              </div>
              <Progress value={65} className="h-2" />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg p-4 bg-secondary/50">
                  <div className="text-muted-foreground text-sm">Calculated Tax</div>
                  <div className="text-2xl font-bold">₨ {new Intl.NumberFormat('en-US').format(taxData.calculatedTax)}</div>
                </div>
                <div className="rounded-lg p-4 bg-secondary/50">
                  <div className="text-muted-foreground text-sm">Paid Tax</div>
                  <div className="text-2xl font-bold">₨ {new Intl.NumberFormat('en-US').format(taxData.paidTax)}</div>
                </div>
                <div className="rounded-lg p-4 bg-secondary/50">
                  <div className="text-muted-foreground text-sm">Balance Due</div>
                  <div className="text-2xl font-bold text-primary">₨ {new Intl.NumberFormat('en-US').format(taxData.balanceDue)}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save & Exit</Button>
              <Button onClick={() => navigate('/filing')}>Continue Filing</Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="ghost" className="w-full justify-start">
                  <Upload size={18} className="mr-2" />
                  Upload Documents
                  <ChevronRight size={16} className="ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard size={18} className="mr-2" />
                  Make a Payment
                  <ChevronRight size={16} className="ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText size={18} className="mr-2" />
                  View Past Returns
                  <ChevronRight size={16} className="ml-auto" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Tax Calendar */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Tax Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="font-medium">Income Tax Return Deadline</div>
                      <div className="text-sm text-muted-foreground">June 30, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="font-medium">Quarterly Sales Tax</div>
                      <div className="text-sm text-muted-foreground">April 15, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="font-medium">Monthly Withholding Tax</div>
                      <div className="text-sm text-muted-foreground">March 31, 2024</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tax Insights */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Tax Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium mb-1">Potential Deduction Opportunity</div>
                    <p className="text-sm text-muted-foreground">
                      Your investment in solar panels may qualify for a renewable energy tax credit.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium mb-1">Missing Documentation</div>
                    <p className="text-sm text-muted-foreground">
                      We've noticed you haven't uploaded your salary certificates yet.
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 justify-between">
                  <span>View All Insights</span>
                  <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded">
                      <Upload size={18} />
                    </div>
                    <div>
                      <div className="font-medium">Document Uploaded</div>
                      <div className="text-sm text-muted-foreground">Bank Statement - Meezan Bank</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Today, 2:34 PM</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="font-medium">Form Completed</div>
                      <div className="text-sm text-muted-foreground">Income Details</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Yesterday, 11:15 AM</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <div className="font-medium">Payment Made</div>
                      <div className="text-sm text-muted-foreground">Advance Tax - ₨ 25,000</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">March 15, 2024</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
