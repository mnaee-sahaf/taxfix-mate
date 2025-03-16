
import { FreeTaxFormData } from './types';

export const initialFreeTaxFormData = {
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
  
  penaltyUnderstanding: false,
  paymentMethod: '',
  paidTax: 0
};
