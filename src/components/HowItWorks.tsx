import { motion } from "framer-motion";
import { GitBranch, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    step: "01",
    title: "Connect Your Repos",
    description:
      "Paste your frontend and backend GitHub repository links. We support any framework or language.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Add Environment Variables",
    description:
      "Securely add your .env configuration. Your secrets are encrypted and never exposed.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Deploy Automatically",
    description:
      "We clone, build, configure, and deploy everything on your VPS. Zero DevOps required.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="font-body text-xs text-primary tracking-widest uppercase">Process</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Three Steps to Production
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div className="glow-card rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-500 border border-border">
                <span className="font-heading text-4xl sm:text-5xl font-bold text-muted/80 block mb-5 sm:mb-6">
                  {step.step}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                  <step.icon size={18} className="text-primary sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 sm:mt-16 md:mt-20 max-w-3xl mx-auto"
        >
          <div className="rounded-lg sm:rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-destructive/60" />
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-primary/30" />
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-primary/60" />
              <span className="ml-2 sm:ml-3 font-body text-[10px] sm:text-xs text-muted-foreground">terminal</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-1.5 sm:space-y-2 overflow-x-auto">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> deployflow deploy --repo https://github.com/user/app
              </p>
              <p className="text-muted-foreground">Cloning repository...</p>
              <p className="text-muted-foreground">Installing dependencies...</p>
              <p className="text-muted-foreground">Building project...</p>
              <p className="text-muted-foreground">Configuring SSL certificate...</p>
              <p className="text-muted-foreground">Setting up reverse proxy...</p>
              <p className="text-primary">
                Deployed successfully at https://app.yourdomain.com
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span>{" "}
                <span className="inline-block w-2 h-4 bg-primary animate-terminal-blink" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
