"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, User, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import SolutionMegaMenu from "./Header/SolutionMegaMenu";
import CompanyMegaMenu from "./Header/CompanyMegaMenu";

export default function Header() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* ================= DESKTOP HOVER STATES ================= */
  const [companyOpen, setCompanyOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const closeTimers = useRef<{
    company?: number;
    solution?: number;
    resources?: number;
  }>({});

  /* ================= COMPANY ================= */
  const openCompanyMenu = () => {
    clearTimeout(closeTimers.current.company);
    setCompanyOpen(true);
    setSolutionOpen(false);
    setResourcesOpen(false);
  };

  const closeCompanyMenuSoon = () => {
    closeTimers.current.company = window.setTimeout(
      () => setCompanyOpen(false),
      140
    );
  };

  /* ================= SOLUTION ================= */
  const openSolutionMenu = () => {
    clearTimeout(closeTimers.current.solution);
    setSolutionOpen(true);
    setCompanyOpen(false);
    setResourcesOpen(false);
  };

  const closeSolutionMenuSoon = () => {
    closeTimers.current.solution = window.setTimeout(
      () => setSolutionOpen(false),
      140
    );
  };

  /* ================= RESOURCES ================= */
  const openResourcesMenu = () => {
    clearTimeout(closeTimers.current.resources);
    setResourcesOpen(true);
    setCompanyOpen(false);
    setSolutionOpen(false);
  };

  const closeResourcesMenuSoon = () => {
    closeTimers.current.resources = window.setTimeout(
      () => setResourcesOpen(false),
      140
    );
  };

  /* ================= NAV HELPERS ================= */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });

    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setCompanyOpen(false);
    setSolutionOpen(false);
    setResourcesOpen(false);
  };

  const goToPage = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setCompanyOpen(false);
    setSolutionOpen(false);
    setResourcesOpen(false);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  /* ================= RENDER ================= */
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/header.svg" alt="WebnexFusion" className="h-8" />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <button
            onClick={() => goToPage("/")}
            className="hover:text-white transition-colors"
          >
            Home
          </button>

          <button
            onClick={() => goToPage("/features")}
            className="hover:text-white transition-colors"
          >
            Features
          </button>

          {/* COMPANY */}
          {/* <div
            className="relative"
            onMouseEnter={openCompanyMenu}
            onMouseLeave={closeCompanyMenuSoon}
          >
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              Company <ChevronDown className="h-4 w-4" />
            </button>
          </div> */}

          {/* SOLUTION */}
          <div
            className="relative"
          // onMouseEnter={openSolutionMenu}
          // onMouseLeave={closeSolutionMenuSoon}
          >
            <button
              onClick={() => scrollToSection("services")}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Solution <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* RESOURCES */}
          <div
            className="relative"
            onMouseEnter={openResourcesMenu}
            onMouseLeave={closeResourcesMenuSoon}
          >
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              Resources <ChevronDown className="h-4 w-4" />
            </button>

            {resourcesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
                onMouseEnter={openResourcesMenu}
                onMouseLeave={closeResourcesMenuSoon}
              >
                <button
                  onClick={() => goToPage("/about")}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  About Us
                </button>
                <button
                  onClick={() => goToPage("/blog")}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  Blog
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => goToPage("/contact")}
            className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1"
          >
            Request a Demo <ArrowUpRight className="h-4 w-4" />
          </button>

          <Link
            to="https://dashboard.webnexfusion.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 px-5 py-2 rounded-full flex items-center gap-2"
          >
            Login <User className="h-4 w-4" />
          </Link>

          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-black bg-white hover:bg-neutral-200 px-5 py-2 rounded-full"
          >
            Let&apos;s Talk →
          </button>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MEGA MENUS ================= */}
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

      {/* ================= MOBILE MENU ================= */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="md:hidden fixed inset-0 z-[9999]">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* DRAWER */}
            <div className="absolute right-0 top-16 h-full w-[86%] max-w-sm bg-black/90 backdrop-blur-xl border-l border-white/10">
              <div className="h-full overflow-y-auto overscroll-contain">
                <div className="px-6 py-6 space-y-4">
                  {/* HOME */}
                  <button
                    onClick={() => goToPage("/")}
                    className="w-full text-left text-white/90 font-medium py-2"
                  >
                    Home
                  </button>

                  {/* SOLUTION */}
                  <div className="border-t border-white/10 pt-4">
                    <button
                      onClick={() => toggleDropdown("solution")}
                      className="flex justify-between w-full text-white/90 font-medium py-2"
                    >
                      Solution
                      <span
                        className={`transition-transform ${openDropdown === "solution" ? "rotate-45" : ""
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

                  {/* COMPANY */}
                  <div className="border-t border-white/10 pt-4">
                    {/* <button
                      onClick={() => toggleDropdown("company")}
                      className="flex justify-between w-full text-white/90 font-medium py-2"
                    >
                      Company
                      <span
                        className={`transition-transform ${openDropdown === "company" ? "rotate-45" : ""
                          }`}
                      >
                        +
                      </span>
                    </button> */}

                    <CompanyMegaMenu
                      mode="mobile"
                      open={openDropdown === "company"}
                      onNavigate={scrollToSection}
                    />
                  </div>

                  {/* RESOURCES */}
                  <div className="border-t border-white/10 pt-4">
                    <button
                      onClick={() => toggleDropdown("resources")}
                      className="flex justify-between w-full text-white/90 font-medium py-2"
                    >
                      Resources
                      <span
                        className={`transition-transform ${openDropdown === "resources" ? "rotate-45" : ""
                          }`}
                      >
                        +
                      </span>
                    </button>

                    {openDropdown === "resources" && (
                      <div className="pl-4 pt-2 space-y-2 text-sm text-white/80">
                        <button onClick={() => goToPage("/about")}>
                          About Us
                        </button>
                        <button onClick={() => goToPage("/blog")}>Blog</button>
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="pt-6 space-y-3">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="w-full bg-white text-black py-3 rounded-full font-medium"
                    >
                      Let&apos;s Talk →
                    </button>

                    <Link
                      to="https://dashboard.webnexfusion.com/"
                      target="_blank"
                      className="w-full bg-white/10 text-white border border-white/10 py-3 rounded-full flex justify-center items-center gap-2"
                    >
                      Login <User className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() => goToPage("/contact")}
                      className="w-full text-white/90 py-3 flex justify-center items-center gap-1"
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
