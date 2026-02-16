import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, Sparkles, Bug, Mail, Wand2, Terminal, TrendingUp, Shield, Zap, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Home"
        description="DeployFlow - The deployment platform for everyone. Deploy your frontend and backend applications with ease. Fast, secure, and scalable infrastructure at your fingertips."
        keywords="deployment platform, web hosting, app deployment, frontend hosting, backend hosting, cloud deployment"
      />
      <Navbar />
      <Hero />
      <Features />

      {/* What Makes Us Different Section */}
      <section className="py-20 sm:py-24 md:py-32 relative bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="text-primary" size={16} />
              <span className="font-body text-xs text-primary font-medium">AI-Powered Intelligence</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why FlowDeploy.cloud Stands Apart
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              We don't just deploy your code. We actively improve, monitor, and enhance it automatically.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: Bug,
                title: "Automatic Bug Detection & Fixing",
                description: "Our AI automatically detects and fixes minor bugs during deployment. No need to roll back for small issues.",
                highlight: true
              },
              {
                icon: Wand2,
                title: "AI-Enhanced Frontend",
                description: "Enhance your UI just by prompting. Our AI understands your intent and applies improvements automatically.",
                highlight: true
              },
              {
                icon: Terminal,
                title: "Smart Command Detection",
                description: "We automatically detect start and build commands. No configuration files needed.",
                highlight: false
              },
              {
                icon: Mail,
                title: "Critical Alerts to Email",
                description: "Get logs, errors, and critical issues delivered directly to your inbox in real-time.",
                highlight: false
              },
              {
                icon: Eye,
                title: "Full Bug Monitoring",
                description: "Comprehensive error tracking with AI-powered insights and automatic issue categorization.",
                highlight: false
              },
              {
                icon: TrendingUp,
                title: "Smart Auto-Scaling",
                description: "Scales automatically based on actual user traffic patterns, not just simple metrics.",
                highlight: false
              },
              {
                icon: Zap,
                title: "Post-Deployment Enhancement",
                description: "Continuous monitoring and optimization even after deployment. Your app gets better over time.",
                highlight: false
              },
              {
                icon: Shield,
                title: "Deploy with Minor Bugs",
                description: "Unlike other platforms, we can deploy even with minor issues and fix them automatically.",
                highlight: true
              },
              {
                icon: Sparkles,
                title: "AI-Powered Modifications",
                description: "Modify and enhance your deployed apps through natural language commands.",
                highlight: true
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={`relative bg-card border rounded-xl p-6 hover:border-primary/30 transition-all ${
                  item.highlight ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-border/50'
                }`}
              >
                {item.highlight && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
                    AI
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                    item.highlight ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <item.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold mb-2">{item.title}</h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border/50 bg-muted/30">
                <h3 className="font-heading text-base sm:text-lg font-bold text-center">
                  FlowDeploy.cloud vs Traditional Platforms
                </h3>
              </div>
              <div className="divide-y divide-border/50">
                {[
                  {
                    feature: "Automatic bug fixing during deployment",
                    us: true,
                    others: false
                  },
                  {
                    feature: "AI-powered code enhancement",
                    us: true,
                    others: false
                  },
                  {
                    feature: "Auto-detect build & start commands",
                    us: true,
                    others: false
                  },
                  {
                    feature: "Critical alerts via email",
                    us: true,
                    others: "Limited"
                  },
                  {
                    feature: "Deploy with minor bugs",
                    us: true,
                    others: false
                  },
                  {
                    feature: "Post-deployment modifications via prompts",
                    us: true,
                    others: false
                  },
                  {
                    feature: "Intelligent auto-scaling based on user patterns",
                    us: true,
                    others: "Basic"
                  },
                  {
                    feature: "Full bug monitoring & categorization",
                    us: true,
                    others: "Manual"
                  },
                  {
                    feature: "Continuous optimization after deployment",
                    us: true,
                    others: false
                  }
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 p-4 hover:bg-muted/20 transition-colors">
                    <div className="col-span-1 font-body text-xs text-muted-foreground flex items-center">
                      {item.feature}
                    </div>
                    <div className="flex items-center justify-center">
                      {item.us === true ? (
                        <div className="flex items-center gap-1 text-primary">
                          <Check size={16} />
                          <span className="font-body text-xs font-medium">Yes</span>
                        </div>
                      ) : typeof item.us === 'string' ? (
                        <span className="font-body text-xs text-muted-foreground">{item.us}</span>
                      ) : (
                        <X size={16} className="text-muted-foreground/40" />
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      {item.others === true ? (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Check size={16} />
                          <span className="font-body text-xs">Yes</span>
                        </div>
                      ) : typeof item.others === 'string' ? (
                        <span className="font-body text-xs text-muted-foreground">{item.others}</span>
                      ) : (
                        <X size={16} className="text-muted-foreground/40" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 border-t border-border/50">
                <div></div>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-6 bg-primary"></div>
                  <span className="font-heading text-xs font-bold text-primary">FlowDeploy.cloud</span>
                  <div className="h-px w-6 bg-primary"></div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-6 bg-muted-foreground/40"></div>
                  <span className="font-heading text-xs font-bold text-muted-foreground">Other Platforms</span>
                  <div className="h-px w-6 bg-muted-foreground/40"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="font-body text-xs text-muted-foreground mb-4">
              Experience the future of deployment with AI-powered automation
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body font-medium text-xs hover:opacity-90 transition-all"
            >
              Try FlowDeploy.cloud Free
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Pricing />
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mb-8">
              Join thousands of developers deploying with confidence. Start free today.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body font-medium text-xs hover:opacity-90 transition-all"
            >
              Get Started Free
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
