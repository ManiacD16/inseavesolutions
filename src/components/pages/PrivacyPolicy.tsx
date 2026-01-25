import React, { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  Mail,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: FileText,
      content: `WebnexFusion ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us. By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.`,
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      icon: Database,
      content: `We collect several types of information from and about users of our services:

**Personal Information:** Information that identifies you as an individual, including your name, email address, phone number, postal address, company name, job title, and payment information.

**Technical Information:** IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our services.

**Usage Information:** Information about how you use our website and services, including your browsing actions and patterns, pages visited, links clicked, and search queries.

**Communication Data:** Records of your correspondence with us, including emails, chat messages, support tickets, and feedback you provide.

**Project Information:** Details about projects you engage us for, including project requirements, specifications, deliverables, and related documentation.`,
    },
    {
      id: "how-we-collect",
      title: "3. How We Collect Information",
      icon: Eye,
      content: `We collect information through various methods:

**Direct Interactions:** You may provide us with your personal information by filling in forms on our website, subscribing to our services, requesting information, submitting project requirements, or corresponding with us by phone, email, or otherwise.

**Automated Technologies:** As you navigate through our website, we may use automatic data collection technologies including cookies, web beacons, and analytics tools to collect certain information about your equipment, browsing actions, and patterns.

**Third Parties:** We may receive information about you from third parties such as analytics providers, advertising networks, payment processors, and professional references you provide during engagement.

**Public Sources:** We may collect information about your company or organization from publicly available sources for business development and service improvement purposes.`,
    },
    {
      id: "use-of-information",
      title: "4. How We Use Your Information",
      icon: UserCheck,
      content: `We use the information we collect about you for various purposes:

**Service Delivery:** To provide, maintain, and improve our services, process transactions, fulfill contracts, and deliver the products and services you request.

**Communication:** To communicate with you about our services, respond to your inquiries, send administrative information, provide customer support, and send you technical notices and security alerts.

**Business Operations:** To manage our business operations, including billing and collection, contract management, and internal record keeping.

**Personalization:** To personalize your experience, understand your preferences, and provide content and features that match your interests.

**Marketing:** To send you promotional communications about our services, special offers, and industry insights, which you can opt out of at any time.

**Analytics and Improvement:** To analyze usage patterns, conduct research and analysis, improve our website and services, and develop new features and offerings.

**Legal Compliance:** To comply with legal obligations, enforce our terms and conditions, protect our rights and property, and prevent fraud and abuse.`,
    },
    {
      id: "information-sharing",
      title: "5. Information Sharing and Disclosure",
      icon: Globe,
      content: `We may share your information in the following circumstances:

**Service Providers:** We may share information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.

**Business Transfers:** In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.

**Legal Requirements:** We may disclose your information if required to do so by law or in response to valid requests by public authorities, court orders, or legal processes.

**Protection of Rights:** We may disclose information to protect and defend our rights, property, or safety, or that of our users or others, including enforcing our agreements and policies.

**Consent:** We may share your information with third parties when you have given us explicit consent to do so.

We do not sell, rent, or trade your personal information to third parties for their marketing purposes without your explicit consent.`,
    },
    {
      id: "data-security",
      title: "6. Data Security",
      icon: Shield,
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

**Encryption:** Use of SSL/TLS encryption for data transmission and encrypted storage for sensitive information.

**Access Controls:** Strict access controls and authentication mechanisms to ensure only authorized personnel can access personal information.

**Security Protocols:** Regular security assessments, vulnerability testing, and implementation of industry-standard security protocols.

**Employee Training:** Training our employees on data protection and security best practices.

**Secure Infrastructure:** Use of secure servers, firewalls, and intrusion detection systems.

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.`,
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      icon: Database,
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria we use to determine retention periods include:

**Active Engagement:** Information is retained while you are an active customer or while we have an ongoing business relationship with you.

**Legal Obligations:** We retain information as required by applicable laws, regulations, tax requirements, or legal proceedings.

**Business Purposes:** Information necessary for legitimate business purposes, such as fraud prevention, contract enforcement, and dispute resolution.

**Project Archives:** Project-related information may be retained for portfolio purposes, future reference, or as specified in our service agreements.

When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention and deletion policies.`,
    },
    {
      id: "your-rights",
      title: "8. Your Rights and Choices",
      icon: UserCheck,
      content: `Depending on your location and applicable laws, you may have certain rights regarding your personal information:

**Access:** You have the right to request access to the personal information we hold about you.

**Correction:** You may request correction of inaccurate or incomplete personal information.

**Deletion:** You may request deletion of your personal information, subject to certain legal exceptions.

**Objection:** You may object to our processing of your personal information for certain purposes.

**Portability:** You may request to receive your personal information in a structured, commonly used format.

**Opt-Out:** You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.

**Cookie Control:** You can set your browser to refuse cookies or alert you when cookies are being sent.

To exercise these rights, please contact us using the information provided in the Contact section below.`,
    },
    {
      id: "cookies",
      title: "9. Cookies and Tracking Technologies",
      icon: Eye,
      content: `We use cookies and similar tracking technologies to collect and track information and improve our services:

**Essential Cookies:** Necessary for the website to function properly, including authentication and security features.

**Analytics Cookies:** Help us understand how visitors interact with our website by collecting and reporting information anonymously.

**Functional Cookies:** Enable enhanced functionality and personalization, such as remembering your preferences.

**Marketing Cookies:** Used to track visitors across websites to display relevant advertisements.

You can control cookie preferences through your browser settings. However, disabling certain cookies may affect the functionality of our website. For more detailed information, please refer to our Cookie Policy.`,
    },
    {
      id: "third-party-links",
      title: "10. Third-Party Websites and Services",
      icon: Globe,
      content: `Our website may contain links to third-party websites, services, or applications that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We strongly advise you to review the privacy policy of every site you visit. This Privacy Policy applies only to information collected by our website and services.`,
    },
    {
      id: "international-transfers",
      title: "11. International Data Transfers",
      icon: Globe,
      content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside India and choose to provide information to us, please note that we transfer the data, including personal information, to India and process it there. By submitting your information, you consent to this transfer. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.`,
    },
    {
      id: "children-privacy",
      title: "12. Children's Privacy",
      icon: Shield,
      content: `Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children under 18 without verification of parental consent, we will take steps to remove that information from our servers.`,
    },
    {
      id: "updates",
      title: "13. Updates to Privacy Policy",
      icon: AlertCircle,
      content: `We may update our Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. For significant changes, we may provide additional notice such as sending an email notification. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after any changes constitutes your acceptance of the updated Privacy Policy.`,
    },
    {
      id: "compliance",
      title: "14. Legal Compliance and Data Protection",
      icon: CheckCircle,
      content: `We are committed to complying with applicable data protection laws and regulations, including:

**Indian Laws:** Information Technology Act, 2000 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.

**International Standards:** Where applicable, we align our practices with international data protection standards such as GDPR principles.

**Industry Standards:** We follow industry best practices for data security and privacy protection.

We regularly review and update our policies and procedures to ensure ongoing compliance with applicable laws and regulations.`,
    },
    {
      id: "contact",
      title: "15. Contact Information",
      icon: Mail,
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

**Email:** webnexfusion@gmail.com
**Phone:** +917067164631
**Address:** Remote Operations, India

We will respond to your inquiry within a reasonable timeframe, typically within 30 days. For data protection matters, please include "Privacy Inquiry" in the subject line of your email to ensure prompt handling of your request.`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      const currentSection = sectionElements.find((element) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileNavOpen(false);
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">
              Privacy & Data Protection
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Privacy Policy</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              WebnexFusion
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>

          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <span>Last Updated:</span>
            <span className="text-white font-semibold">January 10, 2026</span>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="w-full flex items-center justify-between gap-3 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-white"
          >
            <span className="font-semibold">Table of Contents</span>
            {mobileNavOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {mobileNavOpen && (
            <div className="mt-4 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 ${activeSection === section.id
                      ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1">
                    {section.title}
                  </span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-2xl blur"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    Contents
                  </h3>
                  <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 group ${activeSection === section.id
                            ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                      >
                        <section.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-medium flex-1">
                          {section.title.split(". ")[1]}
                        </span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 text-indigo-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Important Notice */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Your Privacy Matters
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      We are committed to protecting your privacy and handling
                      your personal information responsibly. This Privacy Policy
                      describes how we collect, use, and safeguard your data
                      when you use our services. Please read this policy
                      carefully to understand our practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="group relative scroll-mt-24"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>

                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-slate-600">
                    {/* Section Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-white/10">
                        <section.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="pl-16">
                      <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Questions About Privacy?
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    If you have any questions or concerns about our privacy
                    practices or this Privacy Policy, we're here to help.
                    Contact us anytime.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:webnexfusion@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/50"
                    >
                      Contact Us
                    </a>
                    <a
                      href="/terms-of-service"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-white font-semibold transition-all duration-300"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} WebnexFusion. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(71 85 105);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(100 116 139);
        }
      `}</style>
    </section>
  );
};

export default PrivacyPolicy;
