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
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ===== SAME GLOBAL BACKGROUND ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm mb-4">
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

          <p className="text-slate-300 max-w-2xl mx-auto">
            Have a project in mind? Send us a message and we'll respond quickly.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group block relative"
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-xl opacity-0 group-hover:opacity-70 blur transition`}
                  />
                  <div className="relative flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${item.gradient}`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="text-sm font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Why Choose Us
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[Clock, MessageSquare, Globe].map((Icon, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <p className="text-xs text-slate-300">
                      {["24/7 Support", "Quick Reply", "Global"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl opacity-20 blur-lg" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  className="input"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className="input"
                />
              </div>

              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="input"
              />

              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="input w-20"
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number*"
                  className="input flex-1"
                />
              </div>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Service</option>
                <option>Web Development</option>
                <option>App Development</option>
                <option>Digital Marketing</option>
                <option>Legal & Compliance</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message*"
                rows={3}
                className="input resize-none"
              />

              {status === "success" && (
                <div className="status success">
                  <CheckCircle className="w-4 h-4" /> Message sent successfully
                </div>
              )}

              {status === "error" && (
                <div className="status error">
                  <AlertCircle className="w-4 h-4" /> Fill all required fields
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg py-3 font-semibold hover:scale-[1.02] transition"
              >
                Send Message <Send className="w-4 h-4" />
              </button>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                className="w-full block text-center bg-green-600 text-white rounded-lg py-3 font-semibold hover:bg-green-500 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-400 text-sm">
          Trusted digital partner for businesses across India
        </p>
      </div>

      {/* Reusable styles */}
      <style>{`
        .input {
          background: rgba(30,41,59,0.5);
          border: 1px solid rgba(71,85,105,0.6);
          border-radius: 0.5rem;
          padding: 0.65rem 0.75rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: rgb(99,102,241);
        }
        .status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
        }
        .status.success {
          background: rgba(34,197,94,0.1);
          color: rgb(74,222,128);
          border: 1px solid rgba(34,197,94,0.3);
        }
        .status.error {
          background: rgba(244,63,94,0.1);
          color: rgb(251,113,133);
          border: 1px solid rgba(244,63,94,0.3);
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        @keyframes gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
