import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy"
        description="DeployFlow Privacy Policy. Learn how we collect, use, and protect your personal information and deployment data."
        keywords="privacy policy, data protection, user privacy, security policy"
      />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="text-primary" size={32} />
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                Privacy Policy
              </h1>
            </div>
            <p className="font-body text-xs text-muted-foreground text-center">
              Last updated: February 16, 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="prose prose-sm prose-invert max-w-none"
          >
            <div className="space-y-8">
              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">1. Introduction</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  Welcome to DeployFlow ("we," "our," or "us"). We are committed to protecting your personal information 
                  and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                  your information when you use our deployment platform.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">2. Information We Collect</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  We collect information that you provide directly to us:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>Account information (name, email address, username, password)</li>
                  <li>GitHub account information (repository access)</li>
                  <li>Payment information (processed securely through Razorpay)</li>
                  <li>Deployment configurations and environment variables</li>
                  <li>Usage data and analytics</li>
                  <li>Communications you send to us</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your deployments and manage your applications</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">4. Data Security</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>All data transmissions are encrypted using SSL/TLS</li>
                  <li>Environment variables and secrets are encrypted at rest</li>
                  <li>Access to personal data is restricted to authorized personnel only</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Compliance with industry-standard security practices</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  We do not sell your personal information. We may share information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                  <li><strong>GitHub:</strong> To access and deploy your repositories (with your authorization)</li>
                  <li><strong>Payment Processors:</strong> With Razorpay to process payments</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">6. Data Retention</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  We retain your personal information for as long as necessary to provide our services and comply with 
                  legal obligations. When you delete your account, we will delete or anonymize your personal information 
                  within 30 days, except where we are required to retain it for legal purposes.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">7. Your Rights</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">8. Cookies and Tracking</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our service. You can instruct 
                  your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do 
                  not accept cookies, you may not be able to use some portions of our service.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">9. International Data Transfers</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  We take appropriate safeguards to ensure that your personal information remains protected in accordance 
                  with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
                  information from children under 13. If you become aware that a child has provided us with personal 
                  information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this 
                  Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">12. Contact Us</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-2">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-none space-y-2 font-body text-xs text-muted-foreground">
                  <li>• Email: privacy@deployflow.cloud</li>
                  <li>• Phone: +91 878-960-1387</li>
                  <li>• GitHub: github.com/yourusername/deployflow</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
