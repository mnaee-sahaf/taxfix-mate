
// Helper functions for formatting data in the PDF
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatFieldName = (key: string): string => {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
    .trim();
};

export const formatTaxpayerCategory = (category: string): string => {
  switch (category) {
    case 'salaried-low':
      return 'Salaried Individual (Basic Salary ≤ Rs. 100k)';
    case 'salaried-high':
      return 'Salaried Individual (Basic Salary > Rs. 100k)';
    case 'business':
      return 'Business Owner/Professional';
    case 'aop':
      return 'Association of Persons (AOP)';
    case 'non-resident':
      return 'Non-Resident Pakistani';
    default:
      return category;
  }
};

export const formatResidencyStatus = (status: string): string => {
  switch (status) {
    case 'resident':
      return 'Resident';
    case 'non-resident':
      return 'Non-Resident';
    case 'conditional':
      return 'Conditional Resident';
    default:
      return status;
  }
};

export const formatPaymentMethod = (method: string): string => {
  switch (method) {
    case 'bank-transfer':
      return 'Bank Transfer';
    case 'digital-payment':
      return 'Digital Payment';
    case 'credit-card':
      return 'Credit Card';
    case 'installments':
      return 'Payment in Installments';
    default:
      return method;
  }
};
