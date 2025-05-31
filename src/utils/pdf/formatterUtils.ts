
// Helper functions for formatting data in the PDF
export const formatNumber = (num: number | string): string => {
  try {
    const numericValue = typeof num === 'string' ? parseFloat(num) : num;
    
    if (isNaN(numericValue)) {
      return '0';
    }
    
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(numericValue));
  } catch (error) {
    console.warn('Error formatting number:', error, { num });
    return '0';
  }
};

export const formatFieldName = (key: string): string => {
  try {
    if (!key || typeof key !== 'string') {
      return 'Unknown Field';
    }
    
    // Convert camelCase to Title Case with spaces
    return key
      .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
      .trim();
  } catch (error) {
    console.warn('Error formatting field name:', error, { key });
    return 'Unknown Field';
  }
};

export const formatTaxpayerCategory = (category: string): string => {
  try {
    if (!category || typeof category !== 'string') {
      return 'Unknown Category';
    }
    
    switch (category.toLowerCase()) {
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
        return formatFieldName(category);
    }
  } catch (error) {
    console.warn('Error formatting taxpayer category:', error, { category });
    return 'Unknown Category';
  }
};

export const formatResidencyStatus = (status: string): string => {
  try {
    if (!status || typeof status !== 'string') {
      return 'Unknown Status';
    }
    
    switch (status.toLowerCase()) {
      case 'resident':
        return 'Resident';
      case 'non-resident':
        return 'Non-Resident';
      case 'conditional':
        return 'Conditional Resident';
      default:
        return formatFieldName(status);
    }
  } catch (error) {
    console.warn('Error formatting residency status:', error, { status });
    return 'Unknown Status';
  }
};

export const formatPaymentMethod = (method: string): string => {
  try {
    if (!method || typeof method !== 'string') {
      return 'Not Specified';
    }
    
    switch (method.toLowerCase()) {
      case 'bank-transfer':
        return 'Bank Transfer';
      case 'digital-payment':
        return 'Digital Payment';
      case 'credit-card':
        return 'Credit Card';
      case 'installments':
        return 'Payment in Installments';
      default:
        return formatFieldName(method);
    }
  } catch (error) {
    console.warn('Error formatting payment method:', error, { method });
    return 'Not Specified';
  }
};

export const formatCurrency = (amount: number | string, currency: string = 'PKR'): string => {
  try {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numericAmount)) {
      return `${currency} 0`;
    }
    
    return `${currency} ${formatNumber(numericAmount)}`;
  } catch (error) {
    console.warn('Error formatting currency:', error, { amount, currency });
    return `${currency} 0`;
  }
};

export const formatBoolean = (value: boolean | string): string => {
  try {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === 'true' || lowerValue === 'yes' || lowerValue === '1') {
        return 'Yes';
      }
      if (lowerValue === 'false' || lowerValue === 'no' || lowerValue === '0') {
        return 'No';
      }
    }
    
    return 'Unknown';
  } catch (error) {
    console.warn('Error formatting boolean:', error, { value });
    return 'Unknown';
  }
};
