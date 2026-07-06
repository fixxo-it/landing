import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  BellRing,
  Bot,
  Check,
  Crosshair,
  HeartPulse,
  MapPin,
  Navigation,
  Play,
  Radar,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingLink from './BookingLink';
import styles from './Safe360.module.css';

export const metadata: Metadata = {
  title: 'FamCare Safe360™ | AI-Powered Safety Infrastructure for Home Care',
  description:
    'Discover FamCare Safe360™: six connected safety pillars, 12 protection layers, and real-time AI-enabled monitoring for every home care booking.',
  alternates: { canonical: 'https://famcare.co.in/safe-360' },
};

const stages = [
  {
    phase: 'Before the visit',
    promise: 'We verify. We prepare. We match.',
    src: '/images/safe360-icons/identity360.png',
    items: [
      'Multi-layer identity verification',
      'Professional baby care training',
      'Health & hygiene screening',
      'AI caregiver matching',
    ],
  },
  {
    phase: 'During the visit',
    promise: 'We monitor. We ensure. We care.',
    src: '/images/safe360-icons/care360.png',
    items: [
      'Live GPS arrival confirmation',
      'Geofenced location monitoring',
      'Digital care checklist & updates',
      'Real-time alerts & SOS support',
    ],
  },
  {
    phase: 'After the visit',
    promise: 'We review. We improve. We grow.',
    src: '/images/safe360-icons/trust360.png',
    items: [
      'Parent safety feedback',
      'Quality & experience review',
      'Caregiver performance scoring',
      'AI learns for better matches',
    ],
  },
];

const layers = [
  { name: 'Identity360™', detail: 'Identity and document checks', src: '/images/safe360-icons/identity360.png' },
  { name: 'Skill360™', detail: 'Professional care training', src: '/images/safe360-icons/skill360.png' },
  { name: 'Health360™', detail: 'Health and hygiene screening', src: '/images/safe360-icons/health360.png' },
  { name: 'Arrival360™', detail: 'Live arrival confirmation', src: '/images/safe360-icons/arrival360.png' },
  { name: 'Home360™', detail: 'In-home session protection', src: '/images/safe360-icons/home360.png' },
  { name: 'GeoFence360™', detail: 'Location boundary monitoring', src: '/images/safe360-icons/geofence360.png' },
  { name: 'Care360™', detail: 'Digital care checklists', src: '/images/safe360-icons/care360.png' },
  { name: 'AI360™', detail: 'Always-on risk detection', src: '/images/safe360-icons/ai360.png' },
  { name: 'Match360™', detail: 'Safer caregiver matching', src: '/images/safe360-icons/match360.png' },
  { name: 'Audit360™', detail: 'Continuous quality audits', src: '/images/safe360-icons/audit360.png' },
  { name: 'Support360™', detail: 'Human help, around the clock', src: '/images/safe360-icons/support360.png' },
  { name: 'Trust360™', detail: 'Performance and feedback review', src: '/images/safe360-icons/trust360.png' },
];

const capabilities = [
  { label: 'Real-time monitoring', icon: Radar },
  { label: 'AI risk detection', icon: Bot },
  { label: 'Smart alerts', icon: BellRing },
  { label: 'Instant escalation', icon: Activity },
  { label: 'Human + AI collaboration', icon: Users },
];

const pillars = [
  {
    name: 'Verified people',
    src: '/images/safe360-icons/identity360.png',
    items: ['Multi-level identity verification', 'Police verification', 'Face authentication'],
  },
  {
    name: 'Safe arrival',
    src: '/images/safe360-icons/arrival360.png',
    items: ['Live GPS tracking', 'OTP check-in', 'AI face match'],
  },
  {
    name: 'Safe care',
    src: '/images/safe360-icons/care360.png',
    items: ['Care timeline', 'Digital care report', 'Smart caregiver matching'],
  },
  {
    name: 'Real-time monitoring',
    src: '/images/safe360-icons/geofence360.png',
    items: ['Geofencing', 'Silent SOS', 'Operations monitoring'],
  },
  {
    name: 'Continuous quality',
    src: '/images/safe360-icons/audit360.png',
    items: ['Trust score', 'Behaviour score', 'Surprise audits'],
  },
  {
    name: 'Transparent support',
    src: '/images/safe360-icons/support360.png',
    items: ['Incident management', 'Secure communication', 'Family notifications'],
  },
];

