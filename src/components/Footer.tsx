"use client";

import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
  Star,
} from "lucide-react";

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
        />
      ))}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      {/* TOP SECTION */}
      <div className="bg-black text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Links */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Solutions */}
              <div>
                <h3 className="text-white font-semibold mb-4">Solutions</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ul className="space-y-2 text-sm">
                    {solutionsLeft.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-white transition">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 text-sm">
                    {solutionsRight.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-white transition">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ul className="space-y-2 text-sm">
                    {companyLeft.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-white transition">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 text-sm">
                    {companyRight.map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-white transition">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="sm:col-span-2 max-w-xl">
                <h3 className="text-white font-semibold mb-4">
                  Subscribe to Updates
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border border-white/30 px-4 py-3 text-sm rounded-md focus:outline-none focus:border-white"
                  />
                  <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-md transition">
                    Subscribe <ArrowRight size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  We respect your privacy. No spam.
                </p>
              </div>
            </div>

            {/* Brand */}
            <div className="relative flex items-center justify-center min-h-[240px]">
              <DotsPattern className="absolute inset-0 text-indigo-200/20" />
              <div className="relative z-10 text-center">
                <img
                  src="/favicon.svg"
                  alt="WebnexFusion"
                  className="mx-auto mb-4 w-14 h-14"
                />
                <h3 className="text-white text-xl font-semibold mb-4">
                  WebnexFusion
                </h3>
                <button className="bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold px-8 py-3 rounded-md transition">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            {/* Reviews */}
            <div>
              <div className="text-xs text-gray-500 mb-1">REVIEWED ON</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Clutch</span>
                <span className="text-xs text-gray-500">31 Reviews</span>
              </div>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="text-sm">
              <p className="font-medium">India (Remote)</p>
              <p className="text-gray-600">+91 95543 49235</p>
              <p className="text-gray-600">webnexfusion@gmail.com</p>
            </div>

            {/* Social */}
            <div className="flex gap-6 justify-center lg:justify-end lg:col-span-2">
              {[Linkedin, Github, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-black transition">
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <span>
              © {new Date().getFullYear()} WebnexFusion. All rights reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-800">
                Terms
              </a>
              <a href="#" className="hover:text-gray-800">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
