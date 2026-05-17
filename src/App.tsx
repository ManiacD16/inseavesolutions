import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/pages/Admin/Login";
import Contacts from "./components/pages/Admin/Contacts";
import Settings from "./components/pages/Admin/Settings";
import ForgotPassword from "./components/pages/Admin/ForgotPassword"; // Added import

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Team from "./components/pages/Team";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import BlogDetail from "./components/pages/BlogDetail";
import AdminDashboard from "./components/pages/Admin/Dashboard";
import DashboardHome from "./components/pages/Admin/DashboardHome"; // New
import BlogList from "./components/pages/Admin/BlogList"; // New
import BlogEditor from "./components/pages/Admin/BlogEditor";
import Careers from "./components/pages/Careers";
import CareerManagement from "./components/pages/Admin/CareerManagement";
import Features from "./components/pages/Features";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import RefundPolicy from "./components/pages/RefundPolicy";
import CookiePolicy from "./components/pages/CookiePolicy";
import TermsOfService from "./components/pages/TermsOfService";
import ScrollToTop from "./components/ScrollToTop";
import SolutionRouter from "./components/pages/Solutions/SolutionRouter";
import SolutionsOverview from "./components/pages/Solutions/SolutionsOverview";
import CompanyRouter from "./components/pages/Company/CompanyRouter";
import ToolsHub from "./components/pages/Tools";
import SingleTool from "./components/pages/Tools/SingleTool";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <ScrollToTop />
      <div className="min-h-screen bg-[#020617] text-white relative">
        {/* Background effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[800px] grid-bg opacity-40" />
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10">
          {/* Common Header - Hide on Admin Routes */}
          {!isAdminRoute && <Header />}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company/:slug" element={<CompanyRouter />} />
            <Route path="/solutions/industries" element={<SolutionsOverview />} />
            <Route path="/solutions/industry/:slug" element={<SolutionRouter />} />
            <Route path="/solutions/:slug" element={<SolutionRouter />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/resources/tools" element={<ToolsHub />} />
            <Route path="/resources/tools/:toolId" element={<SingleTool />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="careers" element={<CareerManagement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="blogs/new" element={<BlogEditor />} />
              <Route path="blogs/edit/:id" element={<BlogEditor />} />
            </Route>

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>

          {/* Common Footer - Hide on Admin Routes */}
          {!isAdminRoute && <Footer />}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
