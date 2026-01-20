import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Team from "./components/pages/Team";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Features from "./components/pages/Features";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import RefundPolicy from "./components/pages/RefundPolicy";
import CookiePolicy from "./components/pages/CookiePolicy";
import TermsOfService from "./components/pages/TermsOfService";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#020617] text-white relative">
        {/* Background effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[800px] grid-bg opacity-40" />
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10">
          {/* Common Header */}
          <Header />

          {/* Routes */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Routes>
          </main>

          {/* Common Footer */}
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
