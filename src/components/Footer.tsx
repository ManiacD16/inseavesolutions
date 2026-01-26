import React from "react";
import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  // ArrowRight,
  Star,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  "Managed Services",
  "IT Consulting & Advisory",
  "Cyber Security",
  "Web Development",
  "Mobile Development",
  "Cloud Services",
  "Network Connectivity",
  "ERP Solutions",
];

const company = [
  { name: "About us", href: "/about" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Contact Us", href: "/contact" },
  // { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
  // { name: "Case studies", href: "/case-studies" },
];

function DotsPattern({ className = "" }: { className?: string }) {
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
    <svg className={className} viewBox="0 0 64 84" fill="none" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="currentColor" />
      ))}
    </svg>
  );
}

function FooterLink({
  children,
  href = "",
  target,
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
}) {
  return (
    <Link
      to={href}
      target={target}
      className="text-sm text-slate-400 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white grid place-items-center transition-colors"
    >
      {icon}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-blue-900/50 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Decorative accents (kept subtle to match overall site) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-[90px]" />
        <div className="absolute -bottom-24 right-6 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
        <DotsPattern className="absolute -top-10 left-1/2 -translate-x-1/2 text-indigo-200/10 w-[520px] h-[420px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-10">
          {/* Brand / contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/footer.svg" alt="Insweave" className="h-10" />
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              Digital infrastructure for modern enterprises — hosting, development,
              compliance, and accounting. We weave what your business needs to grow.
            </p>

            {/* Mini review badge */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <div className="text-xs text-slate-300">
                <span className="text-white font-semibold">Clutch</span>
                <span className="text-slate-400"> · 31 reviews</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-indigo-400 text-indigo-400"
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 text-pink-400" />
                <span className="text-slate-400">
                  Currenty Remote work
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-4 w-4 text-red-400" />
                <a className="text-slate-400 hover:text-white" href="#">
                  +91-7067164631
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-4 w-4 text-yellow-400" />
                <a
                  className="text-slate-400 hover:text-white"
                  href="mailto:webnexusion@gmail.com "
                >
                  webnexfusion@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <SocialIcon
                href="https://www.linkedin.com/company/webnex-fusion"
                label="LinkedIn"
                icon={<Linkedin className="h-5 w-5" />}
              />
              <SocialIcon
                href="https://github.com/webnexfusion"
                label="GitHub"
                icon={<Github className="h-5 w-5" />}
              />
              <SocialIcon
                href="https://x.com/webnexfusion"
                label="Twitter"
                icon={<Twitter className="h-5 w-5" />}
              />
              <SocialIcon
                href="https://www.facebook.com/p/webnexfusion-61575536985432/"
                label="Facebook"
                icon={<Facebook className="h-5 w-5" />}
              />
              <SocialIcon
                href="https://www.youtube.com/@webnexfusion"
                label="YouTube"
                icon={<Youtube className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
                  Solutions
                </h3>
                <ul className="space-y-3">
                  {solutions.map((t) => (
                    <li key={t}>
                      <FooterLink>{t}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {company.map((link) => (
                    <li key={link.name}>
                      <FooterLink href={link.href}>
                        {link.name}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <h3 className="text-base font-medium text-white tracking-tight">
                Get product updates
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Monthly insights — no spam.
              </p>

              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 min-w-0 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
                />
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                >
                  Send
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <label className="mt-4 flex items-start gap-2 text-xs text-slate-400">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10"
                />
                <span>
                  I agree to the Privacy Policy and consent to processing of my
                  personal data.
                </span>
              </label>

              <button
                type="button"
                className="mt-6 w-full rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-3 transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-3">
          <div className="flex flex-col md:flex-row items-center justify-center text-xs text-slate-300">
            <div>© {year} Webnexfusion. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}