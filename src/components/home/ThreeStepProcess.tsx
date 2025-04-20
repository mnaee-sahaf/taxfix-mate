import { CheckCircle } from "lucide-react";

const steps = [
  { step: 1, text: "Fill in the guided form" },
  { step: 2, text: "Download the PDF" },
  { step: 3, text: "File your taxes in Iris using the PDF" },
];

const ThreeStepProcess = () => {
  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {steps.map(({ step, text }, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-secondary/30 backdrop-blur-sm rounded-full px-6 py-4 shadow-sm max-w-xs w-full"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full text-sm font-semibold">
                {step}
              </div>
              <p className="text-sm md:text-base text-muted-foreground text-left">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
