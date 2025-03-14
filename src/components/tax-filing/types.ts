
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
  
  eligibleDeductions: {
    lifeInsurance: boolean;
    pension: boolean;
    donations: boolean;
    education: boolean;
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
  
  penaltyUnderstanding: boolean;
  paymentMethod: string;
  paidTax: number;
}

export interface TaxData {
  calculatedTax: number;
  paidTax: number;
  balanceDue: number;
}
