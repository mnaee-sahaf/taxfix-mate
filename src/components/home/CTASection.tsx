
import { useScrollReveal } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { ref, revealed } = useScrollReveal(0.2);
  const { translations, direction } = useLanguage();
  const t = translations.cta;
  
  return (
    <section 
      ref={ref}
      className={`py-20 relative overflow-hidden ${revealed ? 'animate-fade-up' : 'opacity-0'}`}
      dir={direction}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-panel rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full group button-shine">
              <span>{t.getStarted}</span>
              <ArrowRight className={`${direction === 'ltr' ? 'ml-2' : 'mr-2'} h-4 w-4 transition-transform ${direction === 'ltr' ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
            </Button>
            
            <Button size="lg" variant="outline" className="rounded-full">
              <Link to="/calculator">{t.tryCalculator}</Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            {t.noCreditCard}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
    </section>
  );
};

export default CTASection;
