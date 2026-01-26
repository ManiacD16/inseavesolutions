// src/pages/Home.tsx

import ClientReviewsCarousel from "../ClientReviews";
import Contact from "../Contact";
import Hero from "../Hero";
import Mission from "../Mission";
import Portfolio from "../Portfolio";
import Process from "../Process";
import Services from "../Services";
import SEO from "../SEO";

export default function Home() {
  return (
    <div id="home">
      <SEO
        title="WebnexFusion - Leading Web Development & Digital Marketing Agency"
        description="WebnexFusion offers top-tier web development, app development, UI/UX design, and digital marketing services to grow your business."
        canonicalUrl="https://webnexfusion.com/"
      />
      {/* Hero Section */}
      <Hero />

      {/* Trusted Clients */}
      {/* <ClientLogosSection /> */}

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
