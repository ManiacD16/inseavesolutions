import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, User, ArrowUpRight } from "lucide-react";
import SolutionMegaMenu from "./Header/SolutionMegaMenu";
import CompanyMegaMenu from "./Header/CompanyMegaMenu";
import { createPortal } from "react-dom";



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
const [companyOpen, setCompanyOpen] = useState(false);

  // desktop hover mega
  const [solutionOpen, setSolutionOpen] = useState(false);
const closeTimers = useRef<{ company?: number; solution?: number }>({});

const openCompanyMenu = () => {
  if (closeTimers.current.company) window.clearTimeout(closeTimers.current.company);
  setCompanyOpen(true);
  setSolutionOpen(false);
};

const closeCompanyMenuSoon = () => {
  if (closeTimers.current.company) window.clearTimeout(closeTimers.current.company);
  closeTimers.current.company = window.setTimeout(() => setCompanyOpen(false), 140);
};

const openSolutionMenu = () => {
  if (closeTimers.current.solution) window.clearTimeout(closeTimers.current.solution);
  setSolutionOpen(true);
  setCompanyOpen(false);
};

const closeSolutionMenuSoon = () => {
  if (closeTimers.current.solution) window.clearTimeout(closeTimers.current.solution);
  closeTimers.current.solution = window.setTimeout(() => setSolutionOpen(false), 140);
};

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setOpenDropdown(null);
      setSolutionOpen(false);
    }
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/header.svg" alt="Logo" className="h-8" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            Home
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-white transition-colors"
          >
            Features
          </button>
<div
  className="relative"
  onMouseEnter={openCompanyMenu}
  onMouseLeave={closeCompanyMenuSoon}
>
  <button
    onClick={() => scrollToSection("company")}
    onFocus={openCompanyMenu}
    className="flex items-center gap-1 hover:text-white transition-colors"
  >
    Company
    <ChevronDown className="h-4 w-4" />
  </button>
</div>

          {/* Solution hover trigger */}
          <div
  className="relative"
  onMouseEnter={openSolutionMenu}
  onMouseLeave={closeSolutionMenuSoon}
>
  <button
    onClick={() => scrollToSection("solution")}
    onFocus={openSolutionMenu}
    className="flex items-center gap-1 hover:text-white transition-colors"
  >
    Solution
    <ChevronDown className="h-4 w-4" />
  </button>
</div>

          <button
            onClick={() => scrollToSection("resources")}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            Resources
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollToSection("demo")}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            Request a Demo <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => scrollToSection("login")}
            className="text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 px-5 py-2 rounded-full transition-all flex items-center gap-2"
          >
            Login <User className="h-4 w-4" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-black bg-white hover:bg-neutral-200 px-5 py-2 rounded-full transition-all"
          >
            Let&apos;s Talk →
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <CompanyMegaMenu
  mode="desktop"
  open={companyOpen}
  onEnter={openCompanyMenu}
  onLeave={closeCompanyMenuSoon}
  onNavigate={scrollToSection}
/>

<SolutionMegaMenu
  mode="desktop"
  open={solutionOpen}
  onEnter={openSolutionMenu}
  onLeave={closeSolutionMenuSoon}
  onNavigate={scrollToSection}
/>

      {/* Mobile Menu */}
   {mounted && mobileMenuOpen &&
  createPortal(
    <div className="md:hidden fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-16 h-full w-[86%] max-w-sm bg-black/90 backdrop-blur-xl border-r border-white/10">
        {/* ✅ scroll container */}
        <div className="h-full overflow-y-auto overscroll-contain">
          <div className="px-6 py-6">
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => toggleDropdown("home")}
                  className="flex items-center justify-between w-full text-left text-white/90 font-medium text-base py-2"
                >
                  Home
                  <span
                    className={`transform transition-transform ${
                      openDropdown === "home" ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </div>

              {/* Solution (uses SAME component) */}
              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={() => toggleDropdown("solution")}
                  className="flex items-center justify-between w-full text-left text-white/90 font-medium text-base py-2"
                >
                  Solution
                  <span
                    className={`transform transition-transform ${
                      openDropdown === "solution" ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <SolutionMegaMenu
                  mode="mobile"
                  open={openDropdown === "solution"}
                  onNavigate={scrollToSection}
                />
              </div>

              <div className="border-t border-white/10 pt-4">
  <button
    onClick={() => toggleDropdown("company")}
    className="flex items-center justify-between w-full text-left text-white/90 font-medium text-base py-2"
  >
    Company
    <span
      className={`transform transition-transform ${
        openDropdown === "company" ? "rotate-45" : ""
      }`}
    >
      +
    </span>
  </button>

  <CompanyMegaMenu
    mode="mobile"
    open={openDropdown === "company"}
    onNavigate={scrollToSection}
  />
</div>


              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="flex items-center justify-between w-full text-left text-white/90 font-medium text-base py-2"
                >
                  Portfolio
                </button>
              </div>

              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="flex items-center justify-between w-full text-left text-white/90 font-medium text-base py-2"
                >
                  Resources
                  <span
                    className={`transform transition-transform ${
                      openDropdown === "resources" ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-6 space-y-3">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-white text-black px-6 py-3 rounded-full font-medium text-base hover:bg-neutral-200 transition-all"
              >
                Let&apos;s Talk →
              </button>

              <button
                onClick={() => scrollToSection("login")}
                className="w-full bg-white/10 text-white border border-white/10 px-6 py-3 rounded-full font-medium text-base hover:bg-white/15 transition-all flex items-center justify-center gap-2"
              >
                Login <User className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollToSection("demo")}
                className="w-full text-white/90 px-6 py-3 font-medium text-base hover:underline transition-all text-center flex items-center justify-center gap-1"
              >
                Request a Demo <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        </div>
        </div>,
    document.body
      )}
    </nav>
  );
}
