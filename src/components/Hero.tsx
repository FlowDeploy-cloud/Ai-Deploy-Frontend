import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/image.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
      
      {/* Minimal glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 sm:mb-6 tracking-tight"
          >
            The deployment platform
            <br />
            <span className="text-muted-foreground">for everyone</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            Deploy frontend and backend apps to your own VPS. Pay only for what you deploy
            <br className="hidden sm:block" />
            and not for storing projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              to="/signup"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-body font-medium text-xs hover:opacity-90 transition-all min-w-[120px]"
            >
              Get started
            </Link>
            <a
              href="https://github.com/yourusername/deployflow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border px-5 py-2 rounded-lg font-body text-xs text-foreground hover:bg-muted/50 transition-all min-w-[120px]"
            >
              <Github size={14} />
              GitHub
              <span className="text-muted-foreground text-[10px] ml-1">3.9k</span>
            </a>
          </motion.div>

          {/* Feature Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Open source
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Self-host in minutes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Free tier
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
