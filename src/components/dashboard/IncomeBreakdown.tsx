
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, Legend, PieChart, Pie } from 'recharts';
import { AlertCircle, BarChart3 } from 'lucide-react';

interface IncomeDataItem {
  name: string;
  value: number;
}

interface IncomeBreakdownProps {
  incomeData: IncomeDataItem[];
  formatCurrency: (amount: number) => string;
  colors: string[];
}

const IncomeBreakdown = ({ incomeData, formatCurrency, colors }: IncomeBreakdownProps) => {
  // Calculate total income
  const totalIncome = incomeData.reduce((total, item) => total + item.value, 0);
  
  // Calculate percentages for each income source
  const pieData = incomeData.map(item => ({
    ...item,
    percentage: ((item.value / totalIncome) * 100).toFixed(1) + '%'
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Income Breakdown
            </CardTitle>
            <CardDescription>
              Visual breakdown of your income sources
            </CardDescription>
          </div>
          {incomeData.length > 0 && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Income</div>
              <div className="font-bold">{formatCurrency(totalIncome)}</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {incomeData.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Bar Chart */}
              <div className="flex-1 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                      axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                      tickLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                      axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                    />
                    <RechartsTooltip 
                      formatter={(value) => formatCurrency(Number(value))} 
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Pie Chart */}
              <div className="flex-1 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Income source breakdown table */}
            <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 text-xs font-medium p-3 border-b">
                <div className="col-span-2">Source</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Percentage</div>
                <div className="text-right">Tax Code</div>
              </div>
              <div className="space-y-1 p-1">
                {pieData.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 text-xs p-2 bg-white dark:bg-black/10 rounded-md">
                    <div className="col-span-2 flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      {item.name}
                    </div>
                    <div className="text-right">{formatCurrency(item.value)}</div>
                    <div className="text-right">{item.percentage}</div>
                    <div className="text-right">
                      {item.name === 'Salary' && '1009'}
                      {item.name === 'Business' && '3128'}
                      {item.name === 'Foreign' && '6000'}
                      {item.name === 'Rental' && '4000'}
                      {item.name === 'Capital Gains' && '5000'}
                      {item.name === 'Agricultural' && '2000'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-amber-400 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No income data available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete your tax filing to see your income breakdown
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeBreakdown;
