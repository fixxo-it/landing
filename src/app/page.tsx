import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import Pillars from '@/components/Pillars';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <Services />
      <Expertise />
      <Pillars />
      <Testimonials />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
