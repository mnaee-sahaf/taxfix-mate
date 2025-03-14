
import React, { useState, useEffect } from 'react';
import TaxFiling from './TaxFiling';
import Dashboard from './Dashboard';

const TaxManagement: React.FC = () => {
    const [taxData, setTaxData] = useState({
        calculatedTax: 0,
        paidTax: 0,
        balanceDue: 0
    });

    const updateTaxData = (data: {calculatedTax: number; paidTax: number; balanceDue: number;}) => {
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
