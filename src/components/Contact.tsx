import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
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

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-900/50 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/80 mb-4">
            Free Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Get in Touch With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT INFO */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Mail className="text-yellow-500" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Email Us</p>
                <p className="text-white font-medium">webnexfusion@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Phone className="text-green-500" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Call Us</p>
                <p className="text-white font-medium">+91 95543 49235</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-pink-500/20 p-3 rounded-lg">
                <MapPin className="text-pink-500" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Office</p>
                <p className="text-white font-medium">Remote Work (India)</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="space-y-5">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name*"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />

              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />

              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-24 bg-white/10 border border-white/20 rounded-lg px-2 py-3 text-white"
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
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              >
                <option value="">Select Service</option>
                <option>Web Development</option>
                <option>App Development</option>
                <option>Digital Marketing</option>
                <option>Legal & Compliance</option>
                <option>Other</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message*"
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />

              {status === "success" && (
                <div className="flex gap-2 text-green-500 text-sm">
                  <CheckCircle size={18} /> Message ready to send!
                </div>
              )}

              {status === "error" && (
                <div className="flex gap-2 text-red-500 text-sm">
                  <AlertCircle size={18} /> Fill all required fields.
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-lg py-3 font-medium hover:bg-neutral-200 transition"
              >
                Submit <Send size={18} />
              </button>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                className="block text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-neutral-400 mt-12">
          Get started with WebnexFusion — your trusted digital & IT partner
          across India.
        </p>
      </div>
    </section>
  );
}
