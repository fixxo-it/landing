import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pillars from '@/components/Pillars';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pillars />
      <Expertise />
      <Services />
      <Footer />
    </main>
  );
}
