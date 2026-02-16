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
    <section id="features" className="py-20 sm:py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            Everything You Need
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            Built for developers who want to ship fast without managing servers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                <feature.icon size={16} className="text-primary" />
              </div>
              <h3 className="font-heading text-sm font-semibold mb-1.5">{feature.title}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
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
