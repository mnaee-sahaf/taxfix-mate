
import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import CTASection from '@/components/home/CTASection';
import WhyPeopleAvoidTaxes from '@/components/home/WhyPeopleAvoidTaxes';
import WhyPeopleShouldFileTaxes from '@/components/home/WhyPeopleShouldFileTaxes';
import MailingListSignup from '@/components/home/MailingListSignup';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <WhyPeopleAvoidTaxes />
        <WhyPeopleShouldFileTaxes />
        <MailingListSignup />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
