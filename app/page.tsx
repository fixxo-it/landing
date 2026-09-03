import SiteHeader from "@/components/sections/SiteHeader";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Safety360Dial from "@/components/sections/Safety360Dial";
import Safety360 from "@/components/sections/Safety360";
import HiringJourney from "@/components/sections/HiringJourney";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CtaBanner from "@/components/sections/CtaBanner";
import SiteFooter from "@/components/sections/SiteFooter";
import DownloadModal from "@/components/DownloadModal";
import ScrollHint from "@/components/ScrollHint";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col">
        <Hero />
        <Services />
        <HowItWorks />
        <Safety360Dial />
        <Safety360 />
        <HiringJourney />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
      <DownloadModal />
      <ScrollHint />
    </>
  );
}
