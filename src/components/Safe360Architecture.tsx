'use client';

import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BellRing,
  BrainCircuit,
  Check,
  ClipboardCheck,
  Eye,
  GraduationCap,
  HeartHandshake,
  MapPinned,
  MessageCircleMore,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { useStoreUrl } from '@/lib/useStoreUrl';
import styles from './Safe360Architecture.module.css';

const pillars = [
  { name: 'Verified people', shortName: 'Identity', src: '/images/safe360-icons/identity360.png' },
  { name: 'Safe arrival', shortName: 'Arrival', src: '/images/safe360-icons/arrival360.png' },
  { name: 'Safe care', shortName: 'Care', src: '/images/safe360-icons/care360.png' },
  { name: 'Real-time monitoring', shortName: 'Monitor', src: '/images/safe360-icons/geofence360.png' },
  { name: 'Continuous quality', shortName: 'Quality', src: '/images/safe360-icons/audit360.png' },
  { name: 'Transparent support', shortName: 'Support', src: '/images/safe360-icons/support360.png' },
];

const assurances = [
  { icon: ShieldCheck, value: '6', label: 'Safety pillars' },
  { icon: BadgeCheck, value: '100%', label: 'Verified caregivers' },
  { icon: Eye, value: 'Live', label: 'Always monitored' },
];

const tabs = [
  {
    id: 'system',
    label: 'Safe360 system',
    shortLabel: 'Safe360',
    icon: ShieldCheck,
    eyebrow: 'Trust infrastructure',
    title: 'Four systems working as one.',
    description: 'Safe360 combines people, technology, care protocols and quality controls around every booking.',
    center: 'Safe360™',
    outcome: 'One connected safety system—from verification to continuous improvement.',
    features: [
      { icon: UserRoundCheck, title: 'Trust', text: 'Identity checks, police verification and behaviour scores.' },
      { icon: BrainCircuit, title: 'Technology', text: 'AI risk detection, live tracking and safety escalation.' },
      { icon: HeartHandshake, title: 'Care', text: 'No-phone baby mode, care logs and family support.' },
      { icon: Star, title: 'Quality', text: 'Feedback loops, audits and continuous certification.' },
    ],
  },
  {
    id: 'technology',
    label: 'Our technology',
    shortLabel: 'Technology',
    icon: BrainCircuit,
    eyebrow: 'AI-powered command center',
    title: 'Real people. Real-time safety.',
    description: 'Technology watches the signals; our operations team stays ready to step in when something needs attention.',
    center: 'AI + Human',
    outcome: 'Risks are surfaced early, escalated quickly and closed by a real person.',
    features: [
      { icon: Activity, title: 'Live monitoring', text: 'Every active booking stays visible to our operations team.' },
      { icon: BrainCircuit, title: 'Risk detection', text: 'AI identifies unusual patterns and safety anomalies.' },
      { icon: BellRing, title: 'Smart escalation', text: 'Alerts reach the right team with booking context attached.' },
      { icon: MapPinned, title: 'Location safety', text: 'Live arrival tracking and geofence protection.' },
    ],
  },
  {
    id: 'standards',
    label: 'Hiring & training',
    shortLabel: 'Standards',
    icon: GraduationCap,
    eyebrow: 'Building better caregivers',
    title: 'Selected for character. Trained for care.',
    description: 'We hire women with the right temperament, then certify practical skills before they enter a family’s home.',
    center: 'FBCP',
    outcome: 'No first booking until identity, behaviour, skills and safety training are cleared.',
    features: [
      { icon: UserRoundCheck, title: 'Careful hiring', text: 'Patience, calm communication, cleanliness and empathy.' },
      { icon: ScanFace, title: 'Verified identity', text: 'Government ID, address and background verification.' },
      { icon: GraduationCap, title: 'Mandatory training', text: 'Baby care, hygiene, emergencies and parent communication.' },
      { icon: ClipboardCheck, title: 'Practical assessment', text: 'Skills are demonstrated and certified before booking.' },
    ],
  },
  {
    id: 'quality',
    label: 'Continuous quality',
    shortLabel: 'Quality',
    icon: Sparkles,
    eyebrow: 'The Care Circle',
    title: 'Every booking makes care better.',
    description: 'Feedback becomes a behaviour score, scores shape coaching, and stronger performance creates better matches.',
    center: 'Care Circle',
    outcome: 'Transparent feedback creates safer care and a real growth path for caregivers.',
    features: [
      { icon: MessageCircleMore, title: 'Parent feedback', text: 'Structured feedback is captured after every booking.' },
      { icon: Activity, title: 'Behaviour score', text: 'Reliability and care quality are tracked over time.' },
      { icon: GraduationCap, title: 'Coaching loop', text: 'Gaps trigger retraining, review and reassessment.' },
      { icon: UsersRound, title: 'Better matching', text: 'Proven strengths inform future family-caregiver matches.' },
    ],
  },
];

