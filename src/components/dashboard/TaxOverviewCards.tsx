
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangleIcon, CheckCircleIcon, ArrowDown, ArrowUp, DollarSign, BanknotesIcon, Landmark, WalletIcon } from 'lucide-react';
import { TaxData } from '@/components/tax-filing/types';

interface TaxOverviewCardsProps {
  taxData: TaxData;
  formatCurrency: (amount: number) => string;
}

const TaxOverviewCards = ({ taxData, formatCurrency }: TaxOverviewCardsProps) => {
  // Calculate percentage change (this would normally be from previous year data)
  // This is a placeholder for demonstration
  const getRandomPercentage = () => {
    return (Math.random() * 20 - 10).toFixed(1);
  };
  
  const cards = [
    {
      title: "Total Income",
      value: taxData.totalIncome,
      icon: WalletIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      change: parseFloat(getRandomPercentage())
    },
    {
      title: "Tax Calculated",
      value: taxData.calculatedTax,
      icon: Landmark,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      change: parseFloat(getRandomPercentage())
    },
    {
      title: "Tax Paid",
      value: taxData.paidTax,
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      change: parseFloat(getRandomPercentage())
    },
    {
      title: "Balance Due",
      value: taxData.balanceDue,
      icon: BanknotesIcon,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      change: 0,
      statusIcon: taxData.balanceDue > 0 ? (
        <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
      ) : (
        <CheckCircleIcon className="h-5 w-5 text-green-500" />
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border-none shadow-md overflow-hidden">
          <CardHeader className={`pb-2 ${card.bgColor}`}>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {formatCurrency(card.value)}
                </div>
                
                {card.change !== 0 && (
                  <div className="flex items-center mt-1 text-xs">
                    {card.change > 0 ? (
                      <div className="flex items-center text-emerald-500">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        {Math.abs(card.change)}%
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        {Math.abs(card.change)}%
                      </div>
                    )}
                    <span className="text-muted-foreground ml-1">vs last year</span>
                  </div>
                )}
              </div>
              
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                {card.statusIcon || <card.icon className={`h-5 w-5 ${card.color}`} />}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaxOverviewCards;
