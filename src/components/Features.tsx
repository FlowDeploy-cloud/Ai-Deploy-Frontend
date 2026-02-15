import { motion } from "framer-motion";
import { Shield, Zap, Globe, GitMerge, Lock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Deployments",
    description: "Push to GitHub and your app is live within seconds. Zero build queues.",
  },
  {
    icon: Shield,
    title: "Free SSL Certificates",
    description: "Automatic HTTPS with Let's Encrypt. Every deployment is secured by default.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Point your domain, we handle DNS configuration and routing automatically.",
  },
  {
    icon: GitMerge,
    title: "Git Integration",
    description: "Deploy from any branch. Preview deployments for every pull request.",
  },
  {
    icon: Lock,
    title: "Encrypted Secrets",
    description: "Environment variables are encrypted at rest and in transit. Never exposed.",
  },
  {
    icon: RefreshCw,
    title: "Auto Rollbacks",
    description: "Something broke? Instantly roll back to any previous deployment with one click.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-28 md:py-32 relative">
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
          <span className="font-body text-xs text-primary tracking-widest uppercase">
            Capabilities
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Everything You Need
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 max-w-lg mx-auto px-4">
            Built for developers who want to ship fast without managing servers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glow-card rounded-lg sm:rounded-xl p-5 sm:p-7 border border-border transition-all duration-500 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={18} className="text-primary sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
