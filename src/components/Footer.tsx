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
import { Link } from "react-router-dom";

const solutionsLeft = [
  "Managed Services",
  "IT Consulting & Advisory",
  "Cyber Security",
  "Web Development",
];

const solutionsRight = [
  "Mobile Development",
  "Cloud Services",
  "Network Connectivity",
  "ERP Solutions",
];

const companyLeft = [
  "About us",
  "Why us",
  "Team",
  "Careers",
  "Partners & Certifications",
  "Reviews & Awards",
];

const companyRight = ["Blog", "Case studies", "Events", "FAQ"];

// function LogoMark({ className = "" }: { className?: string }) {
//   // Simple diamond mark similar to the screenshot
//   return (
//     <svg
//       className={className}
//       width="34"
//       height="34"
//       viewBox="0 0 48 48"
//       fill="none"
//       aria-hidden="true"
//     >
//       <path
//         d="M24 4 44 24 24 44 4 24 24 4Z"
//         stroke="currentColor"
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M24 14 34 24 24 34 14 24 24 14Z"
//         fill="currentColor"
//         opacity="0.12"
//       />
//     </svg>
//   );
// }

function DotsPattern({ className = "" }: { className?: string }) {
  // Hand-placed circles to resemble the dotted cluster
  const dots = [
    { x: 8, y: 8, r: 2 },
    { x: 18, y: 10, r: 3 },
    { x: 32, y: 8, r: 2 },
    { x: 44, y: 12, r: 2 },

    { x: 10, y: 24, r: 2 },
    { x: 22, y: 24, r: 3 },
    { x: 36, y: 22, r: 4 },
    { x: 48, y: 26, r: 3 },

    { x: 14, y: 40, r: 2 },
    { x: 26, y: 40, r: 4 },
    { x: 42, y: 40, r: 2 },
    { x: 54, y: 42, r: 3 },

    { x: 10, y: 58, r: 2 },
    { x: 22, y: 58, r: 2 },
    { x: 38, y: 58, r: 3 },
    { x: 52, y: 60, r: 2 },

    { x: 16, y: 74, r: 2 },
    { x: 30, y: 74, r: 3 },
    { x: 46, y: 76, r: 2 },
    { x: 58, y: 74, r: 2 },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 64 84"
      fill="none"
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      {/* TOP (DARK) */}
      <div className="bg-black text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            {/* LEFT SIDE: Links + Newsletter */}
            <div className="w-full lg:w-[52%]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Solutions */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Solutions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <ul className="space-y-2 text-sm">
                      {solutionsLeft.map((t) => (
                        <li key={t}>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            {t}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 text-sm">
                      {solutionsRight.map((t) => (
                        <li key={t}>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            {t}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Company</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <ul className="space-y-2 text-sm">
                      {companyLeft.map((t) => (
                        <li key={t}>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            {t}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 text-sm">
                      {companyRight.map((t) => (
                        <li key={t}>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            {t}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-10 max-w-xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Don't miss out updates"
                    className="w-full bg-transparent border border-white/25 rounded-sm px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                <label className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    className="mt-1 h-3.5 w-3.5 rounded border-white/25 bg-transparent"
                  />
                  <span>
                    I agree to the Privacy Policy and give my permission to
                    process my personal data for the purposes specified in the
                    Privacy Policy.
                  </span>
                </label>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-sm transition-colors"
                  >
                    Send <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Brand + dots */}
            <div className="w-full lg:w-[44%] relative">
              <div className="relative overflow-hidden min-h-[260px] lg:min-h-[360px] flex items-center justify-center">
                {/* Dots cluster */}
                <DotsPattern className="absolute top-0 left-1/2 -translate-x-1/2 text-indigo-100/90 w-[420px] h-[320px] lg:w-[520px] lg:h-[420px]" />

                {/* Brand */}
                <div className="relative z-10 text-center pt-10 lg:pt-0">
                  <div className="flex items-center justify-center mb-3 text-white">
                    {/* <LogoMark className="text-white" /> */}
                    <img src="/favicon.svg" />
                  </div>
                  {/* <div className="text-white text-2xl font-semibold">
                    Insweave
                  </div> */}
                  {/* <div className="flex items-center justify-center mb-3 text-white">
                  <img src="/footer.svg" />
</div> */}
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center justify-center bg-blue-700 hover:bg-blue-600 text-white text-sm font-semibold px-8 py-3 rounded-sm transition-colors"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM (WHITE STRIP) */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Clutch */}
            <div className="relative pr-6">
              <div className="absolute right-0 top-0 bottom-0 w-[4px] rounded-full bg-gray-200" />
              <div className="text-[11px] tracking-wide text-gray-500">
                REVIEWED ON
              </div>
              <div className="flex items-end gap-3">
                <div className="text-2xl font-semibold">Clutch</div>
                <div className="pb-1 text-xs text-gray-500">31+ REVIEWS</div>
              </div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="relative pr-6">
              <div className="absolute right-0 w-[4px] h-full rounded-full bg-gray-200" />
              <div className="text-sm text-gray-700">
                <div className="font-medium text-white mb-2">Remotely work</div>
              </div>
            </div>

            {/* Contact */}
            <div className="relative text-white pr-6">
              <div className="absolute right-0  w-[4px] h-full rounded-full bg-gray-200" />
              <div className="text-sm text-white-700">
                <div className="mb-2">
                  <span className="text-white">T:</span> +91-9554349235
                </div>
                <div>
                  <span className="text-white">E:</span>{" "}
                  webnexfusion@gmail.com
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-12 lg:justify-end lg:col-span-2">
              <a
                href="#"
                className="inline-flex flex-col items-center text-xs text-white hover:text-gray-900"
              >
                <Linkedin className="h-8 w-8" />
                <span className="mt-1 font-bold">LinkedIn</span>
              </a>
              <a
                href="#"
                className="inline-flex flex-col items-center text-xs text-white hover:text-gray-900"
              >
                <Github className="h-8 w-8" />
                <span className="mt-1 font-bold">Github</span>
              </a>
              <a
                href="#"
                className="inline-flex flex-col items-center text-xs text-white hover:text-gray-900"
              >
                <Twitter className="h-8 w-8" />
                <span className="mt-1 font-bold">Twitter</span>
              </a>
              <a
                href="#"
                className="inline-flex flex-col items-center text-xs text-white hover:text-gray-900"
              >
                <Facebook className="h-8 w-8" />
                <span className="mt-1 font-bold">Facebook</span>
              </a>
              <a
                href="#"
                className="inline-flex flex-col items-center text-xs text-white hover:text-gray-900"
              >
                <Youtube className="h-8 w-8" />
                <span className="mt-1 font-bold">Youtube</span>
              </a>
            </div>
          </div>

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
                  className="text-slate-400 hover:text-black transition-colors duration-300"
                >
                  Terms of Service
                </Link>

                <span className="text-slate-700">•</span>

                <Link
                  to="/refund-policy"
                  className="text-slate-400 hover:text-black transition-colors duration-300"
                >
                  Refund Policy
                </Link>

                <span className="text-slate-700">•</span>

                <Link
                  to="/privacy-policy"
                  className="text-slate-400 hover:text-black transition-colors duration-300"
                >
                  Privacy Policy
                </Link>

                <span className="text-slate-700">•</span>

                <Link
                  to="/cookie-policy"
                  className="text-slate-400 hover:text-black transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
