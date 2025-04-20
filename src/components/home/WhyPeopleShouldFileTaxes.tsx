import {
  FileText,
  Upload,
  Calculator,
  CreditCard,
  Sparkles,
  Shield,
} from "lucide-react";
import { useScrollReveal, staggeredFadeAnimation } from "@/utils/animations";

const reasons = [
  {
    icon: <FileText size={24} />,
    text: "Extra tax on car and property transactions",
  },
  {
    icon: <Upload size={24} />,
    text: "Bans on International travel.",
  },
  {
    icon: <Calculator size={24} />,
    text: "Sim card deactivation",
  },
  {
    icon: <CreditCard size={24} />,
    text: "Returns are needed for Visa Applications",
  },
  {
    icon: <Sparkles size={24} />,
    text: "Extra fees on banking transactions",
  },
  {
    icon: <Shield size={24} />,
    text: "Soemone could be using your taxID to co",
  },
];

const WhyPeopleShouldFileTaxes = () => {
  const sectionReveal = useScrollReveal(0.1);
  const reveal0 = useScrollReveal(0.1);
  const reveal1 = useScrollReveal(0.15);
  const reveal2 = useScrollReveal(0.2);
  const reveal3 = useScrollReveal(0.25);
  const reveal4 = useScrollReveal(0.3);
  const reveal5 = useScrollReveal(0.35);

  const revealArray = [reveal0, reveal1, reveal2, reveal3, reveal4, reveal5];

  return (
    <section className="bg-secondary/30 backdrop-blur-sm py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
            style={sectionReveal.revealed ? { animationDelay: "100ms" } : undefined}
          >
            Here’s why you should
          </h1>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-lg ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
            style={sectionReveal.revealed ? { animationDelay: "200ms" } : undefined}
          >
            Being a filer is only becoming mandatory day by day, avoid FBR notices and fines and get the benefits of being a filer.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const { icon, text } = reason;
            const { ref, revealed } = revealArray[index];

            return (
              <div
                key={index}
                ref={ref}
                className={`rounded-xl p-6 glass-panel card-hover transition-all duration-500 ${
                  revealed ? "animate-fade-up" : "opacity-0"
                }`}
                style={revealed ? staggeredFadeAnimation(index) : undefined}
              >
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <p className="text-base text-muted-foreground">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPeopleShouldFileTaxes;
