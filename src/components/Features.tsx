'use client';

import { motion } from 'framer-motion';
import { Shield, BookOpen, DollarSign, Award, RefreshCcw, Smartphone, ShieldCheck } from 'lucide-react';
import styles from './Features.module.css';

const features = [
  {
    icon: <Shield size={32} strokeWidth={1.5} />,
    title: 'Standardized Trust',
    description: 'Comprehensive background checks for every professional, ensuring complete peace of mind for your family.'
  },
  {
    icon: <BookOpen size={32} strokeWidth={1.5} />,
    title: 'Formal Supply',
    description: 'Avoid the informal market. We provide professionally managed caregivers with extensive and verified training.'
  },
  {
    icon: <DollarSign size={32} strokeWidth={1.5} />,
    title: 'Fixed Pricing',
    description: 'Transparent, standardized pricing tiers with zero hidden fees, unpredictable hikes, or surprises.'
  },
  {
    icon: <Award size={32} strokeWidth={1.5} />,
    title: 'Skill Level',
    description: 'Mandatory clinical and behavioral training protocols guaranteeing the highest care standards.'
  },
  {
    icon: <RefreshCcw size={32} strokeWidth={1.5} />,
    title: 'Reduced Churn',
    description: 'Reliable backup systems and structured continuity to ensure your care schedule is never interrupted.'
  },
  {
    icon: <Smartphone size={32} strokeWidth={1.5} />,
    title: 'Technical Features',
    description: 'A unified app experience with integrated safety tools, real-time monitoring, and seamless communication.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Features() {
  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className={`container ${styles.layout}`}>
        
        {/* Left Sticky Column */}
        <div className={styles.stickyLeft}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.badge}>
              <ShieldCheck size={16} />
              The Full-Stack Model
            </div>
            <h2 className="h2">Why Choose <span className="text-gradient">fam.care?</span></h2>
            <p className={styles.headerText}>
              We've moved away from the informal market to build a robust, structured full-stack caregiving model. 
              Our focus is uncompromised safety, formal accountability, and institutional quality.
            </p>
            
            <div className={styles.mainVisual}>
              <Shield size={100} color="var(--primary)" strokeWidth={1} style={{ opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '2px dashed var(--primary)', animation: 'spin 20s linear infinite', opacity: 0.3 }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Scrollable Column */}
        <motion.div 
          className={styles.rightContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} className={styles.featureRow} variants={itemVariants}>
              <div className={styles.iconContainer}>
                {feature.icon}
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
