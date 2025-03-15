export interface TaxFilingData {
  // User Identification
  name: string;
  cnic: string;
  firstTimeFiler: boolean;
  taxpayerCategory: string;
  
  // Residency Status
  residencyDays: number;
  governmentEmployee: boolean;
  residencyStatus: string;
  
  // Income Sources & Values
  incomeStreams: {
    salary: boolean;
    business: boolean;
    rental: boolean;
    agricultural: boolean;
    capitalGains: boolean;
    foreign: boolean;
  };
  incomeAmounts: {
    salaryIncome: number;
    businessIncome: number;
    rentalIncome: number;
    agriculturalIncome: number;
    capitalGainsIncome: number;
    foreignIncome: number;
  };
  
  // Expenses
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
  
  // Deductions & Credits
  eligibleDeductions: {
    lifeInsurance: boolean;
    pension: boolean;
    donations: boolean;
    education: boolean;
    royalty: boolean;
    zakat: boolean;
  };
  lifeInsuranceAmount: number;
  pensionAmount: number;
  donationAmount: number;
  educationAmount: number;
  royaltyAmount: number;
  zakatAmount: number;
  
  // Assets
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
  
  // Withholding
  withholding: {
    salary: boolean;
    bankTransactions: boolean;
    utilities: boolean;
    mobilePhone: boolean;
    vehicleTax: boolean;
    otherTaxes: boolean;
  };
  withholdingAmounts: {
    salary: number;
    bankTransactions: number;
    utilities: number;
    mobilePhone: number;
    vehicleTax: number;
    otherTaxes: number;
  };
  
  // Tax Credits
  specialTaxCredits: {
    firstTimeFiler: boolean;
    itSector: boolean;
    exportIndustry: boolean;
  };
  
  // Other properties
  paymentMethod: string;
  paidTax: number;
  penaltyUnderstanding: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
