'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  { image: '/images/babysitting.png', title: 'Baby Sitting', desc: 'Short-term playful care for your little ones.' },
  { image: '/images/nanny.png', title: 'Nanny', desc: 'Consistent, loving care to support your daily routine.' },
  { image: '/images/night-nanny.png', title: 'Night Nanny', desc: 'Expert overnight care so you can get the rest you need.' },
  { image: '/images/oil-massage.png', title: 'Oil Massage', desc: 'Traditional and soothing massages by trained experts.' },
  { image: '/images/zappa.png', title: 'Zappa / Postpartum', desc: 'Specialized Japa care for mother and newborn wellness.' },
  { image: '/images/petcare.png', title: 'Pet Sitting', desc: 'Loving care and attention for your pets while you are away.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Services() {
  return (
    <section id="services" className={`section ${styles.servicesSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="h2">Our <span className="text-gradient">Care Offerings</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            From newborn support to educational guidance, we offer specialized care tailored to your family's unique needs.
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
            <motion.div key={idx} className={styles.serviceCard} variants={itemVariants}>
              <div className={styles.imageWrapper}>
                <img src={service.image} alt={service.title} className={styles.serviceImage} />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.desc}</p>
              <div className={styles.actionArea}>
                <button className="btn btn-outline" style={{ width: '100%', padding: '10px', fontSize: '1rem', display: 'flex', justifyContent: 'center' }}>
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
