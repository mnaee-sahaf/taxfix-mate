import { ArrowRight, CheckCircle} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';


const steps = [
  { step: 1, text: "Fill in the guided form" },
  { step: 2, text: "Download the PDF" },
  { step: 3, text: "File your taxes in Iris using the PDF" },
];

const ThreeStepProcess = () => {
  return (
    <section className="py-20 bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Simple As 1-2-3
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">File your taxes in 3 easy steps</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            No confusion. No chaos. Just follow the flow.
          </p>
        </div>

        {/* Step Bubbles */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
          {steps.map(({ step, text }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center bg-white/80 dark:bg-muted/70 rounded-2xl px-6 py-6 shadow-md w-full md:w-64 min-h-[150px] backdrop-blur-lg border border-muted transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-3 bg-secondary text-black rounded-full text-sm font-semibold">
                {step}
              </div>
              <p className="text-sm md:text-base text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link to="/simple-return">
              <Button size="lg" className="rounded-full group button-shine">
                <span>Try Now</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
    </section>
  );
};

export default ThreeStepProcess;
