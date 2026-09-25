import type { Metadata } from "next";
import Link from "next/link";
import OnLoad from "@/components/join/OnLoad";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Section";
import BackButton from "@/components/legal/BackButton";
import ApplicationForm from "@/components/join/ApplicationForm";
import BenefitIcon from "@/components/join/BenefitIcon";
import { JELLY_BTN } from "@/components/join/jelly";
import StepBadge from "@/components/join/StepBadge";
import ServiceLoop from "@/components/join/ServiceLoop";
import CtaBanner from "@/components/sections/CtaBanner";
import SiteFooter from "@/components/sections/SiteFooter";
import DownloadModal from "@/components/DownloadModal";

export const metadata: Metadata = {
  title: "Join FamCare as a caregiver",
  description: "Caregiver careers in Bengaluru: training, insurance support and eligible bonuses.",
};

const BENEFITS = [
  { icon: "heart", title: "Respect for your work", body: "Caregiving is skilled, meaningful work. Be part of a team that values the person behind the care." },
  { icon: "growth", title: "A career to grow in", body: "Build experience, strengthen your skills, and see a path forward in baby care." },
  { icon: "training", title: "Training that supports you", body: "Get practical onboarding, skill assessment, and ongoing guidance to care with confidence." },
  { icon: "shield", title: "Insurance support", body: "Insurance coverage for eligible caregivers, subject to the applicable policy terms." },
  { icon: "calendar", title: "Attendance bonus", body: "Earn an additional bonus when you meet the attendance criteria for the month." },
  { icon: "gift", title: "Joining bonus", body: "Eligible new caregivers can earn a joining bonus after meeting the required conditions." },
];

const STEPS = ["Submit this short form", "Speak with our hiring team", "Interview, checks and training"];

export default function JoinPage() {
  return (
    <>
      <main className="bg-white">
        <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
          <Container className="flex h-[72px] items-center justify-between gap-4">
            <OnLoad>
              <BackButton />
            </OnLoad>
            <OnLoad delay={0.1}>
              <Link href="/" className="block text-right leading-none">
                <span className="block font-display text-[1.8rem] font-bold tracking-[-0.02em] text-teal">FamCare</span>
                <span className="-mt-0.5 block text-xs font-medium leading-none text-ink-muted">Caregivers in 10 mins</span>
              </Link>
            </OnLoad>
          </Container>
        </header>

        <Container className="grid items-center gap-12 pb-16 pt-14 lg:pb-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pt-20">
          <Stagger delay={0.1} step={0.12}>
            <StaggerItem>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">Caregiver careers · Bengaluru</p>
            </StaggerItem>
            <StaggerItem>
            <h1 className="mt-6 font-display text-[min(3.25rem,calc((100vw-3rem)/6.6))] font-bold leading-[1.04] sm:text-[3.25rem] lg:text-[5.25rem] lg:leading-[1.02] lg:tracking-[-0.032em]">
              <span className="block whitespace-nowrap text-ink lg:inline">Join FamCare.</span>{" "}
              <span className="text-ink">Build a career in care.</span>
            </h1>
            </StaggerItem>
            <StaggerItem>
            <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-ink-muted">
              At FamCare, your work is respected and your future matters. With structured opportunities,
              training, insurance support and eligible bonuses, you can grow your earnings while caring
              with greater peace of mind.
            </p>
            </StaggerItem>
            <StaggerItem>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#apply"
                className={`${JELLY_BTN} h-12 px-7 text-base`}
              >
                <span className="relative z-10">APPLY AS A CAREGIVER →</span>
              </a>
              <span className="text-ink-muted">A short application · About 3 minutes</span>
            </div>
            </StaggerItem>
          </Stagger>
          <Reveal delay={0.25}>
            <ServiceLoop />
          </Reveal>
        </Container>

        <Container className="py-16 lg:py-24">
          <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">Why FamCare</p>
          <h2 className="mt-3 max-w-[20ch] font-display text-[2.5rem] font-bold leading-[1.08] text-ink lg:text-[3.75rem] lg:leading-[1.05] lg:tracking-[-0.03em]">
            A career that looks after you.
          </h2>
          <p className="mt-5 max-w-[680px] text-lg text-ink-muted lg:text-xl">
            Respect, training and rewards for every caregiver who joins the FamCare team.
          </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <StaggerItem key={b.title} className="h-full">
              <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-card p-8 text-teal">
                <BenefitIcon name={b.icon} />
                <h2 className="mt-6 font-display text-2xl font-bold leading-tight">{b.title}</h2>
                <p className="mt-2 text-[15px] leading-snug text-teal/75">{b.body}</p>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
          <p className="mt-6 max-w-[1000px] text-sm leading-relaxed text-ink-muted">
            * Your total earnings may be higher than in other roles when you qualify for available
            bonuses; actual earnings vary by role, attendance and eligibility. Insurance coverage and
            bonuses are subject to terms and conditions. Our hiring team will explain the amounts,
            coverage and payout timelines before you join.
          </p>
          </Reveal>
        </Container>

        <section id="apply" className="scroll-mt-24 py-16 lg:py-24">
          <Container className="max-w-[1200px]">
            <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">Join our team</p>
                <h2 className="mt-3 font-display text-[2.5rem] font-bold leading-[1.08] text-ink lg:text-[3.75rem] lg:leading-[1.05] lg:tracking-[-0.03em]">
                  Tell us a little about yourself.
                </h2>
              </div>
              <ol className="flex flex-col gap-6 sm:flex-row sm:items-start lg:w-[560px] lg:shrink-0">
                {STEPS.map((s, i) => (
                  <li key={s} className="relative flex flex-1 items-center gap-4 text-left sm:flex-col sm:gap-0 sm:text-center">
                    {i > 0 && <span aria-hidden className="absolute -top-6 left-[27px] h-6 w-0.5 bg-teal/25 sm:left-auto sm:right-[calc(50%+28px)] sm:top-[27px] sm:h-0.5 sm:w-[calc(100%-56px)]" />}
                    <StepBadge n={i + 1} />
                    <span className="sm:mt-3 max-w-[170px] sm:px-1 text-base font-semibold leading-snug text-ink text-balance">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-5 text-lg text-ink-muted lg:text-xl">
              We’ll review your details and contact shortlisted applicants to explain the role and next steps.
            </p>
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <ApplicationForm />
            </Reveal>
          </Container>
        </section>

        <CtaBanner heading="max-w-[14ch] font-display text-[2.5rem] font-bold leading-[1.08] text-balance text-ink lg:text-[3.75rem] lg:leading-[1.05] lg:tracking-[-0.03em]" />
      </main>
      <SiteFooter />
      <DownloadModal />
    </>
  );
}
