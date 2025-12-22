import Header from "./components/Header"
import Hero from "./components/Hero"
import Clients from "./components/Clients"
import Teams from "./components/Teams"
import Services from "./components/Services"
import Portfolio from "./components/Portfolio"
import Process from "./components/Process"
import Mission from "./components/Mission"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

// src/App.tsx
function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* subtle grid */}
        <div className="absolute top-0 left-0 w-full h-[800px] grid-bg opacity-40" />
        {/* soft blobs */}
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Clients />
          <Services />
          <Portfolio />
          <Teams />
          <Process />
          <Mission />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
