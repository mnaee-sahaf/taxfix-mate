
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileText, Link, Calculator, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UsefulResourcesCard = () => {
  const navigate = useNavigate();
  
  const resources = [
    {
      title: "Tax Calculator",
      description: "Estimate your tax liability",
      icon: Calculator,
      action: () => navigate('/calculator'),
      color: "text-emerald-500"
    },
    {
      title: "FBR Portal",
      description: "Official FBR website",
      icon: ExternalLink,
      action: () => window.open('https://www.fbr.gov.pk/', '_blank'),
      color: "text-blue-500"
    },
    {
      title: "Tax Guide",
      description: "Detailed tax filing instructions",
      icon: FileText,
      action: () => window.open('https://www.fbr.gov.pk/income-tax-return-forms/51149/131169', '_blank'),
      color: "text-amber-500"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle, 
      action: () => window.open('https://www.fbr.gov.pk/categ/faqs/51149/131114', '_blank'),
      color: "text-purple-500"
    }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5 text-purple-500" />
          Useful Resources
        </CardTitle>
        <CardDescription>Helpful links and tools</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-3">
          {resources.map((resource, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="justify-start bg-white dark:bg-white/5 h-auto py-2"
              onClick={resource.action}
            >
              <div className="flex items-center gap-3">
                <div className={`${resource.color}`}>
                  <resource.icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{resource.title}</div>
                  <div className="text-xs text-muted-foreground">{resource.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsefulResourcesCard;
