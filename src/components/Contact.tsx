import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  MessageSquare,
  Clock,
  Globe,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    countryCode: "+91",
    phoneNumber: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const CONTACT_EMAIL = "webnexfusion@gmail.com";
  const WHATSAPP_NUMBER_E164 = "919554349235";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildMailToUrl = () => {
    const phone = `${formData.countryCode}${formData.phoneNumber}`;
    const subject = `New Inquiry from ${formData.fullName}`;
    const body = `
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${phone}
Company: ${formData.companyName || "N/A"}
Service: ${formData.service || "N/A"}

Message:
${formData.message}
    `;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const buildWhatsAppUrl = () => {
    const phone = `${formData.countryCode}${formData.phoneNumber}`;
    const text = `
Hi WebnexFusion,

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${phone}
Service: ${formData.service || "N/A"}

Message:
${formData.message}
    `;
    return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
      text
    )}`;
  };

  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.message
    ) {
      setStatus("error");
      return;
    }

    window.location.href = buildMailToUrl();
    setStatus("success");

    setFormData({
      fullName: "",
      email: "",
      companyName: "",
      countryCode: "+91",
      phoneNumber: "",
      service: "",
      message: "",
    });

    setTimeout(() => setStatus("idle"), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "webnexfusion@gmail.com",
      gradient: "from-indigo-500 to-violet-500",
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 95543 49235",
      gradient: "from-violet-500 to-purple-500",
      href: "tel:+919554349235",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote, India",
      gradient: "from-purple-500 to-pink-500",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
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

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-300">
              Free Consultation
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="block text-white mb-2">Get in Touch</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 animate-gradient">
              Let's Build Together
            </span>
          </h2>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Have a project in mind? Send us a message and we'll respond quickly.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT INFO */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative block"
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-xl opacity-0 group-hover:opacity-75 blur transition-all duration-300`}
                  ></div>

                  <div className="relative flex items-center gap-3 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 transition-all duration-300 group-hover:border-transparent">
                    <div
                      className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${item.gradient} bg-opacity-10 border border-white/10 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-400 text-xs mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-white font-semibold text-sm truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Features - Compact */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-xl blur"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Why Choose Us
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Clock, text: "24/7 Support" },
                    { icon: MessageSquare, text: "Quick Reply" },
                    { icon: Globe, text: "Global" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-xs text-slate-300 font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM - Compact */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-all duration-500"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="space-y-4">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                </div>

                {/* Row 2: Company */}
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                />

                {/* Row 3: Phone */}
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-20 bg-slate-800/50 border border-slate-700 rounded-lg px-2 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number*"
                    className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                </div>

                {/* Row 4: Service */}
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                >
                  <option value="">Select a service...</option>
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>Digital Marketing</option>
                  <option>Legal & Compliance</option>
                  <option>Other</option>
                </select>

                {/* Row 5: Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message*"
                  rows={3}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                />

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium">
                      Message sent successfully!
                    </span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium">
                      Please fill all required fields.
                    </span>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    className="group/btn w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-indigo-500/50"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </button>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white rounded-lg py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-green-500/30"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            Trusted digital partner for businesses across India
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
