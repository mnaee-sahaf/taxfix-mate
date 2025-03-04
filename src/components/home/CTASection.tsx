
import { useScrollReveal } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const { ref, revealed } = useScrollReveal(0.2);
  
  return (
    <section 
      ref={ref}
      className={`py-20 relative overflow-hidden ${revealed ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-panel rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to simplify your tax filing?
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of Pakistani taxpayers who have simplified their tax
            compliance with TaxFix. Get started today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/filing">
              <Button size="lg" className="rounded-full group button-shine">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/calculator">
              <Button size="lg" variant="outline" className="rounded-full">
                Try Tax Calculator
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            No credit card required. Free for basic returns.
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
