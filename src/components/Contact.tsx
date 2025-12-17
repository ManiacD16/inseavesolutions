import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.fullName && formData.email && formData.message) {
      setStatus('success');
      setFormData({ fullName: '', email: '', service: '', message: '' });
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

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-6">
            Get In Touch
          </h2>
          <p className="text-neutral-400 mb-10">
            Get started with Insweave today. Transform your digital presence with
          India's trusted IT solutions partner.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-white mb-2"
              >
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-white mb-2"
              >
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
              >
                <option value="" className='bg-neutral-900'>Select a service</option>
                <option value="web-development" className='bg-neutral-900'>Web Development</option>
                <option value="app-development" className='bg-neutral-900'>App Development</option>
                <option value="ecommerce" className='bg-neutral-900'>E-Commerce Solutions</option>
                <option value="design" className='bg-neutral-900'>Design Services</option>
                <option value="hosting" className='bg-neutral-900'>Domain & Hosting</option>
                <option value="accounting" className='bg-neutral-900'>Accounting Services</option>
                <option value="legal" className='bg-neutral-900'>Legal & Compliance</option>
                <option value="other" className='bg-neutral-900'>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-2"
              >
                Message/Query*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 resize-none"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5" />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>Please fill in all required fields.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
