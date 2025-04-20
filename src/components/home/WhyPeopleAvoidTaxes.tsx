import { useScrollReveal, staggeredFadeAnimation } from "@/utils/animations";

const reasons = [
  {
    text: "I don't trust where my tax money goes",
  },
  {
    text: "I don’t know how to file",
  },
  {
    text: "I don’t think I earn enough to file",
  },
  {
    text: "I’ve been scammed by a tax consultant before",
  },
  {
    text: "I’m scared I’ll be tracked if I pay once",
  },
  {
    text: "I don’t know what documents I need",
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
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* Chat Bubbles */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {reasons.map((reason, index) => {
            const { text } = reason;
            const { ref, revealed } = revealArray[index];
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                ref={ref}
                className={`flex ${isLeft ? "justify-start" : "justify-end"} transition-all duration-500 ${
                  revealed ? "animate-fade-up" : "opacity-0"
                }`}
                style={revealed ? staggeredFadeAnimation(index) : undefined}
              >
                <div
                  className={`relative max-w-[80%] px-4 py-3 rounded-2xl flex items-start gap-2 ${
                    isLeft
                      ? "bg-muted text-muted-foreground rounded-bl-none border border-grey"
                      : "bg-green-500 text-white rounded-br-none"
                  }`}
                >
                  <p className="text-sm">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPeopleAvoidTaxes;