export default function Safe360Page() {
  return (
    <main className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}><ShieldCheck size={15} /> FamCare Safe360™ · Live protection system</div>
            <h1>
              <span className={styles.heroTitleLine}>Safety, engineered</span>
              <span className={`${styles.heroTitleLine} ${styles.heroAccent}`}>for every booking.</span>
            </h1>
            <p className={styles.heroThesis}>India&apos;s first AI-powered tech safety infrastructure for home care.</p>
            <p className={styles.heroLead}>
              Six connected pillars combine verified people, live intelligence, and human oversight to protect every care session from start to finish.
            </p>
            <div className={styles.heroProof}>
              <span><ShieldCheck size={18} /> 6 safety pillars</span>
              <span><Bot size={18} /> AI-enabled</span>
              <span><Radar size={18} /> Command center monitored</span>
            </div>
            <div className={styles.heroActions}>
              <BookingLink className={styles.primaryButton}>
                Book a caregiver <ArrowRight size={17} />
              </BookingLink>
              <a className={styles.secondaryButton} href="#pillars">
                <Play size={16} fill="currentColor" /> Explore the six pillars
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.photoCard}>
              <Image
                src="/images/babycare3.png"
                alt="FamCare caregiver engaging with a baby"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
                className={styles.heroImage}
              />
              <div className={styles.photoShade} />
              <div className={styles.liveBadge}><span /> Live care session</div>
              <div className={styles.photoCaption}>
                <span>Caregiver & child</span>
                <strong>Safe at home</strong>
              </div>
            </div>

            <div className={styles.safetyReceipt}>
              <div className={styles.receiptTop}>
                <span>Safe360 core</span>
                <strong>Live</strong>
              </div>
              <div className={styles.receiptTrack}><span /></div>
              <ul>
                <li><Check size={14} /> Verified person matched</li>
                <li><Check size={14} /> Geofence & audio online</li>
                <li><Check size={14} /> Session intelligence active</li>
              </ul>
              <div className={styles.receiptSeal}><ShieldCheck size={18} /> FamCare Command Center online</div>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsHeading}>
            <div>
              <span className="eyebrow">The Safe360 architecture</span>
              <h2 className="h2">Six pillars. One connected safety system.</h2>
            </div>
            <p>Every pillar owns a critical part of the care journey, while sharing signals with the rest of the system in real time.</p>
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map(({ name, src, items }, index) => (
              <article className={styles.pillarCard} key={name}>
                <div className={styles.pillarTop}>
                  <div className={styles.pillarIcon}>
                    <Image src={src} alt="" width={88} height={88} sizes="64px" className={styles.pillarArt} />
                  </div>
                  <span>Module {String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{name}</h3>
                <ul>
                  {items.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className={styles.systemStatus}><span /> Six modules connected · Command Center online · Human oversight active</div>
        </div>
      </section>

      <section id="how-it-protects" className={styles.journey}>
        <div className="container">
          <div className={styles.journeyHeading}>
            <div>
              <span className="eyebrow">One continuous standard</span>
              <h2>Protection that stays with every booking.</h2>
            </div>
            <div className={styles.journeyIntro}>
              <p>Safety begins before a caregiver arrives, stays active throughout the visit, and keeps learning after care ends.</p>
              <div className={styles.journeyScope} aria-label="Protection stages">
                <span>Before</span><i />
                <span>During</span><i />
                <span>After</span>
              </div>
            </div>
          </div>
          <div className={styles.stageRail}>
            {stages.map((stage, index) => {
              return (
                <article className={styles.stageCard} key={stage.phase}>
                  <div className={styles.stageTop}>
                    <div className={styles.stageIcon}>
                      <Image src={stage.src} alt="" width={92} height={92} sizes="68px" className={styles.stageArt} />
                    </div>
                    <div className={styles.stageIndex}><span>Stage</span><strong>0{index + 1}</strong></div>
                  </div>
                  <h3>{stage.phase}</h3>
                  <p>{stage.promise}</p>
                  <div className={styles.stageDivider} />
                  <ul>
                    {stage.items.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.commandSection}>
        <div className={`container ${styles.commandShell}`}>
          <div className={styles.commandCopy}>
            <div className={styles.darkKicker}><span /> Always watching. Always ready.</div>
            <h2>AI-powered FamCare command center</h2>
            <p>
              Our AI-enabled operations hub monitors every booking in real time to help ensure your child&apos;s safety, every second of every visit.
            </p>
            <div className={styles.capabilityGrid}>
              {capabilities.map(({ label, icon: Icon }) => (
                <div key={label}><Icon size={19} /><span>{label}</span></div>
              ))}
            </div>
          </div>

          <div className={styles.dashboard} aria-label="Illustration of the FamCare command center">
            <div className={styles.dashboardTop}>
              <span>Live overview</span>
              <span className={styles.online}><i /> Systems online</span>
            </div>
            <div className={styles.statRow}>
              <div><span>Active bookings</span><strong>128</strong><small>On track</small></div>
              <div><span>Caregivers on duty</span><strong>342</strong><small>Across Whitefield</small></div>
              <div><span>Alerts today</span><strong>03</strong><small>&lt; 60 sec response</small></div>
            </div>
            <div className={styles.monitorGrid}>
              <div className={styles.riskPanel}>
                <div className={styles.panelTitle}>AI risk radar <span>Live</span></div>
                <div className={styles.radarGraphic}>
                  <span className={styles.radarSweep} />
                  <Crosshair size={20} />
                </div>
                <div className={styles.riskLegend}><span>All clear</span><strong>100%</strong></div>
              </div>
              <div className={styles.feedPanel}>
                <div className={styles.panelTitle}>Live feed</div>
                <div><Navigation size={16} /><span>Caregiver near home<small>ETA 2 mins</small></span><b>Live</b></div>
                <div><MapPin size={16} /><span>Geofence active<small>Within safe zone</small></span><b>On</b></div>
                <div><HeartPulse size={16} /><span>Baby care in progress<small>All good</small></span><b>Safe</b></div>
              </div>
            </div>
            <div className={styles.aiInsight}><Bot size={17} /> AI insight: all patterns optimal. No action required.</div>
          </div>
        </div>
        <div className={`container ${styles.commandFooter}`}>
          <ShieldCheck size={19} /> Powered by AI. Detects risks. Predicts issues. Helps ensure safety.
        </div>
      </section>

      <section className={styles.layersSection}>
        <div className="container">
          <div className={styles.layersHeading}>
            <div>
              <span className="eyebrow">Built as a system</span>
              <h2 className="h2">The 12 layers of Safe360™</h2>
            </div>
            <p>Each layer has one clear job. Together, they create protection without gaps.</p>
          </div>
          <div className={styles.layersGrid}>
            {layers.map(({ name, detail, src }, index) => (
              <article className={styles.layerCard} key={name}>
                <span className={styles.layerNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.layerIcon}>
                  <Image
                    src={src}
                    alt=""
                    width={96}
                    height={96}
                    sizes="72px"
                    className={styles.layerArt}
                  />
                </div>
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`container ${styles.finalCtaInner}`}>
          <div>
            <div className={styles.rating}>
              <div className={styles.avatars}><span>R</span><span>A</span><span>S</span></div>
              <strong>4.8/5</strong>
              <span className={styles.stars}>★★★★★</span>
              <small>500+ parent reviews</small>
            </div>
            <h2>Care you can book.<br />Protection you can feel.</h2>
          </div>
          <BookingLink className={styles.lightButton}>
            Book a trusted caregiver <ArrowRight size={18} />
          </BookingLink>
        </div>
      </section>

      <Footer />
    </main>
  );
}
