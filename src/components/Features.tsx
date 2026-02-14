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
    <section id="features" className="py-32 relative">
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
          <span className="font-body text-xs text-primary tracking-widest uppercase">
            Capabilities
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3">
            Everything You Need
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg mx-auto">
            Built for developers who want to ship fast without managing servers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glow-card rounded-xl p-7 border border-border transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
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
