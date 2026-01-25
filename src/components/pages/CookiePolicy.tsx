import { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  AlertCircle,
  Cookie,
  Eye,
  Settings,
  Globe,
  Menu,
  X,
  ChevronRight,
  Info,
  Lock,
  Clock,
} from "lucide-react";

export const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Cookie,
      content: `This Cookie Policy explains how WebnexFusion ("we," "us," or "our") uses cookies and similar tracking technologies on our website and services. This policy provides you with clear and comprehensive information about the cookies we use, why we use them, and how you can control them.

By using our website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should change your browser settings accordingly or refrain from using our website.

This Cookie Policy should be read in conjunction with our Privacy Policy and Terms of Service, which provide additional information about how we collect, use, and protect your personal information.`,
    },
    {
      id: "what-are-cookies",
      title: "2. What Are Cookies?",
      icon: Info,
      content: `Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.

**Key Characteristics of Cookies:**

**Storage:** Cookies are stored in your web browser and contain small amounts of data.

**Purpose:** They help websites remember information about your visit, such as your preferred language, login status, and browsing preferences.

**Types:** Cookies can be session cookies (temporary, deleted when you close your browser) or persistent cookies (remain on your device for a set period).

**Origin:** Cookies can be first-party (set by the website you're visiting) or third-party (set by external services on the website).

**Size:** Cookies are typically very small files, usually just a few kilobytes in size.

Cookies enhance your browsing experience by enabling websites to remember your preferences and provide personalized content.`,
    },
    {
      id: "how-we-use-cookies",
      title: "3. How We Use Cookies",
      icon: Eye,
      content: `We use cookies for several important purposes:

**Essential Website Functionality:** To enable core features like user authentication, security, and basic site operations.

**Performance and Analytics:** To understand how visitors interact with our website, which pages are most popular, and how we can improve user experience.

**Personalization:** To remember your preferences, settings, and provide customized content based on your interests.

**Security:** To detect and prevent fraudulent activity, protect user accounts, and maintain website security.

**Communication:** To enable features like live chat support and contact forms.

**Marketing and Advertising:** To deliver relevant advertisements and measure the effectiveness of our marketing campaigns.

**Session Management:** To maintain your logged-in state as you navigate through our website.

We carefully consider the necessity and impact of each cookie we use to ensure we're providing value while respecting your privacy.`,
    },
    {
      id: "types-of-cookies",
      title: "4. Types of Cookies We Use",
      icon: Settings,
      content: `We use different categories of cookies on our website:

**Strictly Necessary Cookies:**
These cookies are essential for our website to function properly. They enable basic functions like page navigation, access to secure areas, and form submission. The website cannot function properly without these cookies, and they are set automatically.

**Performance Cookies:**
These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages. All information collected by these cookies is aggregated and anonymous. We use this data to improve website performance and user experience.

**Functional Cookies:**
These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.

**Targeting/Advertising Cookies:**
These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. They remember that you have visited a website and share this information with advertisers.

**Analytics Cookies:**
These cookies help us understand user behavior, traffic sources, and engagement patterns. We use tools like Google Analytics to collect this information, which helps us improve our website and services.`,
    },
    {
      id: "specific-cookies",
      title: "5. Specific Cookies We Use",
      icon: FileText,
      content: `Below are examples of specific cookies we may use on our website:

**Session ID Cookies:**
• Purpose: Maintain user session and login state
• Duration: Session (deleted when browser closes)
• Type: First-party, Strictly Necessary

**Google Analytics (_ga, _gid, _gat):**
• Purpose: Website traffic analysis and user behavior tracking
• Duration: 2 years (_ga), 24 hours (_gid), 1 minute (_gat)
• Type: Third-party, Analytics

**Cookie Consent (cookie_consent):**
• Purpose: Remember your cookie preferences
• Duration: 1 year
• Type: First-party, Strictly Necessary

**Language Preference (lang):**
• Purpose: Store your preferred language setting
• Duration: 1 year
• Type: First-party, Functional

**Security Tokens (csrf_token):**
• Purpose: Prevent cross-site request forgery attacks
• Duration: Session
• Type: First-party, Strictly Necessary

**Marketing Cookies (various names):**
• Purpose: Track ad performance and user engagement
• Duration: Varies (typically 30-90 days)
• Type: Third-party, Targeting

Please note that the specific cookies used may change as we update our website and integrate new services.`,
    },
    {
      id: "third-party-cookies",
      title: "6. Third-Party Cookies",
      icon: Globe,
      content: `Our website uses cookies from third-party service providers:

**Google Services:**
We use Google Analytics, Google Ads, and other Google services that may set cookies to track user behavior and ad performance. These cookies help us understand our audience and improve our marketing efforts.

**Social Media Platforms:**
If we integrate social media features (such as share buttons from Facebook, Twitter, LinkedIn), these platforms may set their own cookies when you interact with these features.

**Payment Processors:**
When processing payments, third-party payment processors may use cookies to ensure secure transactions and prevent fraud.

**Live Chat Services:**
If we use live chat functionality, the chat service provider may set cookies to maintain conversation history and provide better support.

**Content Delivery Networks (CDN):**
We may use CDNs to deliver website content efficiently, and these services may set cookies for performance optimization.

**Advertising Networks:**
We may work with advertising partners who use cookies to deliver targeted advertisements and measure campaign effectiveness.

We do not control these third-party cookies. We recommend reviewing the privacy policies of these third-party services to understand their cookie practices.`,
    },
    {
      id: "cookie-duration",
      title: "7. Cookie Duration and Persistence",
      icon: Clock,
      content: `Cookies have different lifespans depending on their purpose:

**Session Cookies:**
These are temporary cookies that expire when you close your browser. They are used for essential functions like maintaining your login state during a single browsing session.

**Persistent Cookies:**
These cookies remain on your device for a specified period or until you manually delete them. Common durations include:

• 24 hours - Short-term tracking and analytics
• 30 days - Monthly tracking and campaign measurement
• 1 year - User preferences and settings
• 2 years - Long-term analytics and behavior tracking

**Cookie Expiry:**
Each cookie has an expiration date. Once this date is reached, the cookie is automatically deleted by your browser. You can manually delete cookies at any time through your browser settings.

**Cookie Updates:**
When you revisit our website, some cookies may be refreshed, extending their expiration date. This ensures your preferences remain active for regular users.

We regularly review and update cookie durations to ensure they're appropriate for their intended purpose while respecting user privacy.`,
    },
    {
      id: "managing-cookies",
      title: "8. How to Manage and Control Cookies",
      icon: Settings,
      content: `You have several options to manage cookies:

**Browser Settings:**
Most web browsers allow you to control cookies through their settings. You can:
• Block all cookies
• Block third-party cookies only
• Delete cookies when you close your browser
• Accept cookies from specific websites only
• Receive alerts when cookies are set

**Browser-Specific Instructions:**

**Google Chrome:**
Settings > Privacy and Security > Cookies and other site data

**Mozilla Firefox:**
Settings > Privacy & Security > Cookies and Site Data

**Safari:**
Preferences > Privacy > Cookies and website data

**Microsoft Edge:**
Settings > Cookies and site permissions > Manage and delete cookies

**Cookie Preference Center:**
We may provide a cookie preference center on our website where you can customize your cookie settings directly.

**Opt-Out Tools:**
You can use opt-out tools provided by advertising networks:
• Google Ads Settings: https://adssettings.google.com
• NAI Opt-Out: http://www.networkadvertising.org/choices
• DAA Opt-Out: http://www.aboutads.info/choices

**Important Note:** Blocking all cookies may affect website functionality and prevent you from using certain features.`,
    },
    {
      id: "impact-of-disabling",
      title: "9. Impact of Disabling Cookies",
      icon: AlertCircle,
      content: `Disabling cookies may affect your experience on our website:

**Potential Impacts:**

**Reduced Functionality:**
Some features may not work properly, such as shopping carts, forms, or user account features.

**No Personalization:**
The website will not remember your preferences, language settings, or customizations.

**Repeated Login:**
You may need to log in repeatedly as the website won't remember your authentication state.

**Limited Analytics:**
We won't be able to improve our website based on user behavior data.

**Generic Experience:**
You'll receive a generic, non-personalized browsing experience.

**Form Re-entry:**
Information you enter in forms may not be saved if you navigate away from the page.

**Session Issues:**
Some multi-step processes may not work correctly without session cookies.

While we respect your right to disable cookies, we recommend enabling at least essential cookies to ensure basic website functionality. You can selectively enable cookies based on your comfort level and needs.`,
    },
    {
      id: "mobile-devices",
      title: "10. Cookies on Mobile Devices",
      icon: Globe,
      content: `Cookies work differently on mobile devices:

**Mobile Browsers:**
Mobile browsers (Safari, Chrome, Firefox) support cookies similarly to desktop browsers. You can manage cookies through your mobile browser settings.

**Mobile Apps:**
If you use our mobile application, we may use similar technologies to cookies, such as:
• Device identifiers
• Local storage
• SDK-based tracking
• Mobile analytics tools

**Mobile Cookie Management:**

**iOS Devices (Safari):**
Settings > Safari > Block All Cookies or Advanced > Website Data

**Android Devices (Chrome):**
Settings > Site settings > Cookies

**Cross-Device Tracking:**
We may use cookies and device identifiers to recognize you across different devices (desktop, mobile, tablet) to provide a seamless experience.

**App Permissions:**
Our mobile apps may request permissions for analytics and advertising purposes. You can control these through your device settings.

**Mobile Privacy:**
Mobile devices offer additional privacy controls through operating system settings, such as limiting ad tracking on iOS or resetting advertising IDs on Android.`,
    },
    {
      id: "data-security",
      title: "11. Cookie Data Security",
      icon: Lock,
      content: `We take the security of cookie data seriously:

**Security Measures:**

**Encryption:**
Sensitive cookie data is encrypted to prevent unauthorized access.

**Secure Transmission:**
Cookies are transmitted over HTTPS connections to prevent interception.

**HttpOnly Flag:**
Critical cookies are marked as HttpOnly to prevent access by client-side scripts, reducing XSS attack risks.

**Secure Flag:**
Cookies containing sensitive information are marked as Secure, ensuring they're only transmitted over encrypted connections.

**Cookie Integrity:**
We implement measures to detect and prevent cookie tampering or manipulation.

**Access Controls:**
Only authorized personnel and systems can access cookie-related data.

**Regular Audits:**
We regularly review our cookie usage and security practices to ensure compliance with best practices.

**Data Minimization:**
We only store necessary information in cookies and avoid storing sensitive personal data.

While we implement robust security measures, no method of data transmission or storage is 100% secure. We continuously work to improve our security practices.`,
    },
    {
      id: "childrens-privacy",
      title: "12. Children's Privacy and Cookies",
      icon: Shield,
      content: `We are committed to protecting children's privacy:

**Age Restrictions:**
Our website and services are not directed to children under the age of 18. We do not knowingly collect information from children through cookies or any other means.

**Parental Awareness:**
If you are a parent or guardian and believe your child has provided us with information through cookies, please contact us immediately.

**Cookie Deletion:**
If we discover that we have inadvertently collected information from a child through cookies, we will take steps to delete that information promptly.

**COPPA Compliance:**
We comply with the Children's Online Privacy Protection Act (COPPA) and similar regulations in other jurisdictions.

**Third-Party Services:**
We do not allow third-party advertising networks to collect information from children through cookies on our website.

**Educational Content:**
If we provide educational content that may be accessed by children, we ensure that only strictly necessary cookies are used for that content.

**Parental Controls:**
We encourage parents to use parental control tools available in browsers and devices to monitor their children's online activities.`,
    },
    {
      id: "international-transfers",
      title: "13. International Data Transfers",
      icon: Globe,
      content: `Cookie data may be transferred internationally:

**Global Services:**
Some of our cookie-related services (such as analytics and advertising platforms) operate globally and may transfer data across borders.

**Data Transfer Safeguards:**
When cookie data is transferred internationally, we ensure appropriate safeguards are in place:
• Standard contractual clauses
• Privacy Shield frameworks (where applicable)
• Adequacy decisions by relevant authorities
• Consent mechanisms

**Third-Party Transfers:**
Third-party services we use (like Google Analytics) may transfer cookie data to servers in different countries. These transfers are governed by their privacy policies and applicable data protection laws.

**Your Rights:**
Regardless of where your cookie data is processed, you retain your rights to access, control, and delete this information as outlined in this policy.

**Compliance:**
We ensure that international data transfers comply with applicable laws, including GDPR, Indian IT Act, and other relevant regulations.

**Data Localization:**
Where required by law, we store certain cookie data locally within specific jurisdictions.`,
    },
    {
      id: "updates-to-policy",
      title: "14. Updates to Cookie Policy",
      icon: FileText,
      content: `This Cookie Policy may be updated from time to time:

**Reasons for Updates:**
• Changes in our cookie usage practices
• New features or services that use cookies
• Legal or regulatory requirements
• Improvements in cookie technology
• User feedback and privacy enhancements

**Notification of Changes:**
We will notify you of material changes to this Cookie Policy by:
• Posting the updated policy on our website
• Updating the "Last Updated" date at the top of this policy
• Sending email notifications for significant changes (if we have your email)
• Displaying a notice on our website

**Review Period:**
We recommend reviewing this Cookie Policy periodically to stay informed about our cookie practices.

**Continued Use:**
Your continued use of our website after changes to this Cookie Policy constitutes your acceptance of the updated policy.

**Previous Versions:**
Upon request, we can provide previous versions of this Cookie Policy for your reference.

**Effective Date:**
All changes to this policy become effective immediately upon posting unless otherwise specified.`,
    },
    {
      id: "contact-information",
      title: "15. Contact Us About Cookies",
      icon: FileText,
      content: `If you have questions or concerns about our cookie practices:

**General Inquiries:**
For general questions about cookies, how we use them, or this Cookie Policy, please contact us at:

Email: webnexfusion@gmail.com
Phone: +917067164631
Subject Line: "Cookie Policy Inquiry"

**Cookie Preferences:**
If you want to change your cookie preferences or request deletion of specific cookies, please include:
• Your name and contact information
• Specific cookies you're inquiring about
• Your preferred cookie settings

**Data Rights:**
To exercise your rights regarding cookie data (access, deletion, objection), please submit a written request with:
• Verification of your identity
• Specific rights you wish to exercise
• Details of the information you're requesting

**Response Time:**
We will respond to your inquiry within 30 days of receipt.

**Complaints:**
If you're not satisfied with our cookie practices, you have the right to lodge a complaint with your local data protection authority.

**Business Hours:**
Our support team is available Monday to Saturday, 9:00 AM to 6:00 PM IST.

We value your privacy and are committed to addressing your concerns promptly and professionally.`,
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
            <Cookie className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">
              Cookie Information
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Cookie Policy</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400">
              WebnexFusion
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
            Learn how we use cookies to improve your experience and protect your
            privacy.
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
                      ? "bg-amber-500/20 border border-amber-500/30 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1">
                    {section.title}
                  </span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 text-amber-400" />
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Contents
                  </h3>
                  <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 group ${activeSection === section.id
                            ? "bg-amber-500/20 border border-amber-500/30 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                      >
                        <section.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-medium flex-1">
                          {section.title.split(". ")[1]}
                        </span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 text-amber-400" />
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
                    <Cookie className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      About Cookies
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      We use cookies to enhance your browsing experience,
                      analyze site traffic, and personalize content. By
                      continuing to use our website, you consent to our use of
                      cookies. You can manage your cookie preferences through
                      your browser settings at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="group relative scroll-mt-24"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>

                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-slate-600">
                    {/* Section Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-white/10">
                        <section.icon className="w-5 h-5 text-amber-400" />
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
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-20 blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Questions About Cookies?
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    If you have questions about our cookie practices or need
                    help managing your preferences, we're here to assist you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:webnexfusion@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/50"
                    >
                      Contact Us
                    </a>
                    <a
                      href="/privacy-policy"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 text-white font-semibold transition-all duration-300"
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

export default CookiePolicy;
