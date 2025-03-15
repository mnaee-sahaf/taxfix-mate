
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Breakdown</CardTitle>
        <CardDescription>
          Visual breakdown of your income sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        {incomeData.length > 0 ? (
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="value">
                  {incomeData.map((entry, index) => (
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
  );
};

export default IncomeBreakdown;
