// src/pages/Home.tsx

import ClientReviewsCarousel from "../ClientReviews";
import ClientLogosSection from "../Clients";
import Contact from "../Contact";
import Hero from "../Hero";
import Mission from "../Mission";
import Portfolio from "../Portfolio";
import Process from "../Process";
import Services from "../Services";

export default function Home() {
  return (
    <div id="home">
      {/* Hero Section */}
      <Hero />

      {/* Trusted Clients */}
      <ClientLogosSection />

      {/* How We Work */}
      <Process />

      {/* Services */}
      <Services />

      {/* Portfolio / Work */}
      <Portfolio />

      {/* Client Reviews */}
      <ClientReviewsCarousel />

      {/* Mission & Values */}
      <Mission />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
