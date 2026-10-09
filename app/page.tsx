import { ScrollFx, SmoothScroll } from "@/components/lab/core";
import Hero from "@/components/lab/Hero";
import Preloader from "@/components/lab/Preloader";
import { HorizontalServices, ProblemSolution, Safe360, ZoomDot } from "@/components/lab/Scenes";
import { AppQrModal } from "@/components/lab/AppQr";
import { Faq, FooterCta, Header, Journey, MicroReel, Reviews } from "@/components/lab/Scenes2";

/* Motion lab: an experimental, animation-led take on the landing page. */
export default function Home() {
  return (
    <div className="lab overflow-x-clip">
      <SmoothScroll />
      <Preloader />
      <Header />
      <div aria-hidden className="lab-grain" />

      <main>
        <Hero />
        <ProblemSolution />
        <HorizontalServices />
        <ZoomDot />
        <Safe360 />
        <MicroReel />
        <Journey />
        <Reviews />
        <Faq />
      </main>
      <FooterCta />
      <AppQrModal />
      <ScrollFx />
    </div>
  );
}
