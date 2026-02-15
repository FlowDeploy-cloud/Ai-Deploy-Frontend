import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Changelog", "Documentation"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Legal: ["Privacy", "Terms", "Security"],
  };

  return (
    <footer className="border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 text-center mb-12 sm:mb-16 md:mb-20 border border-border"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Ready to Stop Managing Servers?
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
            Join thousands of developers who ship faster with DeployFlow.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-body font-medium text-xs sm:text-sm hover:opacity-90 transition-all group"
          >
            Start Deploying Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-base sm:text-lg font-bold">
              deploy<span className="gradient-text">flow</span>
            </span>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed max-w-xs">
              Deploy full-stack apps to your own VPS with zero DevOps.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading text-xs sm:text-sm font-semibold mb-3 sm:mb-4">{category}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            2026 DeployFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
