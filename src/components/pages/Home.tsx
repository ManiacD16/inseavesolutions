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
        title="WebnexFusion | Best Web Development & Digital Marketing Agency"
        description="WebnexFusion is a premier digital agency providing expert web development, mobile app creation, UI/UX design, and SEO services. Boost your online presence with our innovative tech solutions."
        keywords="WebnexFusion, web development agency, digital marketing, SEO experts, app development, UI/UX design, software solutions, India IT company"
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