export default function Safe360Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const storeUrl = useStoreUrl();
  const active = tabs[activeTab];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    setActiveTab(nextIndex);
    document.getElementById(`safe360-tab-${tabs[nextIndex].id}`)?.focus();
  };

  return (
    <section id="safe360" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <span className={styles.brandPill}>FamCare Safe360™</span>
          <h2>
            Every booking.<br />
            <span>360° protected.</span>
          </h2>
          <p className={styles.lede}>
            A complete safety ecosystem that protects your family before, during and after every booking.
          </p>

          <div className={styles.assurances} aria-label="Safe360 assurances">
            {assurances.map(({ icon: Icon, value, label }) => (
              <div className={styles.assurance} key={label}>
                <Icon aria-hidden="true" />
                <div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>
              Book a caregiver <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-label="A FamCare caregiver holding a baby, surrounded by six connected safety pillars">
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.portraitFrame}>
            <Image
              src="/images/safe360-caregiver.png"
              alt="FamCare caregiver holding a smiling baby"
              fill
              sizes="(max-width: 720px) 72vw, (max-width: 1024px) 48vw, 430px"
              className={styles.portrait}
            />
          </div>

          {pillars.map((pillar, index) => (
            <div className={`${styles.orbitNode} ${styles[`node${index + 1}`]}`} key={pillar.name}>
              <span className={styles.nodeNumber}>{index + 1}</span>
              <span className={styles.nodeIcon}>
                <Image src={pillar.src} alt="" width={54} height={54} sizes="42px" />
              </span>
              <strong>{pillar.shortName}<sup>360°</sup></strong>
            </div>
          ))}
        </div>

        <div className={styles.tabsExperience}>
          <div className={styles.tabList} role="tablist" aria-label="Inside the FamCare safety ecosystem">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = index === activeTab;

              return (
                <button
                  type="button"
                  role="tab"
                  id={`safe360-tab-${tab.id}`}
                  aria-controls="safe360-tab-panel"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  key={tab.id}
                >
                  <span className={styles.tabIcon}><Icon aria-hidden="true" /></span>
                  <span className={styles.tabLabel}>{tab.label}</span>
                  <span className={styles.tabShortLabel}>{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div
            id="safe360-tab-panel"
            className={styles.tabPanel}
            role="tabpanel"
            aria-labelledby={`safe360-tab-${active.id}`}
            key={active.id}
          >
            <div className={styles.tabCopy}>
              <span className={styles.tabEyebrow}>{active.eyebrow}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className={styles.outcome}>
                <ShieldCheck aria-hidden="true" />
                <span>{active.outcome}</span>
              </div>
            </div>

            <div className={styles.systemMap} aria-label={`${active.label} capabilities`}>
              <div className={styles.mapLines} aria-hidden="true" />
              <div className={styles.mapCenter}>
                <span>{active.center}</span>
                <small>FamCare</small>
              </div>
              <div className={styles.featureGrid}>
                {active.features.map(({ icon: Icon, title, text }) => (
                  <article className={styles.featureCard} key={title}>
                    <span className={styles.featureIcon}><Icon aria-hidden="true" /></span>
                    <div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                    <Check className={styles.featureCheck} aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
