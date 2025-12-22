import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    countryCode: '+91',
    phoneNumber: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.fullName && formData.email && formData.phoneNumber && formData.message) {
      setStatus('success');
      setFormData({ fullName: '', email: '', companyName: '', countryCode: '+91', phoneNumber: '', service: '', message: '' });
    } else {
      setStatus('error');
    }

    setIsSubmitting(false);

    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const WHATSAPP_NUMBER_E164 = "917636844563";
  const CONTACT_EMAIL = "info@example.com";

  const buildWhatsAppUrl = () => {
    const name = formData.fullName?.trim();
    const email = formData.email?.trim();
    const phone = `${formData.countryCode}${formData.phoneNumber}`.trim();
    const msg = formData.message?.trim();

    const text = [
      "Hi! I want to connect.",
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      formData.phoneNumber ? `Phone: ${phone}` : null,
      formData.service ? `Service: ${formData.service}` : null,
      msg ? `Message: ${msg}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(text)}`;
  };

  const buildMailToUrl = () => {
    const name = formData.fullName?.trim();
    const email = formData.email?.trim();
    const phone = `${formData.countryCode}${formData.phoneNumber}`.trim();
    const msg = formData.message?.trim();

    const subject = `New inquiry${name ? ` from ${name}` : ""}`;
    const body = [
      "Hello,",
      "",
      "I'd like to connect regarding the following:",
      "",
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      formData.phoneNumber ? `Phone: ${phone}` : null,
      formData.companyName ? `Company: ${formData.companyName}` : null,
      formData.service ? `Service: ${formData.service}` : null,
      "",
      msg ? `Message:\n${msg}` : null,
      "",
      "Thanks!",
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-900/50 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 rounded-full text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
            Free Consultation
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4 sm:mb-6 px-4">
            We'd Love to Hear You!
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Side - Contact Information */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8 relative">
              {/* Decorative line - hidden on mobile */}
              <div className="hidden sm:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
              
              {/* Chat with Us */}
              <div className="relative sm:pl-16 bg-white/5 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-0 rounded-xl sm:rounded-none p-4 sm:p-0">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Chat with Us</h3>
                <div className="flex items-start gap-3 text-neutral-300">
                  <div className="bg-yellow-500/20 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-neutral-400 mb-1">Send Us Mail</p>
                    <p className="text-sm sm:text-base text-white font-medium break-all">info@example.com</p>
                  </div>
                </div>
              </div>

              {/* Call Us */}
              <div className="relative sm:pl-16 bg-white/5 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-0 rounded-xl sm:rounded-none p-4 sm:p-0">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Call Us</h3>
                <div className="flex items-start gap-3 text-neutral-300">
                  <div className="bg-red-500/20 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-neutral-400 mb-1">Call 24/7 Hours</p>
                    <p className="text-sm sm:text-base text-white font-medium">+99-763 684 4563</p>
                  </div>
                </div>
              </div>

              {/* Visit Office */}
              <div className="relative sm:pl-16 bg-white/5 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-0 rounded-xl sm:rounded-none p-4 sm:p-0">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Visit Office</h3>
                <div className="flex items-start gap-3 text-neutral-300">
                  <div className="bg-pink-500/20 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base text-white leading-relaxed">1234 Innovation Drive, Suite 500</p>
                    <p className="text-sm sm:text-base text-white leading-relaxed">San Francisco, CA 94107</p>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="order-1 lg:order-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                  placeholder="Your Full Name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                  placeholder="Your Company Name"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2"
                >
                  Phone Number*
                </label>
                <div className="flex gap-2">
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-20 sm:w-24 px-2 sm:px-3 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                  >
                    <option value="+1" className="bg-neutral-900">+1</option>
                    <option value="+44" className="bg-neutral-900">+44</option>
                    <option value="+91" className="bg-neutral-900">+91</option>
                    <option value="+61" className="bg-neutral-900">+61</option>
                    <option value="+81" className="bg-neutral-900">+81</option>
                    <option value="+86" className="bg-neutral-900">+86</option>
                    <option value="+33" className="bg-neutral-900">+33</option>
                    <option value="+49" className="bg-neutral-900">+49</option>
                    <option value="+971" className="bg-neutral-900">+971</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                    placeholder="123 456 7890"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2"
                >
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                >
                  <option value="" className="bg-neutral-900">Select a service</option>
                  <option value="web-development" className="bg-neutral-900">Web Development</option>
                  <option value="app-development" className="bg-neutral-900">App Development</option>
                  <option value="ecommerce" className="bg-neutral-900">E-Commerce Solutions</option>
                  <option value="design" className="bg-neutral-900">Design Services</option>
                  <option value="hosting" className="bg-neutral-900">Domain & Hosting</option>
                  <option value="accounting" className="bg-neutral-900">Accounting Services</option>
                  <option value="legal" className="bg-neutral-900">Legal & Compliance</option>
                  <option value="other" className="bg-neutral-900">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2"
                >
                  Message/Query*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-start sm:items-center gap-2 text-green-600 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start sm:items-center gap-2 text-red-600 bg-red-50 p-3 sm:p-4 rounded-lg">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm">Please fill in all required fields.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Submit
                    <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </>
                )}
              </button>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-black transition-colors"
                >
                  WhatsApp
                </a>

                <a
                  href={buildMailToUrl()}
                  className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg text-white bg-white/10 hover:bg-white/15 border border-white/15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30 focus:ring-offset-black transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
            Get started with Insweave today. Transform your digital presence with India's trusted IT solutions partner.
          </p>
        </div>
      </div>
    </section>
  );
}