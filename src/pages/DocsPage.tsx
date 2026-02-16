import { motion } from "framer-motion";
import { BookOpen, Code, Rocket, Settings, GitBranch, Terminal, Globe, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const sections = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Quick start guide to deploy your first application",
    items: [
      "Create an account and log in to your dashboard",
      "Connect your GitHub repository",
      "Configure your deployment settings",
      "Deploy with a single click",
    ],
  },
  {
    icon: GitBranch,
    title: "Repository Setup",
    description: "How to prepare your repository for deployment",
    items: [
      "Ensure your package.json includes a start script",
      "Add a .env.example file for environment variables",
      "Configure build commands if needed",
      "Push your code to GitHub",
    ],
  },
  {
    icon: Settings,
    title: "Environment Variables",
    description: "Managing secrets and configuration",
    items: [
      "Go to the deployment form in your dashboard",
      "Add environment variables using the UI",
      "Variables are encrypted at rest and in transit",
      "Update variables anytime from your dashboard",
    ],
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Connect your own domain to deployments",
    items: [
      "Deploy your application first",
      "Get the assigned subdomain (e.g., app.deployflow.cloud)",
      "Point your domain's DNS to our servers",
      "SSL certificates are automatically provisioned",
    ],
  },
  {
    icon: Terminal,
    title: "Build & Deploy",
    description: "Understanding the deployment process",
    items: [
      "Code is cloned from your GitHub repository",
      "Dependencies are installed automatically",
      "Build scripts are executed if specified",
      "Application starts on an assigned port",
      "SSL certificate is configured",
      "Your app is live!",
    ],
  },
  {
    icon: Lock,
    title: "Security",
    description: "Best practices for secure deployments",
    items: [
      "Always use environment variables for secrets",
      "Enable HTTPS (automatic with our platform)",
      "Keep dependencies up to date",
      "Use strong authentication for your apps",
      "Review deployment logs regularly",
    ],
  },
];

const apiExamples = [
  {
    title: "Deploy a Frontend App",
    code: `POST /api/deployments/deploy
{
  "name": "my-react-app",
  "frontend_repo": "https://github.com/user/repo",
  "frontend_port": 3000,
  "env_vars": {
    "VITE_API_URL": "https://api.example.com"
  }
}`,
  },
  {
    title: "Deploy a Full-Stack App",
    code: `POST /api/deployments/deploy
{
  "name": "my-fullstack-app",
  "frontend_repo": "https://github.com/user/frontend",
  "backend_repo": "https://github.com/user/backend",
  "frontend_port": 3000,
  "backend_port": 4000,
  "env_vars": {
    "DATABASE_URL": "mongodb://...",
    "JWT_SECRET": "your-secret"
  }
}`,
  },
];

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Documentation"
        description="Complete guide to deploying applications with DeployFlow. Learn how to deploy frontend and backend apps, manage environment variables, and configure custom domains."
        keywords="deployment documentation, deployment guide, how to deploy apps, deployment tutorial, hosting documentation"
      />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="text-primary" size={32} />
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Documentation
              </h1>
            </div>
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about deploying applications with DeployFlow.
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 sm:p-8">
              <h2 className="font-heading text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="text-primary" size={24} />
                Quick Start in 3 Steps
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold mb-1">Sign Up & Connect GitHub</h3>
                    <p className="font-body text-xs text-muted-foreground">
                      Create your account and authorize GitHub access to pull your repositories.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold mb-1">Configure Your Deployment</h3>
                    <p className="font-body text-xs text-muted-foreground">
                      Select your repository, set environment variables, and specify ports.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold mb-1">Deploy & Go Live</h3>
                    <p className="font-body text-xs text-muted-foreground">
                      Click deploy and watch your application go live in seconds with automatic SSL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Documentation Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="text-primary" size={20} />
                  </div>
                  <h3 className="font-heading text-base font-semibold">{section.title}</h3>
                </div>
                <p className="font-body text-xs text-muted-foreground mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-body text-xs text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* API Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-heading text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="text-primary" size={24} />
              API Examples
            </h2>
            <div className="space-y-6">
              {apiExamples.map((example, i) => (
                <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
                  <div className="bg-muted/30 px-4 py-2 border-b border-border/50">
                    <h3 className="font-heading text-sm font-semibold">{example.title}</h3>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="font-mono text-xs text-foreground">{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center bg-card border border-border/50 rounded-lg p-8"
          >
            <h2 className="font-heading text-xl font-bold mb-3">Need Help?</h2>
            <p className="font-body text-xs text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:support@deployflow.cloud"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body font-medium text-xs hover:opacity-90 transition-all"
              >
                Contact Support
              </a>
              <a
                href="https://github.com/yourusername/deployflow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-2.5 rounded-lg font-body text-xs hover:bg-muted/50 transition-all"
              >
                GitHub Issues
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocsPage;
