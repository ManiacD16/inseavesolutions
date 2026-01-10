"use client";

import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
  Star,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

const solutionsLeft = [
  "Managed Services",
  "IT Consulting",
  "Cyber Security",
  "Web Development",
];

const solutionsRight = [
  "Mobile Development",
  "Cloud Services",
  "Network Solutions",
  "ERP Systems",
];

const companyLeft = [
  "About Us",
  "Why Choose Us",
  "Our Team",
  "Careers",
  "Certifications",
  "Client Reviews",
];

const companyRight = ["Blog", "Case Studies", "FAQs", "Contact"];

function DotsPattern({ className = "" }: { className?: string }) {
  const dots = Array.from({ length: 30 });
  return (
    <svg className={className} viewBox="0 0 200 120" fill="currentColor">
      {dots.map((_, i) => (
        <circle
          key={i}
          cx={(i % 10) * 20 + 10}
          cy={Math.floor(i / 10) * 20 + 10}
          r={i % 3 === 0 ? 4 : 2}
          opacity={0.6}
        />
      ))}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

      {/* Grid Pattern Overlay */}
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

      {/* TOP SECTION */}
      <div className="relative text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Links Section */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
              {/* Solutions */}
              <div>
                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full"></div>
                  Solutions
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    {solutionsLeft.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300"
                        >
                          <span className="w-0 h-px bg-indigo-500 group-hover:w-3 transition-all duration-300"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {solutionsRight.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300"
                        >
                          <span className="w-0 h-px bg-violet-500 group-hover:w-3 transition-all duration-300"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  Company
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    {companyLeft.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300"
                        >
                          <span className="w-0 h-px bg-violet-500 group-hover:w-3 transition-all duration-300"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {companyRight.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300"
                        >
                          <span className="w-0 h-px bg-purple-500 group-hover:w-3 transition-all duration-300"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="sm:col-span-2 max-w-xl">
                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Subscribe to Updates
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  Get the latest insights, updates, and exclusive offers
                  delivered to your inbox.
                </p>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-75 blur transition-all duration-300"></div>
                  <div className="relative flex flex-col sm:flex-row gap-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-2">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <button className="group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/50">
                      Subscribe
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Brand CTA Section */}
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl opacity-75 blur-xl group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 min-h-[320px] flex flex-col items-center justify-center text-center">
                  <DotsPattern className="absolute inset-0 text-indigo-400/10" />

                  <div className="relative z-10 space-y-6">
                    {/* Logo/Icon */}
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/50">
                      <img
                        src="/favicon.svg"
                        alt="WebnexFusion"
                        className="w-10 h-10"
                      />
                    </div>

                    <div>
                      <h3 className="text-white text-2xl font-bold mb-2">
                        WebnexFusion
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Transforming Ideas into Digital Reality
                      </p>
                    </div>

                    <button className="group/cta inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/50">
                      Schedule Consultation
                      <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
            {/* Reviews */}
            <div className="group">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 mb-3">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                REVIEWED ON
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-white text-lg">Clutch</span>
                <span className="text-sm text-slate-400">31 Reviews</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform duration-300"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Rated 5.0/5.0 by our clients
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Get in Touch
              </h4>

              <div className="space-y-3">
                <a
                  href="tel:+919554349235"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <div className="font-medium text-slate-300">
                      India (Remote)
                    </div>
                    <div>+91 95543 49235</div>
                  </div>
                </a>

                <a
                  href="mailto:webnexfusion@gmail.com"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>webnexfusion@gmail.com</div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:text-right">
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3 justify-start lg:justify-end flex-wrap">
                {[
                  {
                    Icon: Linkedin,
                    color: "from-blue-600 to-blue-400",
                    href: "#",
                  },
                  {
                    Icon: Github,
                    color: "from-slate-600 to-slate-400",
                    href: "#",
                  },
                  {
                    Icon: Twitter,
                    color: "from-sky-600 to-sky-400",
                    href: "#",
                  },
                  {
                    Icon: Facebook,
                    color: "from-blue-700 to-blue-500",
                    href: "#",
                  },
                  {
                    Icon: Youtube,
                    color: "from-red-600 to-red-400",
                    href: "#",
                  },
                ].map(({ Icon, color, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="group relative w-11 h-11 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <Icon className="relative w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>© {new Date().getFullYear()}</span>
                <span className="text-white font-semibold">WebnexFusion</span>
                <span>• All rights reserved.</span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <Link
                  to="/terms-of-service"
                  className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Terms of Service</span>
                </Link>

                <span className="text-slate-700">•</span>

                <Link
                  to="/refund-policy"
                  className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Refund Policy</span>
                </Link>

                <span className="text-slate-700">•</span>

                <Link
                  to="/privacy-policy"
                  className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Privacy Policy</span>
                </Link>

                <span className="text-slate-700">•</span>

                <Link
                  to="/cookie-policy"
                  className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Cookie Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"></div>
    </footer>
  );
}
