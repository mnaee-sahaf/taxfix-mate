import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { VideoTutorial } from './videoTutorial';
import TaxFilingFree from '@/pages/TaxFilingFree';
import ThreeStepProcess from './ThreeStepProcess';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 transition-transform duration-500 ease-out transform z-0" />
      
      <div className="container mx-auto px-4 z-10 pt-6 sm:pt-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
            Tax Filing In Pakistan is <span className="text-primary">broken</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            We radically simplify the filing experience for you and your business by giving you the information you would pay a consultant to get 🇵🇰
          </p>


          <VideoTutorial />

          <ThreeStepProcess />  

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
          {/* <TaxFilingFree /> */}
          </div>
          
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">1.1K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Returns Filed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">23+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">5-Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">₨0.3M</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Refunds Issued</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero;
