import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import Services from '@/components/Services';
import Safe360Architecture from '@/components/Safe360Architecture';
import FlexibleHours from '@/components/FlexibleHours';
import ForEveryOccasion from '@/components/ForEveryOccasion';
import HowItWorks from '@/components/HowItWorks';
import Pillars from '@/components/Pillars';
import WhySwitch from '@/components/WhySwitch';
import OurTech from '@/components/OurTech';
import AboutFamCare from '@/components/AboutFamCare';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <Services />
      <Safe360Architecture />
      <AboutFamCare />
      <FlexibleHours />
      <ForEveryOccasion />
      <HowItWorks />
      <Pillars />
      <WhySwitch />
      <OurTech />
      <Testimonials />
      <FinalCTA />
      <FAQ />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
