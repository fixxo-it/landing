import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import Services from '@/components/Services';
import FlexibleHours from '@/components/FlexibleHours';
import ForEveryOccasion from '@/components/ForEveryOccasion';
import HowItWorks from '@/components/HowItWorks';
import Pillars from '@/components/Pillars';
import WhySwitch from '@/components/WhySwitch';
import OurTech from '@/components/OurTech';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <Services />
      <FlexibleHours />
      <ForEveryOccasion />
      <HowItWorks />
      <Pillars />
      <WhySwitch />
      <OurTech />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
