import React from "react";
import {
  Banknote,
  BadgeCheck,
  Building2,
  Plane,
  SmartphoneCharging,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { useScrollReveal, staggeredFadeAnimation } from "@/utils/animations";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: Building2,
    title: "Property Transactions",
    description:
      "Non-filers face up to 4% additional tax on property purchases and sales",
  },
  {
    icon: Plane,
    title: "Travel Restrictions",
    description: "Risk of being placed on no-fly list and visa application rejections",
  },
  {
    icon: SmartphoneCharging,
    title: "Mobile Services",
    description: "Potential SIM card deactivation and higher taxes on mobile services",
  },
  {
    icon: Banknote,
    title: "Banking Benefits",
    description: "Lower withholding tax rates and better banking services for filers",
  },
  {
    icon: BadgeCheck,
    title: "Business Opportunities",
    description: "Required for business registrations and government contracts",
  },
  {
    icon: ShieldCheck,
    title: "Identity Protection",
    description: "Prevent unauthorized use of your CNIC for tax fraud",
  },
];

const ReasonCloud: React.FC<{ icon: LucideIcon; title: string; description: string; index: number }> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  const { ref, revealed } = useScrollReveal(0.1 + index * 0.05);

  return (
    <div
      ref={ref}
      className={`relative bg-white dark:bg-[#1f1f1f] shadow-lg p-6 rounded-3xl border border-border transition-all duration-500 ${
        revealed ? "animate-fade-up" : "opacity-0"
      }`}
      style={revealed ? staggeredFadeAnimation(index) : undefined}
    >
      <div className="absolute bottom-[-10px] left-8 w-4 h-4 bg-white dark:bg-[#1f1f1f] rotate-45 border-l border-b border-border"></div>

      <div className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-full w-12 h-12 flex items-center justify-center">
          <Icon size={24} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const WhyPeopleShouldFileTaxes: React.FC = () => {
  const sectionReveal = useScrollReveal(0.1);

  return (
    <section className="bg-secondary/30 backdrop-blur-sm py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            ref={sectionReveal.ref}
            className={`inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
          >
         </div>

          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
            style={sectionReveal.revealed ? { animationDelay: "100ms" } : undefined}
          >
            Here’s why you should file
          </h1>

          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-lg ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
            style={sectionReveal.revealed ? { animationDelay: "200ms" } : undefined}
          >
            There is a cost to not filing as it becomes mandatory. Avoid legal hurdles along with FBR notices and fines — get real benefits as a tax filer.
          </p>
        </div>

        {/* Cloud Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCloud key={index} {...reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPeopleShouldFileTaxes;
