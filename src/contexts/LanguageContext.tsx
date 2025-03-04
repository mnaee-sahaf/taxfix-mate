import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// English translations
const enTranslations = {
  navbar: {
    calculator: 'Tax Calculator',
    taxFiling: 'Tax Filing',
    login: 'Login',
  },
  hero: {
    title: 'Simplifying tax filing for Pakistan',
    subtitle: 'File your taxes effortlessly with our user-friendly platform',
    getStarted: 'Get Started',
    calculator: 'Try Calculator',
  },
  features: {
    title: 'Why Choose TaxFix',
    subtitle: 'Our platform offers comprehensive tax solutions tailored for Pakistani taxpayers',
    easyFiling: 'Easy Filing',
    easyFilingDesc: 'File your tax returns in minutes with our user-friendly interface',
    compliance: 'FBR Compliance',
    complianceDesc: 'Stay compliant with all FBR regulations and requirements',
    support: 'Expert Support',
    supportDesc: 'Get assistance from tax professionals for complex tax situations',
    security: 'Data Security',
    securityDesc: 'Your financial information is encrypted and secure',
  },
  cta: {
    title: 'Ready to simplify your tax filing?',
    description: 'Join thousands of Pakistani taxpayers who have simplified their tax compliance with TaxFix. Get started today!',
    getStarted: 'Get Started',
    tryCalculator: 'Try Tax Calculator',
    noCreditCard: 'No credit card required. Free for basic returns.',
  },
  footer: {
    solutions: 'Solutions',
    calculator: 'Tax Calculator',
    filing: 'Tax Filing',
    compliance: 'Compliance',
    company: 'Company',
    about: 'About Us',
    careers: 'Careers',
    contact: 'Contact',
    resources: 'Resources',
    blog: 'Blog',
    help: 'Help Center',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2024 TaxFix. All rights reserved.',
  },
  taxFiling: {
    title: 'Tax Filing Questionnaire',
    step: 'Step',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    userIdentification: {
      title: 'User Identification & Verification',
      cnicLabel: 'Provide your 13-digit CNIC number without hyphens',
      cnicPlaceholder: 'Enter your 13-digit CNIC number',
      firstTimeLabel: 'Is this your first time filing taxes through digital channels?',
      firstTimeYes: 'Yes',
      firstTimeNo: 'No',
      categoryLabel: 'Select your taxpayer category:',
      category1: 'Salaried Individual (Basic Salary ≤ Rs. 100k)',
      category2: 'Salaried Individual (Basic Salary > Rs. 100k)',
      category3: 'Business Owner/Professional',
      category4: 'Association of Persons (AOP)',
      category5: 'Non-Resident Pakistani',
    },
    residencyStatus: {
      title: 'Residency Status Determination',
      daysLabel: 'How many days did you physically reside in Pakistan during July 2024-June 2025?',
      daysOption1: '<120 days (Non-Resident)',
      daysOption2: '120-182 days (Conditional Resident)',
      daysOption3: '≥183 days (Resident)',
      govEmployeeLabel: 'Have you been a government employee posted abroad this tax year?',
      yes: 'Yes',
      no: 'No',
    },
    // ... other translation sections
  },
};

