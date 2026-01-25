import React, { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  Clock,
  Award,
  Menu,
  X,
  ChevronRight,
  Info,
} from "lucide-react";

export const RefundPolicy = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      title: "1. Policy Overview",
      icon: FileText,
      content: `WebnexFusion (operating under Tripathi Enterprise) maintains a strict no-refund policy for all services provided. This policy is established to protect both our business interests and ensure fair treatment of all clients. By engaging our services, you acknowledge and agree to this policy in its entirety.

This no-refund policy applies to all our services including but not limited to web development, mobile app development, digital marketing, IT consulting, legal compliance services, cloud services, and any other technology solutions we provide.

We believe in transparency and want our clients to make informed decisions. This policy document explains the rationale behind our no-refund stance and outlines the safeguards we have in place to ensure client satisfaction despite this policy.`,
    },
    {
      id: "no-refund-statement",
      title: "2. No Refund Declaration",
      icon: XCircle,
      content: `IMPORTANT: Tripathi Enterprise (trading as WebnexFusion) does not make any claims, promises, or warranties regarding refunds of payments made for our services.

All payments made to WebnexFusion are FINAL and NON-REFUNDABLE under any circumstances, including but not limited to:
• Change in client requirements or business direction
• Client's inability to provide necessary resources or information
• Delays caused by the client
• Client dissatisfaction with completed work that meets agreed specifications
• Client's financial difficulties or budget constraints
• Force majeure events or circumstances beyond our control
• Project cancellation initiated by the client
• Termination of services for any reason

Once payment is received, it is considered accepted payment for services rendered or to be rendered, and no refund requests will be entertained.`,
    },
    {
      id: "rationale",
      title: "3. Rationale Behind No-Refund Policy",
      icon: Info,
      content: `Our no-refund policy exists for several valid business and operational reasons:

**Resource Allocation:** Once a project begins, we allocate dedicated resources, tools, and personnel. These commitments cannot be reversed even if a client withdraws.

**Intellectual Property:** Digital services involve creation of intellectual property and custom solutions. Once created and delivered, this work has value that cannot be "returned."

**Opportunity Cost:** Taking on a project means declining other potential clients. If a project is cancelled, we lose the opportunity to serve other clients during that time.

**Industry Standard:** No-refund policies are standard practice in the IT services and digital solutions industry, particularly for custom development work.

**Time Investment:** Significant time is invested in understanding requirements, planning, research, and initial development before major deliverables are created.

**Protection Against Abuse:** This policy protects us from clients who might attempt to receive free work by requesting refunds after receiving deliverables.`,
    },
    {
      id: "payment-structure",
      title: "4. Payment Structure and Milestones",
      icon: DollarSign,
      content: `To ensure transparency and mutual trust, we structure our payments as follows:

**Advance Payment:** We require an advance payment (typically 30-50% of project cost) before project commencement. This advance is non-refundable and covers initial planning, resource allocation, and setup costs.

**Milestone-Based Payments:** For larger projects, we implement milestone-based payment schedules:
• Payment upon project initiation
• Payment upon completion of design/planning phase
• Payment upon development milestone completion
• Final payment upon project delivery

**Upfront Payment for Small Projects:** For smaller projects or services, we may require 100% upfront payment before work begins.

**Payment Terms:** All payments are due as per the agreed schedule. Late payments may result in project suspension or additional charges.

All these payments, once made, are non-refundable regardless of project status or outcome.`,
    },
    {
      id: "quality-assurance",
      title: "5. Quality Assurance and Client Satisfaction",
      icon: Award,
      content: `While we maintain a strict no-refund policy, we are deeply committed to client satisfaction through:

**Detailed Requirements Analysis:** We invest significant time upfront to understand your exact requirements, reducing the risk of misalignment.

**Regular Updates and Reviews:** We provide regular project updates and seek client feedback at each milestone to ensure alignment.

**Revision Rounds:** Our service agreements include specified revision rounds to refine deliverables based on your feedback.

**Quality Standards:** We adhere to industry best practices and quality standards in all our deliverables.

**Transparent Communication:** We maintain open communication channels throughout the project lifecycle.

**Professional Delivery:** We ensure all deliverables meet the specifications agreed upon in the project contract.

Our goal is to deliver value that exceeds your investment, making refunds unnecessary.`,
    },
    {
      id: "client-responsibilities",
      title: "6. Client Responsibilities",
      icon: CheckCircle,
      content: `To ensure successful project completion and avoid dissatisfaction, clients are responsible for:

**Timely Information:** Providing complete, accurate, and timely information, assets, and access required for project execution.

**Clear Requirements:** Clearly communicating requirements, expectations, and objectives at the project outset.

**Prompt Feedback:** Reviewing deliverables and providing feedback within agreed timeframes.

**Decision Making:** Making timely decisions on design choices, feature selections, and approvals.

**Payment Obligations:** Making payments according to the agreed schedule.

**Reasonable Expectations:** Maintaining realistic expectations aligned with the project scope and budget.

**Contract Adherence:** Adhering to all terms and conditions outlined in the service agreement.

Failure to meet these responsibilities may result in project delays or outcomes that don't meet expectations, but will not qualify for any refund.`,
    },
    {
      id: "scope-changes",
      title: "7. Scope Changes and Additional Costs",
      icon: AlertCircle,
      content: `Changes to project scope after initiation are handled as follows:

**Change Requests:** Any changes to the original scope require written approval and may incur additional charges.

**Scope Creep Protection:** We document all agreed features and functionalities to prevent scope creep.

**Additional Features:** Requests for features beyond the original scope will be quoted separately.

**Timeline Impact:** Scope changes may affect project timelines, and extended timelines do not qualify for refunds.

**Payment for Changes:** Additional scope requires additional payment, which is also non-refundable.

**Documentation:** All scope changes are documented in writing with client acknowledgment.

Payments for original scope and any scope changes are non-refundable, regardless of whether the changes are completed.`,
    },
    {
      id: "project-cancellation",
      title: "8. Project Cancellation Policy",
      icon: XCircle,
      content: `In the event of project cancellation:

**Client-Initiated Cancellation:** If you cancel the project at any stage, all payments made up to that point are non-refundable.

**Work Completed:** You will receive all work completed up to the cancellation point, but no refund will be provided.

**Resource Costs:** Cancellation does not negate costs already incurred for resources, tools, licenses, or team allocation.

**Partial Delivery:** We may provide partial deliverables for work completed, at our discretion.

**Company-Initiated Cancellation:** In the rare event we cancel a project (due to client breach of contract, non-payment, or other valid reasons), payments made remain non-refundable, though we may provide completed work.

**Mutual Agreement:** Cancellations by mutual agreement are subject to the same no-refund policy.

No refunds will be issued under any cancellation scenario.`,
    },
    {
      id: "disputes",
      title: "9. Dispute Resolution",
      icon: Shield,
      content: `In case of disagreements or disputes:

**Initial Discussion:** We encourage open communication to resolve any concerns before they escalate.

**Documented Communication:** All disputes should be communicated in writing for proper documentation.

**Good Faith Resolution:** We commit to working in good faith to address legitimate concerns about deliverables.

**Specification Review:** Disputes will be resolved by comparing deliverables against agreed specifications in the contract.

**Mediation:** If direct negotiation fails, we may agree to third-party mediation.

**No Refund Provision:** Regardless of dispute outcome, our no-refund policy remains in effect.

**Legal Jurisdiction:** All disputes are subject to the jurisdiction of courts in India as specified in our Terms of Service.

Resolution of disputes does not include refund as a remedy.`,
    },
    {
      id: "service-guarantee",
      title: "10. Service Delivery Guarantee",
      icon: Award,
      content: `Instead of refunds, we offer these guarantees:

**Specification Compliance:** We guarantee that deliverables will meet the specifications agreed upon in the project contract.

**Functional Quality:** We ensure that all developed solutions are functional and meet stated requirements.

**Bug Fixes:** We provide a warranty period (as specified in the contract) for fixing bugs and issues in delivered work.

**Support Period:** We offer post-delivery support as outlined in the service agreement.

**Revision Rights:** You receive the agreed number of revision rounds to refine deliverables.

**Professional Standards:** We guarantee professional-quality work adhering to industry standards.

**Timely Delivery:** We commit to delivering projects within agreed timelines, subject to client cooperation.

These guarantees ensure value for your investment without compromising our no-refund policy.`,
    },
    {
      id: "exceptional-circumstances",
      title: "11. Exceptional Circumstances",
      icon: AlertCircle,
      content: `While our no-refund policy is firm, we acknowledge exceptional situations:

**Non-Performance by WebnexFusion:** If we completely fail to perform any services or deliver any work despite receiving payment, we may consider alternative remedies on a case-by-case basis.

**Evaluation Process:** Any exceptional case will be evaluated by our management team.

**Alternative Solutions:** In rare cases, we may offer alternative solutions such as:
• Credit toward future services
• Extension of service period
• Additional deliverables of equivalent value

**No Automatic Refunds:** Even in exceptional circumstances, refunds are not automatic or guaranteed.

**Written Request:** Any claims for exceptional circumstances must be submitted in writing with supporting documentation.

**Final Decision:** Our decision on exceptional circumstances is final and binding.

These provisions do not create any obligation or entitlement to refunds.`,
    },
    {
      id: "third-party-services",
      title: "12. Third-Party Services and Purchases",
      icon: DollarSign,
      content: `Regarding third-party services and purchases:

**Domain Names:** Domain name registrations, renewals, and transfers are non-refundable as they are subject to third-party registrar policies.

**Hosting Services:** Web hosting, cloud services, and server costs are non-refundable once provisioned.

**Software Licenses:** Third-party software licenses, plugins, themes, and tools purchased for your project are non-refundable.

**Subscription Services:** Any subscription-based services purchased on your behalf are subject to their respective refund policies.

**Pass-Through Costs:** We are not responsible for refunds on any third-party purchases made for your project.

**Client Ownership:** Once purchased, licenses and services are transferred to client ownership (where applicable), making refunds impractical.

All third-party costs are final and non-refundable under any circumstances.`,
    },
    {
      id: "informed-consent",
      title: "13. Informed Consent and Acknowledgment",
      icon: CheckCircle,
      content: `By engaging our services, you confirm that:

**Policy Awareness:** You have read, understood, and agree to this Refund Policy in its entirety.

**No Refund Acceptance:** You acknowledge and accept that Tripathi Enterprise (WebnexFusion) does not provide refunds under any circumstances.

**Voluntary Agreement:** You are entering into this agreement voluntarily with full knowledge of the no-refund policy.

**Contract Terms:** You understand that this policy is an integral part of the service contract.

**Legal Understanding:** You have had the opportunity to seek legal advice regarding this policy if desired.

**Binding Agreement:** You accept that this policy is legally binding and enforceable.

**No Verbal Promises:** You understand that no verbal promises or assurances override this written policy.

Your acceptance is recorded through contract signing and payment processing.`,
    },
    {
      id: "alternatives",
      title: "14. Alternatives to Refunds",
      icon: Info,
      content: `Instead of refunds, we offer these alternatives for client satisfaction:

**Service Credits:** In specific cases of service failures, we may offer credits toward future services.

**Continued Support:** Extended support periods to address concerns and ensure project success.

**Additional Revisions:** Beyond contracted revisions, we may offer additional refinement rounds.

**Performance Improvements:** If initial deliverables are unsatisfactory, we work to improve them to meet standards.

**Scope Adjustments:** Reallocating remaining budget to different project aspects if original scope is no longer desired.

**Partnership Approach:** Working collaboratively to find mutually beneficial solutions to concerns.

**Documentation and Training:** Providing additional documentation or training to maximize value from deliverables.

These alternatives ensure you receive value from your investment while maintaining our no-refund policy.`,
    },
    {
      id: "contact",
      title: "15. Questions and Clarifications",
      icon: FileText,
      content: `If you have questions about our Refund Policy:

**Pre-Engagement Clarification:** We strongly encourage discussing any concerns about this policy before engaging our services.

**Written Inquiries:** Send detailed questions via email to webnexfusion@gmail.com with subject line "Refund Policy Inquiry."

**Contract Review:** Review your service contract carefully as it contains specific terms related to your project.

**No Verbal Modifications:** This policy cannot be modified verbally; any changes must be in writing and signed by authorized representatives.

**Policy Updates:** We may update this policy; the latest version is always available on our website.

**Final Authority:** This Refund Policy, along with our Terms of Service, constitutes the complete understanding regarding refunds.

**Contact Information:**
Email: webnexfusion@gmail.com
Phone: +917067164631

Understanding this policy before engagement helps avoid future misunderstandings.`,
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-500/20 backdrop-blur-sm mb-6">
            <DollarSign className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">
              Payment Policy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Refund Policy</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400">
              WebnexFusion
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
            Please read this policy carefully before engaging our services. All
            payments are final and non-refundable.
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
                      ? "bg-rose-500/20 border border-rose-500/30 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1">
                    {section.title}
                  </span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 text-rose-400" />
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-2xl blur"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-400" />
                    Contents
                  </h3>
                  <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 group ${activeSection === section.id
                            ? "bg-rose-500/20 border border-rose-500/30 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                      >
                        <section.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-medium flex-1">
                          {section.title.split(". ")[1]}
                        </span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 text-rose-400" />
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
            {/* Critical Notice */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl opacity-30 blur"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <AlertCircle className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      CRITICAL: No Refund Policy
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-3">
                      <strong className="text-rose-400">
                        Tripathi Enterprise (WebnexFusion) does NOT make any
                        claims or promises regarding refunds.
                      </strong>{" "}
                      All payments made for our services are FINAL and
                      NON-REFUNDABLE under any circumstances.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      By engaging our services, you acknowledge that you have
                      read and understood this policy and agree to proceed with
                      full knowledge that no refunds will be provided for any
                      reason.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="group relative scroll-mt-24"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>

                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-slate-600">
                    {/* Section Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-white/10">
                        <section.icon className="w-5 h-5 text-rose-400" />
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

            {/* Final Warning */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Shield className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Final Acknowledgment
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      By proceeding with payment and engaging our services, you
                      confirm that you have read this entire Refund Policy,
                      understand that{" "}
                      <strong>
                        Tripathi Enterprise does not provide refunds under any
                        circumstances
                      </strong>
                      , and voluntarily agree to these terms. This is a legally
                      binding agreement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-2xl opacity-20 blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Questions About This Policy?
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    If you have any questions about our Refund Policy, please
                    contact us BEFORE making any payment or engaging our
                    services.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:webnexfusion@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-rose-500/50"
                    >
                      Contact Us
                    </a>
                    <a
                      href="/terms-of-service"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500/50 text-white font-semibold transition-all duration-300"
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
                © {new Date().getFullYear()} WebnexFusion (Tripathi Enterprise).
                All rights reserved.
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

export default RefundPolicy;
