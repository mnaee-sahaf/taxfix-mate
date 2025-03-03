
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    heroElement.style.opacity = '0';
    heroElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroElement.style.transition = 'opacity 1s ease, transform 1s ease';
      heroElement.style.opacity = '1';
      heroElement.style.transform = 'translateY(0)';
    }, 100);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      const bgElement = heroElement.querySelector('.hero-bg') as HTMLElement;
      if (bgElement) {
        bgElement.style.transform = `translate(${-xPos}px, ${-yPos}px) scale(1.1)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 transition-transform duration-500 ease-out transform z-0" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium">
            Tax filing simplified for Pakistan
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            File your taxes with <span className="text-primary">confidence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            TaxWise simplifies tax compliance for individuals and businesses in Pakistan, 
            saving you time and maximizing your returns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full group button-shine">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2M+</div>
              <div className="text-sm text-muted-foreground">Returns Filed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">5-Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">₨15B</div>
              <div className="text-sm text-muted-foreground">Refunds Issued</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero;
