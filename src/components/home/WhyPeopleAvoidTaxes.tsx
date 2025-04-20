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
    text: "I don't trust where my tax money goes.",
  },
  {
    icon: <Upload size={24} />,
    text: "I don’t know how to file.",
  },
  {
    icon: <Calculator size={24} />,
    text: "I don’t think I earn enough to file.",
  },
  {
    icon: <CreditCard size={24} />,
    text: "I’ve been scammed by a tax consultant before.",
  },
  {
    icon: <Sparkles size={24} />,
    text: "I’m scared I’ll be tracked if I pay once.",
  },
  {
    icon: <Shield size={24} />,
    text: "I don’t know what documents I need.",
  },
];

const WhyPeopleAvoidTaxes = () => {
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
          <div
            ref={sectionReveal.ref}
            className={`inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Let's Be Honest
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
            style={sectionReveal.revealed ? { animationDelay: "100ms" } : undefined}
          >
            Here’s why you don't file your taxes
          </h1>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-lg ${
              sectionReveal.revealed ? "animate-fade-up" : "opacity-0"
            }`}
            style={sectionReveal.revealed ? { animationDelay: "200ms" } : undefined}
          >
            You’re not lazy — the system is confusing, frustrating, and broken. We get it. Let’s break down the real reasons.
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

export default WhyPeopleAvoidTaxes;
