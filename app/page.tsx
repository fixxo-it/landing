import SiteHeader from '@/components/sections/SiteHeader';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Microservices from '@/components/sections/Microservices';
import HowItWorks from '@/components/sections/HowItWorks';
import Safe360Dial from '@/components/sections/Safe360Dial';
import HiringJourney from '@/components/sections/HiringJourney';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import CtaBanner from '@/components/sections/CtaBanner';
import SiteFooter from '@/components/sections/SiteFooter';
import DownloadModal from '@/components/DownloadModal';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col">
        <Hero />
        <Services />
        <Microservices />
        <HowItWorks />
        <Safe360Dial />
        <HiringJourney />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
      <DownloadModal />
    </>
  );
}
