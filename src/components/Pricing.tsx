import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "₹99",
    period: "/mo",
    description: "Perfect for personal projects and MVPs.",
    features: [
      "1 Frontend deployment",
      "1 Backend deployment",
      "Automatic SSL",
      "Community support",
      "Custom subdomain",
      "Real-time logs",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹199",
    period: "/mo",
    description: "For growing startups and multiple projects.",
    features: [
      "5 Frontend deployments",
      "3 Backend deployments",
      "Everything in Starter",
      "Priority support",
      "Advanced monitoring",
      "Auto rollbacks",
      "Custom domains",
    ],
    cta: "Start Growing",
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    price: "₹299",
    period: "/mo",
    description: "For established businesses and teams.",
    features: [
      "10 Frontend deployments",
      "7 Backend deployments",
      "Everything in Growth",
      "24/7 Priority support",
      "99.9% SLA",
      "Team collaboration",
      "Audit logs",
    ],
    cta: "Scale Up",
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

const Pricing = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, isEnterprise: boolean) => {
    if (isEnterprise) {
      // Redirect to WhatsApp for enterprise plan
      const phoneNumber = "918789601387";
      const message = encodeURIComponent("Hi! I'm interested in the Enterprise plan for ClawDeploy.");
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      return;
    }

    setLoading(planId);
    try {
      // TODO: Implement Razorpay payment flow
      // 1. Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      // 2. Create order API call
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan_id: planId }),
      });

      const data = await response.json();
      
      if (!data.success) {
        alert(data.error || "Failed to create order. Please try again.");
        return;
      }

      // 3. Initialize Razorpay
      const options = {
        key: data.data.razorpay_key_id,
        amount: data.data.amount,
        currency: "INR",
        name: "ClawDeploy",
        description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Subscription`,
        order_id: data.data.order_id,
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/payments/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan_id: planId,
            }),
          });

          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
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
          color: "#3b82f6",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 md:py-32 relative">
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
          <span className="font-body text-xs text-primary tracking-widest uppercase">Pricing</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 max-w-lg mx-auto px-4">
            Choose the perfect plan for your deployment needs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`rounded-lg sm:rounded-xl p-6 sm:p-8 border transition-all duration-500 ${
                plan.highlight
                  ? "border-primary/40 glow-card animate-pulse-glow"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block font-body text-xs text-primary tracking-widest uppercase mb-3 sm:mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-xl sm:text-2xl font-bold">{plan.name}</h3>
              <div className="mt-3 sm:mt-4 mb-1.5 sm:mb-2">
                <span className="font-heading text-3xl sm:text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="font-body text-muted-foreground text-sm">{plan.period}</span>
                )}
              </div>
              <p className="font-body text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">{plan.description}</p>

              <button
                onClick={() => handleSubscribe(plan.id, plan.isEnterprise || false)}
                disabled={loading === plan.id}
                className={`flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-lg font-body text-xs sm:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-muted-foreground/30"
                }`}
              >
                {loading === plan.id ? "Processing..." : plan.cta}
                {plan.isEnterprise ? <MessageCircle size={14} /> : <ArrowRight size={14} />}
              </button>

              <ul className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 font-body text-xs sm:text-sm text-muted-foreground">
                    <Check size={14} className="text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
