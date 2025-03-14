
import { TaxFormData } from './types';

export const initialTaxFormData: TaxFormData = {
  cnic: '3420112345671',
  firstTimeFiler: false,
  taxpayerCategory: 'salaried-high',
  
  residencyDays: 200,
  governmentEmployee: false,
  residencyStatus: 'resident',
  
  incomeStreams: {
    salary: true,
    business: false,
    rental: true,
    agricultural: false,
    capitalGains: true,
    foreign: false
  },
  employerWithholdingTax: true,
  taxExemptAllowances: {
    conveyance: true,
    medical: true,
    houseRent: true
  },
  
  salaryIncome: 1200000,
  businessIncome: 0,
  rentalIncome: 350000,
  agriculturalIncome: 0,
  capitalGainsIncome: 150000,
  foreignIncome: 0,
  
  // Added incomeAmounts object to match the updated interface
  incomeAmounts: {
    salaryIncome: 1200000,
    businessIncome: 0,
    rentalIncome: 350000,
    agriculturalIncome: 0,
    capitalGainsIncome: 150000,
    foreignIncome: 0
  },
  
  eligibleDeductions: {
    lifeInsurance: true,
    pension: true,
    donations: true,
    education: true
  },
  specialTaxCredits: {
    firstTimeFiler: false,
    itSector: false,
    exportIndustry: false
  },
  
  lifeInsuranceAmount: 50000,
  pensionAmount: 120000,
  donationAmount: 80000,
  educationAmount: 150000,
  
  bankAccounts: [
    {
      accountNumber: 'PK36SCBL0000001123456702',
      bankName: 'Standard Chartered Bank',
      currentBalance: 450000
    }
  ],
  immovableProperty: {
    residential: true,
    commercial: false,
    agricultural: false
  },
  
  withholdingTaxes: {
    mobileBills: true,
    vehicleRegistration: true,
    electricityBills: false,
    contractPayments: false
  },
  
  expenses: {
    gas: false,
    electricity: false,
    water: false,
    telephone: false,
    medical: false,
    educational: false,
    travel: false,
    other: false
  },
  
  expenseAmounts: {
    gas: 0,
    electricity: 0,
    water: 0,
    telephone: 0,
    medical: 0,
    educational: 0,
    travel: 0,
    other: 0
  },
  
  assets: {
    agriculturalProperty: false,
    residentialProperty: false,
    stocksBonds: false,
    car: false,
    motorbike: false,
    cash: false,
    gold: false,
    other: false,
    assetsOutsidePakistan: false
  },
  
  assetValues: {
    agriculturalProperty: 0,
    residentialProperty: 0,
    stocksBonds: 0,
    car: 0,
    motorbike: 0,
    cash: 0,
    gold: 0,
    other: 0,
    assetsOutsidePakistan: 0
  },
  
  penaltyUnderstanding: false,
  paymentMethod: 'bank-transfer',
  paidTax: 0
};
