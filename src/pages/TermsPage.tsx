import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service"
        description="DeployFlow Terms of Service. Read our terms and conditions for using our deployment platform and hosting services."
        keywords="terms of service, terms and conditions, user agreement, service agreement"
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
              <FileText className="text-primary" size={32} />
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                Terms of Service
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
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  By accessing and using DeployFlow ("the Service"), you accept and agree to be bound by the terms 
                  and provisions of this agreement. If you do not agree to these Terms of Service, please do not 
                  use the Service.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">2. Description of Service</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  DeployFlow provides a platform for deploying, hosting, and managing web applications. The Service 
                  includes automated deployment from GitHub repositories, SSL certificates, custom domains, and related 
                  features as described on our website.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">3. User Accounts</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  To use the Service, you must:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>Be at least 13 years of age</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">4. Acceptable Use</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Upload malicious code, viruses, or malware</li>
                  <li>Engage in cryptocurrency mining without permission</li>
                  <li>Conduct DDoS attacks or other harmful activities</li>
                  <li>Host illegal content or engage in illegal activities</li>
                  <li>Spam, phish, or engage in fraudulent activities</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">5. Subscription and Payments</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  Regarding subscriptions and payments:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li><strong>Billing:</strong> Subscriptions are billed monthly in advance</li>
                  <li><strong>Payment:</strong> You authorize us to charge your payment method automatically</li>
                  <li><strong>Refunds:</strong> Refunds are provided at our discretion, typically within 7 days of purchase</li>
                  <li><strong>Price Changes:</strong> We may change prices with 30 days notice</li>
                  <li><strong>Cancellation:</strong> You may cancel your subscription at any time</li>
                  <li><strong>Suspension:</strong> We may suspend service for non-payment</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">6. Service Level and Uptime</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  We strive to provide 99.9% uptime but do not guarantee uninterrupted service. We are not liable 
                  for any downtime, service interruptions, or data loss. Scheduled maintenance will be communicated 
                  in advance when possible.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">7. Content Ownership and Rights</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  Regarding content and intellectual property:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>You retain all rights to your applications and content</li>
                  <li>You grant us a license to host, deploy, and serve your content</li>
                  <li>You are responsible for ensuring you have rights to deploy your content</li>
                  <li>DeployFlow and its design, features, and branding are our property</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">8. Data Backup and Loss</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  While we make reasonable efforts to backup data, you are solely responsible for maintaining backups 
                  of your applications and data. We are not liable for any data loss regardless of cause.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">9. Termination</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                  We reserve the right to:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>Suspend or terminate your account for violations of these terms</li>
                  <li>Remove content that violates our policies</li>
                  <li>Refuse service to anyone for any reason</li>
                  <li>Delete accounts inactive for more than 12 months</li>
                </ul>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mt-3">
                  Upon termination, your right to use the Service will immediately cease. We may delete your data 
                  after a 7-day grace period following termination.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">10. Limitation of Liability</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  To the maximum extent permitted by law, DeployFlow shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-body text-xs text-muted-foreground">
                  <li>Your use or inability to use the Service</li>
                  <li>Unauthorized access to your data or deployments</li>
                  <li>Service interruptions or downtime</li>
                  <li>Any conduct or content of third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">11. Indemnification</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  You agree to indemnify and hold harmless DeployFlow and its officers, directors, employees, and 
                  agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising 
                  from your use of the Service or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">12. Dispute Resolution</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  Any disputes arising from these terms shall be resolved through binding arbitration in accordance 
                  with the laws of India. You waive any right to participate in class action lawsuits or class-wide 
                  arbitration.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">13. Changes to Terms</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of material changes 
                  via email or through the Service. Continued use of the Service after changes constitutes acceptance 
                  of the new terms.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">14. Governing Law</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard 
                  to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg sm:text-xl font-bold mb-4">15. Contact Information</h2>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-2">
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul className="list-none space-y-2 font-body text-xs text-muted-foreground">
                  <li>• Email: legal@deployflow.cloud</li>
                  <li>• Phone: +91 878-960-1387</li>
                  <li>• Address: India</li>
                </ul>
              </section>

              <section className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-primary">Important:</strong> By using DeployFlow, you acknowledge that you 
                  have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
