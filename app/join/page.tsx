import type { Metadata } from "next";
import { ScrollFx, SmoothScroll } from "@/components/lab/core";
import { AppQrModal } from "@/components/lab/AppQr";
import { FooterCta, Header } from "@/components/lab/Scenes2";
import { Apply, Benefits, JoinHero, JoinSteps, MarkReady } from "@/components/lab/JoinPage";

export const metadata: Metadata = {
  title: "Join FamCare as a caregiver",
  description: "Caregiver careers in Bengaluru: training, insurance support and eligible bonuses",
};

export default function JoinPage() {
  return (
    <div className="lab overflow-x-clip">
      <MarkReady />
      <SmoothScroll />
      <Header />
      <div aria-hidden className="lab-grain" />
      <main>
        <JoinHero />
        <Benefits />
        <JoinSteps />
        <Apply />
      </main>
      <FooterCta />
      <AppQrModal />
      <ScrollFx />
    </div>
  );
}
