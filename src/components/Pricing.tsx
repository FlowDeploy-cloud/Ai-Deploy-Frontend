import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for side projects and experiments.",
    features: [
      "1 project",
      "Automatic SSL",
      "Community support",
      "500MB storage",
      "Shared resources",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For developers shipping production apps.",
    features: [
      "Unlimited projects",
      "Custom domains",
      "Priority support",
      "10GB storage",
      "Dedicated resources",
      "Auto rollbacks",
      "Preview deployments",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo",
    description: "For teams building at scale.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "50GB storage",
      "99.9% SLA",
      "Audit logs",
      "SSO integration",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-body text-xs text-primary tracking-widest uppercase">Pricing</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`rounded-xl p-8 border transition-all duration-500 ${
                plan.highlight
                  ? "border-primary/40 glow-card animate-pulse-glow"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block font-body text-xs text-primary tracking-widest uppercase mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="font-heading text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="font-body text-muted-foreground text-sm">{plan.period}</span>
                )}
              </div>
              <p className="font-body text-sm text-muted-foreground mb-8">{plan.description}</p>

              <a
                href="#"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-body text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-muted-foreground/30"
                }`}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </a>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <Check size={14} className="text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
