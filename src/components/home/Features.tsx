
import { useScrollReveal, staggeredFadeAnimation } from '@/utils/animations';
import { 
  Calculator, 
  FileText, 
  CreditCard, 
  Shield, 
  Database, 
  Upload, 
  Sparkles
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature = ({ icon, title, description, index }: FeatureProps) => {
  const { ref, revealed } = useScrollReveal(0.1);
  
  return (
    <div 
      ref={ref}
      className={`rounded-xl p-6 glass-panel card-hover ${revealed ? 'animate-fade-up' : 'opacity-0'}`}
      style={revealed ? staggeredFadeAnimation(index) : undefined}
    >
      <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const { ref, revealed } = useScrollReveal(0.1);
  
  const features = [
    {
      icon: <FileText size={24} />,
      title: "Smart Tax Forms",
      description: "Answer simple questions and we'll select the right tax forms automatically based on your profile.",
    },
    {
      icon: <Upload size={24} />,
      title: "Data Import",
      description: "Securely import data from your financial institutions and previous tax returns to save time.",
    },
    {
      icon: <Calculator size={24} />,
      title: "Tax Calculator",
      description: "Get real-time estimates of your tax liability or refund as you complete your return.",
    },
    // {
    //   icon: <Database size={24} />,
    //   title: "FBR Integration",
    //   description: "Submit your returns directly to FBR and track their status in real-time.",
    // },
    {
      icon: <CreditCard size={24} />,
      title: "Easy Payments",
      description: "Pay your taxes directly through the app using various payment methods.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "AI Tax Insights",
      description: "Receive AI-powered suggestions to maximize deductions and minimize audit risk.",
    },
    {
      icon: <Shield size={24} />,
      title: "Bank-Grade Security",
      description: "Your financial data is protected with end-to-end encryption and multi-factor authentication.",
    },
  ];
  
  return (
    <section className="py-20 bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div 
            ref={ref}
            className={`inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium ${revealed ? 'animate-fade-up' : 'opacity-0'}`}
          >
            Features
          </div>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${revealed ? 'animate-fade-up' : 'opacity-0'}`}
            style={revealed ? { animationDelay: '100ms' } : undefined}
          >
            Everything you need to file taxes with ease
          </h2>
          
          <p 
            className={`text-muted-foreground max-w-2xl mx-auto ${revealed ? 'animate-fade-up' : 'opacity-0'}`}
            style={revealed ? { animationDelay: '200ms' } : undefined}
          >
            Our comprehensive platform simplifies every aspect of tax filing, from data collection to final submission.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
