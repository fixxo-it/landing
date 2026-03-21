'use client';

import { motion } from 'framer-motion';
import { Shield, BookOpen, DollarSign, Award, RefreshCcw, Smartphone } from 'lucide-react';
import styles from './Features.module.css';

const features = [
  {
    icon: <Shield size={28} />,
    title: 'Standardized Trust',
    description: 'Comprehensive background checks for complete peace of mind.'
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Formal Supply',
    description: 'Professionally managed caregivers with extensive training.'
  },
  {
    icon: <DollarSign size={28} />,
    title: 'Fixed Pricing',
    description: 'Transparent pricing tiers with no hidden fees or surprises.'
  },
  {
    icon: <Award size={28} />,
    title: 'Skill Level',
    description: 'Mandatory training protocols ensuring the highest care standards.'
  },
  {
    icon: <RefreshCcw size={28} />,
    title: 'Reduced Churn',
    description: 'Reliable backup and continuity to ensure uninterrupted care.'
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Technical Features',
    description: 'Unified app experience with built-in safety tools and monitoring.'
  }
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Features() {
  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="h2">Why Choose <span className="text-gradient">fam.care?</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            We've revolutionized caregiving by building a full-stack model that prioritizes your family's safety above all else.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} className={styles.featureCard} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
