
import React, { useState } from 'react';
import TaxFiling from './TaxFiling';
import Dashboard from './Dashboard';
import { TaxData } from '@/components/tax-filing/types';

const TaxManagement: React.FC = () => {
    const [taxData, setTaxData] = useState<TaxData>({
        calculatedTax: 0,
        paidTax: 0,
        balanceDue: 0
    });

    const updateTaxData = (data: TaxData) => {
        if (!data) return;
        console.log("Updating tax data:", data); // Log the incoming data
        setTaxData(data);
    };

    console.log("Current tax data:", taxData); // Log the current state of taxData

    return ( 
        <div>
            <Dashboard taxData={taxData} />
            <TaxFiling updateTaxData={updateTaxData} />
        </div>
    );
};

export default TaxManagement;
