'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    title: 'Baby Care',
    desc: 'Expert care for your littlest ones, from newborns to infants.',
    img: '/images/babysitting.webp',
    subServices: ['Newborn Specialists', 'Sleep Training', 'Feeding Assistance', 'Play & Development'],
    detailedInfo: 'Our experts provide gentle and knowledgeable care tailored to the delicate needs of babies.'
  },
  {
    title: 'Child Care',
    desc: 'Engaging and safe care for toddlers and growing children.',
    img: '/images/childcare.webp',
    subServices: ['Tutoring & Homework', 'Creative Activities', 'Outdoor Play', 'School Pick-ups'],
    detailedInfo: 'Trusted companions and tutors for your child, ensuring a safe and engaging environment.'
  },
  {
    title: 'Elderly Care',
    desc: 'Compassionate support and assistance for your senior family members.',
    img: '/images/elderly.webp',
    subServices: ['Medication Reminders', 'Mobility Assistance', 'Companionship', 'Meal Prep'],
    detailedInfo: 'Dignified, respectful, and compassionate care to empower seniors to live comfortably.'
  },
  {
    title: 'Pet Care',
    desc: 'Professional care, walking, and attention for your furry friends.',
    img: '/images/petcare.webp',
    subServices: ['Dog Walking', 'Pet Sitting', 'Feeding & Grooming', 'Vet Visits'],
    detailedInfo: 'Dedicated animal lovers providing top-tier care and companionship for your pets.'
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Services() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleCardClick = (e: React.MouseEvent, idx: number) => {
    if ((e.nativeEvent as PointerEvent).pointerType === 'touch') {
      setOpenCard(prev => prev === idx ? null : idx);
    }
  };

  return (
    <section id="features" className={`section ${styles.servicesSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="h2">Our <span className="text-gradient">Care Offerings</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto' }}>
            Explore our premium selection of caregiving solutions. Each offering is meticulously tailored to cater to your family's unique safety and developmental needs.
          </p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className={styles.card}
              variants={cardVariants}
              animate={openCard === idx ? 'hover' : undefined}
              whileHover="hover"
              onClick={(e) => handleCardClick(e, idx)}
            >
              <div className={styles.urgencyBadge}>⚡ 10 min</div>
              {/* Background Image Layer */}
              <motion.div
                className={styles.imageLayer} 
                style={{ backgroundImage: `url(${service.img})` }}
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className={styles.overlayGradient}></div>
              </motion.div>

              {/* Default Content (Visible initially) */}
              <motion.div 
                className={styles.contentLayer}
                variants={{
                  initial: { y: 0, opacity: 1 },
                  hover: { y: -20, opacity: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.titleWrapper}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <div className={styles.titleLine}></div>
                </div>
                <p className={styles.desc}>{service.desc}</p>
              </motion.div>

              {/* Reveal Hover Details */}
              <motion.div 
                className={styles.hoverDetails}
                variants={{
                  initial: { y: '100%', opacity: 0 },
                  hover: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className={styles.hoverTitle}>{service.title}</h3>
                <p className={styles.detailedInfo}>{service.detailedInfo}</p>
                
                <div className={styles.subServicesGrid}>
                  {service.subServices.map((sub, i) => (
                    <div key={i} className={styles.subItem}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  className={`btn btn-primary ${styles.bookBtn}`}
                  onClick={e => e.stopPropagation()}
                >
                  Plan Care <ArrowRight size={18}/>
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
