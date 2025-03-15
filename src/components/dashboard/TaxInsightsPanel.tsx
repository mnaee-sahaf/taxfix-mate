
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TaxData } from '@/components/tax-filing/types';
import { formatCurrency } from '@/utils/currencyFormatter';
import { BarChart3, TrendingUp } from 'lucide-react';

interface TaxInsightsPanelProps {
  taxData: TaxData | null;
}

const TaxInsightsPanel = ({ taxData }: TaxInsightsPanelProps) => {
  if (!taxData) return null;
  
  // Calculate percentages for tax breakdown
  const calculateTaxBreakdown = () => {
    const incomeTax = taxData.calculatedTax * 0.6; // Simplified: 60% of tax is income tax
    const salesTax = taxData.calculatedTax * 0.25; // 25% sales tax
    const withholding = taxData.calculatedTax * 0.15; // 15% withholding
    
    return [
      { name: 'Income Tax', value: incomeTax },
      { name: 'Sales Tax', value: salesTax },
      { name: 'Withholding', value: withholding },
    ];
  };
  
  const taxBreakdown = calculateTaxBreakdown();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  // Calculate effective tax rate
  const effectiveTaxRate = taxData.totalIncome > 0 
    ? ((taxData.calculatedTax / taxData.totalIncome) * 100).toFixed(1) 
    : '0';
  
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Tax Insights
        </CardTitle>
        <CardDescription>Analysis of your tax situation</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-3 flex items-center justify-between">
            <div className="text-sm">Effective Tax Rate</div>
            <div className="font-bold text-lg flex items-center gap-1">
              {effectiveTaxRate}%
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {taxBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))} 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            {taxBreakdown.map((item, index) => (
              <div key={index} className="text-xs">
                <div className="font-medium">{item.name}</div>
                <div className="text-muted-foreground">{formatCurrency(item.value)}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxInsightsPanel;
