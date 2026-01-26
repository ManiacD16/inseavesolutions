import React, { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Scale,
  Lock,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import SEO from "../SEO";

export const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing and using WebnexFusion's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of our services after any such changes constitutes your acceptance of the new terms.`,
    },
    {
      id: "services",
      title: "2. Services Description",
      icon: FileText,
      content: `WebnexFusion provides comprehensive IT and digital solutions including web development, mobile app development, digital marketing, cloud services, IT consulting, legal compliance services, and related technology services. The specific scope, deliverables, timelines, and pricing for each project will be outlined in a separate Service Agreement or Statement of Work (SOW). All services are subject to availability and may be modified or discontinued at our discretion.`,
    },
    {
      id: "user-obligations",
      title: "3. User Obligations",
      icon: Shield,
      content: `You agree to provide accurate, current, and complete information as required for service delivery. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services.`,
    },
    {
      id: "intellectual-property",
      title: "4. Intellectual Property Rights",
      icon: Lock,
      content: `All content, features, and functionality of our services, including but not limited to software, code, designs, graphics, logos, and documentation, are owned by WebnexFusion or our licensors and are protected by international copyright, trademark, and other intellectual property laws. Upon full payment, clients receive agreed-upon usage rights as specified in the project agreement. Unless explicitly stated otherwise, WebnexFusion retains ownership of all development tools, frameworks, and methodologies used.`,
    },
    {
      id: "payment-terms",
      title: "5. Payment Terms",
      icon: Scale,
      content: `Payment terms are specified in individual project agreements. Generally, we require an advance payment before project commencement, with the balance due upon completion or as per milestone-based payment schedules. All payments must be made in Indian Rupees (INR) or as otherwise agreed. Late payments may incur additional charges. Non-payment may result in suspension of services and legal action. All prices are exclusive of applicable taxes unless stated otherwise.`,
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality",
      icon: Lock,
      content: `Both parties agree to maintain the confidentiality of any proprietary information disclosed during the course of our business relationship. This includes business plans, technical data, customer information, and any other information marked as confidential. We implement appropriate technical and organizational measures to protect your data. However, we may disclose information if required by law or to protect our rights.`,
    },
    {
      id: "warranties",
      title: "7. Warranties and Disclaimers",
      icon: AlertCircle,
      content: `We warrant that services will be performed in a professional and workmanlike manner. However, our services are provided "as is" without any warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that our services will be uninterrupted, error-free, or completely secure. We are not responsible for third-party services, plugins, or integrations used in your project.`,
    },
    {
      id: "limitation-liability",
      title: "8. Limitation of Liability",
      icon: Shield,
      content: `In no event shall WebnexFusion be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or other intangible losses resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim. Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so these limitations may not apply to you.`,
    },
    {
      id: "termination",
      title: "9. Termination",
      icon: AlertCircle,
      content: `Either party may terminate the service agreement with written notice as specified in the project contract. We reserve the right to suspend or terminate services immediately if you breach these terms, fail to make payments, or engage in fraudulent activities. Upon termination, you must pay for all services rendered up to the termination date. Provisions regarding confidentiality, intellectual property, and limitation of liability shall survive termination.`,
    },
    {
      id: "support-maintenance",
      title: "10. Support and Maintenance",
      icon: CheckCircle,
      content: `Post-delivery support and maintenance services are provided as per the agreed terms in your service contract. Standard support includes bug fixes and minor updates for a specified period. Extended support, feature enhancements, and major updates may be subject to additional charges. Response times and support hours will be defined in your service level agreement (SLA). Emergency support may be available at premium rates.`,
    },
    {
      id: "data-privacy",
      title: "11. Data Privacy and Protection",
      icon: Lock,
      content: `We are committed to protecting your privacy and handling your data responsibly. Our data collection, use, and protection practices are outlined in our Privacy Policy, which is incorporated into these terms by reference. We comply with applicable data protection laws and implement industry-standard security measures. You are responsible for obtaining necessary consents for any data you provide to us or collect through services we develop for you.`,
    },
    {
      id: "force-majeure",
      title: "12. Force Majeure",
      icon: AlertCircle,
      content: `Neither party shall be liable for any failure or delay in performance due to circumstances beyond their reasonable control, including but not limited to acts of God, war, terrorism, riots, natural disasters, pandemic, government actions, or failure of telecommunications or internet services. In such events, the affected party will notify the other party and make reasonable efforts to resume performance as soon as possible.`,
    },
    {
      id: "governing-law",
      title: "13. Governing Law and Dispute Resolution",
      icon: Scale,
      content: `These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms or our services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be subject to the exclusive jurisdiction of the courts in [Your City], India. Both parties agree to first attempt to resolve disputes through mediation before pursuing litigation.`,
    },
    {
      id: "modifications",
      title: "14. Modifications to Terms",
      icon: FileText,
      content: `We reserve the right to modify or replace these terms at any time at our sole discretion. Material changes will be notified to you via email or through prominent notice on our website at least 30 days before the changes take effect. Your continued use of our services after such modifications constitutes your acceptance of the updated terms. If you do not agree to the modified terms, you should discontinue use of our services.`,
    },
    {
      id: "general",
      title: "15. General Provisions",
      icon: FileText,
      content: `If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these terms shall otherwise remain in full force and effect. These terms constitute the entire agreement between you and WebnexFusion regarding our services and supersede all prior agreements and understandings. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.`,
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
      <SEO
        title="Terms of Service - WebnexFusion"
        description="Read WebnexFusion's Terms of Service governing the use of our website and services."
        canonicalUrl="https://webnexfusion.com/terms-of-service"
      />
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
            <Scale className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">
              Legal Document
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Terms of Service</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              WebnexFusion
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
            Please read these terms and conditions carefully before using our
            services.
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertCircle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Important Notice
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      These Terms of Service constitute a legally binding
                      agreement between you and WebnexFusion. By using our
                      services, you acknowledge that you have read, understood,
                      and agree to be bound by these terms. If you do not agree
                      with any part of these terms, please do not use our
                      services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
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
                      <p className="text-slate-300 leading-relaxed">
                        {section.content}
                      </p>
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
                    Questions About Our Terms?
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    If you have any questions or concerns about these Terms of
                    Service, please don't hesitate to contact us. We're here to
                    help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:webnexfusion@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/50"
                    >
                      Contact Us
                    </a>
                    <a
                      href="/privacy-policy"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-white font-semibold transition-all duration-300"
                    >
                      Privacy Policy
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

export default TermsOfService;
