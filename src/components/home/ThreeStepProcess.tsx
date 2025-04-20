import { ArrowRight, FileText, Download, Send } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  { icon: FileText, text: "Fill in the guided form" },
  { icon: Download, text: "Download the PDF" },
  { icon: Send, text: "File your taxes in Iris using the PDF" },
];

const ThreeStepProcess = () => {
  return (
    <section className="py-20 bg-secondary/20 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold uppercase tracking-wide rounded-full bg-primary/10 text-primary">
            Simple As 1-2-3
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            File your taxes in 3 easy steps
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            No confusion. No chaos. Just follow the flow.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, text }, index) => (
            <div
              key={index}
              className="bg-white/70 dark:bg-muted/60 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary/10 text-primary rounded-full">
                <Icon size={24} />
              </div>
              <p className="text-base text-black">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-14">
          <Link to="/simple-return">
            <Button
              size="lg"
              className="rounded-full px-6 py-4 text-base font-medium bg-primary text-white hover:bg-primary/90 transition-all group"
            >
              <span>Try Now</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
