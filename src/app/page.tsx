import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DoctorTeam from "@/components/sections/DoctorTeam";
import SmileGallery from "@/components/sections/SmileGallery";
import Testimonials from "@/components/sections/Testimonials";
import BookingForm from "@/components/sections/BookingForm";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Hero — bold headline, animated entrance, parallax image */}
      <section id="home">
        <Hero />
      </section>

      {/* Trust bar — animated counters, certifications */}
      <TrustBar />

      {/* Services — interactive grid with hover reveals */}
      <section id="services">
        <Services />
      </section>

      {/* Why choose us — GSAP-pinned scroll storytelling */}
      <WhyChooseUs />

      {/* Meet the doctors — team cards with credentials */}
      <section id="team">
        <DoctorTeam />
      </section>

      {/* Before/After smile gallery — comparison slider */}
      <section id="gallery">
        <SmileGallery />
      </section>

      {/* Testimonials — carousel with ratings */}
      <Testimonials />

      {/* Booking form — multi-step, validated */}
      <section id="booking">
        <BookingForm />
      </section>

      {/* FAQ — accordion */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Contact & location */}
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
