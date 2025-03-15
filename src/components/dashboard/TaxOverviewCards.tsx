
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
import { TaxData } from '@/components/tax-filing/types';

interface TaxOverviewCardsProps {
  taxData: TaxData;
  formatCurrency: (amount: number) => string;
}

const TaxOverviewCards = ({ taxData, formatCurrency }: TaxOverviewCardsProps) => {
  return (
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
  );
};

export default TaxOverviewCards;
