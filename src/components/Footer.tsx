import { Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <span className="font-heading text-sm font-bold flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">⚡</span>
                </div>
                deployFlow
              </span>
              <p className="font-body text-[10px] text-muted-foreground">
                © 2026 DeployFlow. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link
                to="/pricing"
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/docs"
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </Link>
              <Link
                to="/privacy"
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/yourusername/deployflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href="https://twitter.com/deployflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
