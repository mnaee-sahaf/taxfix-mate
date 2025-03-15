
import { TaxFormData } from './types';

export const initialTaxFormData: TaxFormData = {
  name: '',
  cnic: '',
  firstTimeFiler: false,
  taxpayerCategory: '',
  
  residencyDays: 0,
  governmentEmployee: false,
  residencyStatus: '',
  
  incomeStreams: {
    salary: false,
    business: false,
    rental: false,
    agricultural: false,
    capitalGains: false,
    foreign: false
  },
  employerWithholdingTax: false,
  taxExemptAllowances: {
    conveyance: false,
    medical: false,
    houseRent: false
  },
  
  salaryIncome: 0,
  businessIncome: 0,
  rentalIncome: 0,
  agriculturalIncome: 0,
  capitalGainsIncome: 0,
  foreignIncome: 0,
  
  incomeAmounts: {
    salaryIncome: 0,
    businessIncome: 0,
    rentalIncome: 0,
    agriculturalIncome: 0,
    capitalGainsIncome: 0,
    foreignIncome: 0
  },
  
  eligibleDeductions: {
    lifeInsurance: false,
    pension: false,
    donations: false,
    education: false,
    royalty: false,
    zakat: false
  },
  specialTaxCredits: {
    firstTimeFiler: false,
    itSector: false,
    exportIndustry: false
  },
  
  lifeInsuranceAmount: 0,
  pensionAmount: 0,
  donationAmount: 0,
  educationAmount: 0,
  royaltyAmount: 0,
  zakatAmount: 0,
  
  bankAccounts: [],
  immovableProperty: {
    residential: false,
    commercial: false,
    agricultural: false
  },
  
  withholdingTaxes: {
    mobileBills: false,
    vehicleRegistration: false,
    electricityBills: false,
    contractPayments: false
  },
  
  withholding: {
    salary: false,
    bankTransactions: false,
    utilities: false,
    mobilePhone: false,
    vehicleTax: false,
    otherTaxes: false
  },
  
  withholdingAmounts: {
    salary: 0,
    bankTransactions: 0,
    utilities: 0,
    mobilePhone: 0,
    vehicleTax: 0,
    otherTaxes: 0
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
  paymentMethod: '',
  paidTax: 0
};
