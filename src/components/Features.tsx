'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Shield, BookOpen, DollarSign, Award, RefreshCcw, Smartphone } from 'lucide-react';
import styles from './Features.module.css';

const storySteps = [
  {
    icon: <Shield size={28} />,
    title: '1. It Starts with Absolute Trust',
    description: "The journey of bringing someone into your home starts with peace of mind. We don't guess - we conduct rigorous background checks, setting a new standard for trust before a caregiver ever meets your family."
  },
  {
    icon: <BookOpen size={28} />,
    title: '2. We Formalize the Informal',
    description: "We realized the casual market left too much to chance. That's why we've built a formally managed supply of caregivers. We treat them as true professionals, ensuring they are engaged, supported, and ready."
  },
  {
    icon: <Award size={28} />,
    title: '3. Mandating Clinical Skill Levels',
    description: "Good intentions aren't enough. We mandate strict training protocols for every professional. We ensure that empathy corresponds beautifully with certified, lifesaving capability."
  },
  {
    icon: <DollarSign size={28} />,
    title: '4. Designing Honest, Fixed Pricing',
    description: "Nothing breaks trust faster than hidden fees. We established transparent, fixed pricing tiers. You'll always know exactly what you are paying for - fair compensation for them, honest pricing for you."
  },
  {
    icon: <RefreshCcw size={28} />,
    title: '5. Eliminating the Churn',
    description: "Children thrive on continuity. We've built in robust backup systems and targeted retention strategies designed to dramatically reduce churn, so your routine stays completely uninterrupted."
  },
  {
    icon: <Smartphone size={28} />,
    title: '6. Empowered by Technology',
    description: "Finally, we tied it all up in a unified app experience. With built-in safety tools and instant communication, you retain absolute oversight and control right in your pocket. The complete FamCare story."
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className="container">
        
        <div className={styles.intro}>
          <motion.h2 
            className="h2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The <span className="text-gradient">FamCare</span> Journey
          </motion.h2>
          <motion.p 
            className={styles.introText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We didn’t just build another app. We meticulously dismantled the risky informal market and built a comprehensive story of care from the ground up. Here is how we guarantee your family's safety.
          </motion.p>
        </div>

        <div className={styles.timelineContainer} ref={containerRef}>
          <div className={styles.timelineLine}>
            <motion.div 
              className={styles.lineFill} 
              style={{ scaleY, transformOrigin: 'top' }}
            />
          </div>
          
          {storySteps.map((step, index) => {
            const isEven = index % 2 !== 0; // 0-indexed, so 1 is even visually 
            
            return (
              <div key={index} className={styles.node}>
                <div className={styles.dummyBox} />
                
                <motion.div 
                  className={styles.centerIcon}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ 
                    scale: 1, 
                    opacity: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(8px)",
                    borderColor: "var(--primary)"
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                
                <motion.div 
                  className={styles.nodeContent}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    boxShadow: "0 8px 32px 0 rgba(20, 184, 166, 0.1)",
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.glassEffect} />
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.description}>{step.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
