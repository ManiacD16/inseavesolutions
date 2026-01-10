"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, User, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SolutionMegaMenu from "./Header/SolutionMegaMenu";
import CompanyMegaMenu from "./Header/CompanyMegaMenu";
import { createPortal } from "react-dom";

export default function Header() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Desktop hover states
  const [companyOpen, setCompanyOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const closeTimers = useRef<{
    company?: number;
    solution?: number;
    resources?: number;
  }>({});

  /* ---------- COMPANY ---------- */
  const openCompanyMenu = () => {
    clearTimeout(closeTimers.current.company);
    setCompanyOpen(true);
    setSolutionOpen(false);
    setResourcesOpen(false);
  };

  const closeCompanyMenuSoon = () => {
    closeTimers.current.company = window.setTimeout(
      () => setCompanyOpen(false),
      150
    );
  };

  /* ---------- SOLUTION ---------- */
  const openSolutionMenu = () => {
    clearTimeout(closeTimers.current.solution);
    setSolutionOpen(true);
    setCompanyOpen(false);
    setResourcesOpen(false);
  };

  const closeSolutionMenuSoon = () => {
    closeTimers.current.solution = window.setTimeout(
      () => setSolutionOpen(false),
      150
    );
  };

  /* ---------- RESOURCES ---------- */
  const openResourcesMenu = () => {
    clearTimeout(closeTimers.current.resources);
    setResourcesOpen(true);
    setCompanyOpen(false);
    setSolutionOpen(false);
  };

  const closeResourcesMenuSoon = () => {
    closeTimers.current.resources = window.setTimeout(
      () => setResourcesOpen(false),
      150
    );
  };

  /* ---------- SCROLL OR ROUTE ---------- */
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

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src="/header.svg" alt="WebnexFusion" className="h-8" />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <button onClick={() => goToPage("/")} className="hover:text-white">
            Home
          </button>

          <button
            onClick={() => goToPage("/features")}
            className="hover:text-white"
          >
            Features
          </button>

          {/* Company */}
          <div
            className="relative"
            onMouseEnter={openCompanyMenu}
            onMouseLeave={closeCompanyMenuSoon}
          >
            <button className="flex items-center gap-1 hover:text-white">
              Company <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Solution */}
          <div
            className="relative"
            onMouseEnter={openSolutionMenu}
            onMouseLeave={closeSolutionMenuSoon}
          >
            <button className="flex items-center gap-1 hover:text-white">
              Solution <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* -------- RESOURCES -------- */}
          <div
            className="relative"
            onMouseEnter={openResourcesMenu}
            onMouseLeave={closeResourcesMenuSoon}
          >
            <button className="flex items-center gap-1 hover:text-white">
              Resources <ChevronDown className="h-4 w-4" />
            </button>

            {resourcesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
                onMouseEnter={openResourcesMenu}
                onMouseLeave={closeResourcesMenuSoon}
              >
                {/* <button
                  onClick={() => goToPage("/team")}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  Team
                </button> */}

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
            className="text-gray-300 hover:text-white flex items-center gap-1"
          >
            Request Demo <ArrowUpRight className="h-4 w-4" />
          </button>

          <Link
            to="https://dashboard.webnexfusion.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 flex items-center gap-2"
          >
            Login <User className="h-4 w-4" />
          </Link>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200"
          >
            Let’s Talk →
          </button>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mega Menus */}
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
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="absolute right-0 top-16 h-full w-[86%] bg-black/90 backdrop-blur-xl border-l border-white/10">
              <div className="px-6 py-6 space-y-4">
                <button onClick={() => scrollToSection("home")}>Home</button>

                <div>
                  <button onClick={() => toggleDropdown("solution")}>
                    Solution
                  </button>
                  <SolutionMegaMenu
                    mode="mobile"
                    open={openDropdown === "solution"}
                    onNavigate={scrollToSection}
                  />
                </div>

                <div>
                  <button onClick={() => toggleDropdown("company")}>
                    Company
                  </button>
                  <CompanyMegaMenu
                    mode="mobile"
                    open={openDropdown === "company"}
                    onNavigate={scrollToSection}
                  />
                </div>

                <div>
                  <button onClick={() => toggleDropdown("resources")}>
                    Resources
                  </button>
                  {openDropdown === "resources" && (
                    <div className="pl-4 pt-2 space-y-2">
                      <button onClick={() => goToPage("/team")}>Team</button>
                      <button onClick={() => goToPage("/about")}>
                        About Us
                      </button>
                      <button onClick={() => goToPage("/blog")}>Blog</button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-white text-black py-3 rounded-full"
                >
                  Let’s Talk →
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
}
