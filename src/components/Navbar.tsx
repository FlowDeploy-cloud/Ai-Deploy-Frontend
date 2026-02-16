import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/yourusername/deployflow", external: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        <Link to="/" className="font-heading text-sm sm:text-base font-bold tracking-tight text-foreground flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs">⚡</span>
          </div>
          deployFlow
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signup"
            className="font-body text-xs bg-foreground text-background px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Get started
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden border-b border-border/50"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/signup"
                  className="font-body text-xs bg-foreground text-background px-4 py-2 rounded-lg text-center font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
