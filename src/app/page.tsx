import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pillars from '@/components/Pillars';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Pillars />
      <Expertise />
      <Testimonials />
      <Footer />
    </main>
  );
}
