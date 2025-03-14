
export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface TaxFormData {
  cnic: string;
  firstTimeFiler: boolean;
  taxpayerCategory: string;
  
  residencyDays: number;
  governmentEmployee: boolean;
  residencyStatus: string;
  
  incomeStreams: {
    salary: boolean;
    business: boolean;
    rental: boolean;
    agricultural: boolean;
    capitalGains: boolean;
    foreign: boolean;
  };
  employerWithholdingTax: boolean;
  taxExemptAllowances: {
    conveyance: boolean;
    medical: boolean;
    houseRent: boolean;
  };
  
  salaryIncome: number;
  businessIncome: number;
  rentalIncome: number;
  agriculturalIncome: number;
  capitalGainsIncome: number;
  foreignIncome: number;
  
  incomeAmounts: {
    salaryIncome: number;
    businessIncome: number;
    rentalIncome: number;
    agriculturalIncome: number;
    capitalGainsIncome: number;
    foreignIncome: number;
  };
  
  eligibleDeductions: {
    lifeInsurance: boolean;
    pension: boolean;
    donations: boolean;
    education: boolean;
    royalty: boolean;
    zakat: boolean;
  };
  specialTaxCredits: {
    firstTimeFiler: boolean;
    itSector: boolean;
    exportIndustry: boolean;
  };
  
  lifeInsuranceAmount: number;
  pensionAmount: number;
  donationAmount: number;
  educationAmount: number;
  royaltyAmount: number;
  zakatAmount: number;
  
  bankAccounts: {
    accountNumber: string;
    bankName: string;
    currentBalance: number;
  }[];
  immovableProperty: {
    residential: boolean;
    commercial: boolean;
    agricultural: boolean;
  };
  
  withholdingTaxes: {
    mobileBills: boolean;
    vehicleRegistration: boolean;
    electricityBills: boolean;
    contractPayments: boolean;
  };
  
  expenses: {
    gas: boolean;
    electricity: boolean;
    water: boolean;
    telephone: boolean;
    medical: boolean;
    educational: boolean;
    travel: boolean;
    other: boolean;
  };
  
  expenseAmounts: {
    gas: number;
    electricity: number;
    water: number;
    telephone: number;
    medical: number;
    educational: number;
    travel: number;
    other: number;
  };
  
  assets: {
    agriculturalProperty: boolean;
    residentialProperty: boolean;
    stocksBonds: boolean;
    car: boolean;
    motorbike: boolean;
    cash: boolean;
    gold: boolean;
    other: boolean;
    assetsOutsidePakistan: boolean;
  };
  
  assetValues: {
    agriculturalProperty: number;
    residentialProperty: number;
    stocksBonds: number;
    car: number;
    motorbike: number;
    cash: number;
    gold: number;
    other: number;
    assetsOutsidePakistan: number;
  };
  
  penaltyUnderstanding: boolean;
  paymentMethod: string;
  paidTax: number;
}

export interface TaxData {
  calculatedTax: number;
  paidTax: number;
  balanceDue: number;
}

export interface TaxFilingProps {
  updateTaxData?: (data: TaxData) => void;
}
