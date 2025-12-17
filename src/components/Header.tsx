import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    // <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md electric-border">
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md electric-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-blue-600">Insweave</span>
            <span className="text-2xl font-light electric-glow ml-1">Solutions</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className="hover:text-white transition-colors"
            >
              Mission
            </button>
            {/* <button
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-white transition-colors"
            >
              Company
            </button> */}
            </div>
            <div className='flex items-center gap-4'>
              
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:inline-flex text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 rounded-full transition-all"
            >
              Client Login
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex text-xs font-medium text-black bg-white hover:bg-neutral-200 px-4 py-2 rounded-full transition-all"
            >
              Contact Sales
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('mission')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Company
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Client Login
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Sales
              </button>
            </div>
          </div>
        )}
      </nav>
    // </header>
  );
}