// Urdu translations
const urTranslations = {
  navbar: {
    calculator: 'ٹیکس کیلکولیٹر',
    taxFiling: 'ٹیکس فائلنگ',
    login: 'لاگ ان',
  },
  hero: {
    title: 'پاکستان کے لیے ٹیکس فائلنگ کو آسان بنانا',
    subtitle: 'ہمارے آسان پلیٹ فارم کے ساتھ اپنے ٹیکس آسانی سے فائل کریں',
    getStarted: 'شروع کریں',
    calculator: 'کیلکولیٹر آزمائیں',
  },
  features: {
    title: 'ٹیکس فکس کیوں چنیں',
    subtitle: 'ہمارا پلیٹ فارم پاکستانی ٹیکس دہندگان کے لیے جامع ٹیکس حل پیش کرتا ہے',
    easyFiling: 'آسان فائلنگ',
    easyFilingDesc: 'ہمارے آسان انٹرفیس کے ساتھ منٹوں میں اپنے ٹیکس ریٹرن فائل کریں',
    compliance: 'ایف بی آر کی تعمیل',
    complianceDesc: 'ایف بی آر کے تمام ضوابط اور تقاضوں کے ساتھ تعمیل کریں',
    support: 'ماہر معاونت',
    supportDesc: 'پیچیدہ ٹیکس صورتحال کے لیے ٹیکس پیشہ ور افراد سے مدد حاصل کریں',
    security: 'ڈیٹا سیکیورٹی',
    securityDesc: 'آپ کی مالیاتی معلومات انکرپٹڈ اور محفوظ ہیں',
  },
  cta: {
    title: 'اپنی ٹیکس فائلنگ کو آسان بنانے کے لیے تیار ہیں؟',
    description: 'ہزاروں پاکستانی ٹیکس دہندگان کے ساتھ شامل ہوں جنہوں نے ٹیکس فکس کے ساتھ اپنی ٹیکس تعمیل کو آسان بنایا ہے۔ آج ہی شروع کریں!',
    getStarted: 'شروع کریں',
    tryCalculator: 'ٹیکس کیلکولیٹر آزمائیں',
    noCreditCard: 'کریڈٹ کارڈ کی ضرورت نہیں۔ بنیادی ریٹرنز کے لیے مفت۔',
  },
  footer: {
    solutions: 'حل',
    calculator: 'ٹیکس کیلکولیٹر',
    filing: 'ٹیکس فائلنگ',
    compliance: 'تعمیل',
    company: 'کمپنی',
    about: 'ہمارے بارے میں',
    careers: 'کیریئرز',
    contact: 'رابطہ',
    resources: 'وسائل',
    blog: 'بلاگ',
    help: 'مدد سینٹر',
    legal: 'قانونی',
    privacy: 'پرائیویسی پالیسی',
    terms: 'سروس کی شرائط',
    copyright: '© 2024 ٹیکس فکس۔ جملہ حقوق محفوظ ہیں۔',
  },
  taxFiling: {
    title: 'ٹیکس فائلنگ سوالنامہ',
    step: 'مرحلہ',
    next: 'اگلا',
    previous: 'پچھلا',
    submit: 'جمع کروائیں',
    userIdentification: {
      title: 'صارف کی شناخت اور تصدیق',
      cnicLabel: 'اپنا 13 ہندسوں کا شناختی کارڈ نمبر بغیر ہائفن کے فراہم کریں',
      cnicPlaceholder: 'اپنا 13 ہندسوں کا شناختی کارڈ نمبر درج کریں',
      firstTimeLabel: 'کیا آپ پہلی بار ڈیجیٹل چینلز کے ذریعے ٹیکس فائل کر رہے ہیں؟',
      firstTimeYes: 'ہاں',
      firstTimeNo: 'نہیں',
      categoryLabel: 'اپنی ٹیکس دہندہ کیٹیگری منتخب کریں:',
      category1: 'تنخواہ دار فرد (بنیادی تنخواہ ≤ روپے۔ 100k)',
      category2: 'تنخواہ دار فرد (بنیادی تنخواہ > روپے۔ 100k)',
      category3: 'کاروباری مالک/پیشہ ور',
      category4: 'افراد کی انجمن (AOP)',
      category5: 'غیر مقیم پاکستانی',
    },
    residencyStatus: {
      title: 'رہائشی حیثیت کا تعین',
      daysLabel: 'جولائی 2024-جون 2025 کے دوران آپ نے پاکستان میں کتنے دن جسمانی طور پر رہائش پذیر تھے؟',
      daysOption1: '<120 دن (غیر مقیم)',
      daysOption2: '120-182 دن (مشروط مقیم)',
      daysOption3: '≥183 دن (مقیم)',
      govEmployeeLabel: 'کیا آپ اس ٹیکس سال کے دوران بیرون ملک تعینات سرکاری ملازم رہے ہیں؟',
      yes: 'ہاں',
      no: 'نہیں',
    },
    // ... other translation sections
  },
};

// Define the translations type
type Translations = typeof enTranslations;

// Create the context
interface LanguageContextProps {
  currentLanguage: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  translations: Translations;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextProps>({
  currentLanguage: 'en',
  setLanguage: () => {},
  translations: enTranslations,
  direction: 'ltr',
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get saved language from localStorage, default to 'en'
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ur'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'ur' ? 'ur' : 'en') as 'en' | 'ur';
  });

  const translations = currentLanguage === 'en' ? enTranslations : urTranslations;
  const direction = currentLanguage === 'en' ? 'ltr' : 'rtl';

  const setLanguage = (lang: 'en' | 'ur') => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  };

  // Set direction on initial load
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [direction, currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translations, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};
