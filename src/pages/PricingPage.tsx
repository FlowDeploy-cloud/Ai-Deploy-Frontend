import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getToken } from "@/lib/api";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/forever",
    description: "Perfect for trying out the platform.",
    features: [
      "1 Frontend deployment",
      "1 Backend deployment",
      "Basic SSL",
      "Community support",
      "Auto-scaling",
    ],
    cta: "Get Started",
    highlight: false,
    isFree: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹99",
    period: "/mo",
    description: "Great for personal projects and small teams.",
    features: [
      "3 Frontend deployments",
      "3 Backend deployments",
      "Everything in Free",
      "Email support",
      "Custom domains",
      "Auto-scaling",
    ],
    cta: "Subscribe Now",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹199",
    period: "/mo",
    description: "Ideal for growing businesses.",
    features: [
      "10 Frontend deployments",
      "10 Backend deployments",
      "Everything in Starter",
      "Priority support",
      "Advanced monitoring",
      "Team collaboration",
    ],
    cta: "Subscribe Now",
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    price: "₹299",
    period: "/mo",
    description: "For serious production workloads.",
    features: [
      "Unlimited Frontend deployments",
      "Unlimited Backend deployments",
      "Everything in Growth",
      "24/7 phone support",
      "SLA guarantee",
      "Dedicated resources",
    ],
    cta: "Subscribe Now",
    highlight: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹599",
    period: "/mo",
    description: "For large teams with advanced needs.",
    features: [
      "15+ Frontend deployments",
      "15+ Backend deployments",
      "Everything in Business",
      "Dedicated support",
      "Auto-scaling",
      "Advanced monitoring",
      "Custom SLA",
      "SSO integration",
    ],
    cta: "Contact Sales",
    highlight: false,
    isEnterprise: true,
  },
];

const PricingPage = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, isFree: boolean, isEnterprise: boolean) => {
    if (isFree) {
      window.location.href = "/signup";
      return;
    }

    if (isEnterprise) {
      const phoneNumber = "918789601387";
      const message = encodeURIComponent("Hi! I'm interested in the Enterprise plan for FlowDeploy.cloud.");
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      return;
    }

    try {
      setLoading(planId);
      const token = getToken();
      
      if (!token) {
        alert("Please log in to subscribe to a plan.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || `Server error: ${response.status}`);
        return;
      }

      const data = await response.json();
      
      if (!data.success) {
        alert(data.error || "Failed to create order. Please try again.");
        return;
      }

      if (typeof (window as any).Razorpay === 'undefined') {
        alert("Payment gateway not loaded. Please refresh the page and try again.");
        return;
      }

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "DeployFlow",
        description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Subscription`,
        order_id: data.order_id,
        handler: async function (response: any) {
          const token = getToken();
          const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/payments/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verifyResponse.json();
          if (result.success) {
            alert("Payment successful! Your subscription is now active.");
            window.location.href = "/dashboard";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#9b59b6",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Pricing"
        description="Simple, transparent pricing for DeployFlow. Choose the perfect plan for your deployment needs with free SSL, auto-scaling, and 99.9% uptime."
        keywords="pricing, deployment plans, hosting plans, web deployment cost, affordable hosting"
      />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your deployment needs. All plans include SSL, auto-scaling, and 99.9% uptime.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-xl p-6 sm:p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? "border-primary/50 bg-primary/5 scale-105"
                    : "border-border/50 bg-card"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block font-body text-[9px] text-primary tracking-widest uppercase mb-2 sm:mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading text-base sm:text-lg font-bold">{plan.name}</h3>
                <div className="mt-2 sm:mt-3 mb-1 sm:mb-1.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="font-body text-muted-foreground text-[10px]">{plan.period}</span>
                  )}
                </div>
                <p className="font-body text-[10px] text-muted-foreground mb-5 sm:mb-6">{plan.description}</p>

                <button
                  onClick={() => handleSubscribe(plan.id, plan.isFree || false, plan.isEnterprise || false)}
                  disabled={loading === plan.id}
                  className={`flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 rounded-lg font-body text-[10px] sm:text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  {loading === plan.id ? "Processing..." : plan.cta}
                  {plan.isEnterprise ? <MessageCircle size={12} /> : <ArrowRight size={12} />}
                </button>

                <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 font-body text-[10px] sm:text-xs text-muted-foreground">
                      <Check size={12} className="text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-xl sm:text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-border/50 rounded-lg p-6">
                <h3 className="font-heading text-base font-semibold mb-2">Can I change my plan later?</h3>
                <p className="font-body text-xs text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-6">
                <h3 className="font-heading text-base font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="font-body text-xs text-muted-foreground">
                  We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-6">
                <h3 className="font-heading text-base font-semibold mb-2">Is there a free trial?</h3>
                <p className="font-body text-xs text-muted-foreground">
                  Yes! The Free plan lets you test the platform with 1 frontend and 1 backend deployment forever.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-6">
                <h3 className="font-heading text-base font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="font-body text-xs text-muted-foreground">
                  Absolutely. Cancel your subscription anytime. You'll continue to have access until the end of your billing period.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <h2 className="font-heading text-xl sm:text-2xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mb-6">
              Contact our sales team for custom enterprise solutions.
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
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
