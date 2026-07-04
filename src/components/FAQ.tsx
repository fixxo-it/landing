'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { fadeUp, viewportOnce } from '@/lib/motion';
import styles from './FAQ.module.css';

type QA = { q: string; a: string };
type Category = { label: string; icon: string; items: QA[] };

const CATEGORIES: Category[] = [
  {
    label: 'Trust & Safety',
    icon: '🛡️',
    items: [
      {
        q: 'How are FamCare caregivers verified?',
        a: "Every FamCare caregiver goes through a rigorous multi-step verification process before becoming bookable. This includes application screening, two rounds of interviews, Aadhaar and identity verification, address verification, criminal background checks, reference checks, mandatory classroom and practical training, and a comprehensive skill assessment. Only candidates who successfully complete every stage are certified and deployed to serve families.",
      },
      {
        q: 'Is my baby safe with a FamCare caregiver?',
        a: 'Yes. Beyond verification, active bookings are supported by audio monitoring, geo-fencing, and periodic field audits — backed by a dedicated field operations team on standby.',
      },
      {
        q: "What happens if there's an issue during a booking?",
        a: 'FamCare actively monitors every booking in real time. If any issue arises, our operations team can intervene immediately. Parents can also report concerns through the app or use the SOS button for instant support.',
      },
    ],
  },
  {
    label: 'Caregiver Training',
    icon: '🎓',
    items: [
      {
        q: 'What training do caregivers go through before joining?',
        a: "All caregivers complete structured training covering child safety, hygiene protocols, emergency response, and age-appropriate care practices before they're allowed to take bookings.",
      },
      {
        q: 'Do caregivers have any medical or nursing background?',
        a: 'Many of our caregivers come from nursing and healthcare backgrounds, giving them a stronger foundation in child health, hygiene, and emergency handling than typical caregiving platforms.',
      },
      {
        q: 'Is training a one-time process, or ongoing?',
        a: "Training isn't just onboarding — caregivers go through periodic refreshers and skill assessments to stay updated on best practices and maintain FamCare's quality standards.",
      },
      {
        q: "What happens if a caregiver doesn't meet training standards?",
        a: "Caregivers who don't clear the required skill assessments aren't onboarded to take bookings. Ongoing performance is also tracked through field audits.",
      },
    ],
  },
  {
    label: 'Booking & Scheduling',
    icon: '📅',
    items: [
      {
        q: 'How quickly can I book a caregiver?',
        a: 'In serviceable areas, you can book a trusted caregiver in as little as 10 minutes, or schedule one in advance for a later time or date.',
      },
      {
        q: 'Can I request the same caregiver again?',
        a: 'Yes. If your preferred caregiver is available, you can request them again for future bookings.',
      },
      {
        q: 'What if I need to cancel or reschedule?',
        a: 'You can cancel or reschedule per our cancellation policy. For instant bookings, caregiver allocation starts immediately, so different terms may apply.',
      },
      {
        q: 'What types of care can I book?',
        a: 'Quick Baby Sitting, After-School Care, and Toddler Companion services — with more categories planned as we expand.',
      },
    ],
  },
  {
    label: 'Caregivers',
    icon: '👩‍🍼',
    items: [
      {
        q: 'Are caregivers employees or gig workers?',
        a: "FamCare directly employs its caregivers — they aren't part of a gig marketplace. This means consistent training, accountability, and quality standards.",
      },
    ],
  },
  {
    label: 'Pricing & Payments',
    icon: '💳',
    items: [
      {
        q: 'How is pricing determined?',
        a: 'Pricing depends on service type, duration, and time of booking. Rates are shown upfront in the app before you confirm.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'FamCare accepts UPI, cards, and popular digital wallets — all handled securely within the app.',
      },
    ],
  },
  {
    label: 'Service Area',
    icon: '📍',
    items: [
      {
        q: 'Where is FamCare currently available?',
        a: 'We currently operate in select areas of Whitefield, Bengaluru, with new areas being added regularly.',
      },
      {
        q: "My apartment complex isn't listed — can I still get FamCare?",
        a: "Reach out to us at support@famcare.co.in and we'll work on bringing FamCare to your community.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategoryClick = (i: number) => {
    setActiveCategory(i);
    setOpenIndex(0);
  };

  const handleQuestionClick = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="eyebrow">Got questions?</div>
          <h2 className="h2">Frequently asked questions</h2>
          <p className={styles.subhead}>
            Everything you need to know about safety, training, bookings, and more.
          </p>
        </motion.div>

        <motion.div
          className={styles.tabs}
          role="tablist"
          aria-label="FAQ categories"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              role="tab"
              aria-selected={activeCategory === i}
              className={`${styles.tab} ${activeCategory === i ? styles.tabActive : ''}`}
              onClick={() => handleCategoryClick(i)}
            >
              <span className={styles.tabIcon} aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={styles.list}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {CATEGORIES[activeCategory].items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className={styles.item}>
                  <button
                    className={styles.question}
                    onClick={() => handleQuestionClick(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <motion.span
                      className={styles.chevron}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className={styles.answerWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className={styles.answer}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
