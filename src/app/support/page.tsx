'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import styles from './Support.module.css';

const faqs = [
  {
    question: "How do I book a caregiver?",
    answer: "Please download the FamCare app using the link provided on our website - available on both the Apple App Store and Google Play Store. Once installed, log in using your mobile number via OTP, enter your care requirements and preferred time, and confirm your booking. It's that simple!"
  },
  {
    question: "How do you ensure the safety of caregivers?",
    answer: "Safety is our top priority. Every FamCare professional undergoes a rigorous 5-step vetting process, including criminal background checks, professional reference verification, and in-person interviews."
  },
  {
    question: "What geographical areas do you serve?",
    answer: "We are currently operational in only Whitefield, Bangalore. We are rapidly expanding to more cities across India."
  },
  {
    question: "How do I cancel or reschedule a booking?",
    answer: "You can cancel or reschedule a booking directly within the FamCare app. To cancel, navigate to your upcoming bookings and select the cancellation option. Cancellations must be made at least 45 minutes prior to the scheduled booking time. For rescheduling, simply choose a new date and time from the app."
  },
  {
    question: "What is your pricing?",
    answer: "Our pricing is transparent and standardized based on the type of care (Baby, Child, Elder, or Pet) and the duration of the service. You will see the exact quote before confirming your booking."
  }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button className={styles.faqQuestion} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  return (
    <main className={styles.supportMain}>
      <Navbar />
      
      <section className={styles.supportHero}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.heroContent}
          >
            <h1 className="h1">Support & Contact</h1>
            <p>We're here to help you with any questions about our caregiving services.</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactContainer}>
            <motion.div 
              className={styles.contactCard}
              whileHover={{ y: -5 }}
            >
              <div className={styles.iconCircle}>
                <Mail size={32} />
              </div>
              <h3>Email Us</h3>
              <p>For support, partnerships, or general inquiries.</p>
              <a href="mailto:support@famcare.co.in" className={styles.contactLink}>
                support@famcare.co.in
              </a>
            </motion.div>

            <motion.div 
              className={styles.contactCard}
              whileHover={{ y: -5 }}
            >
              <div className={styles.iconCircle}>
                <Phone size={32} />
              </div>
              <h3>Call Us</h3>
              <p>For immediate assistance and support.</p>
              <a href="tel:+919986905105" className={styles.contactLink}>
                +91 99869 05105
              </a>
            </motion.div>


          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqHeader}>
            <h2 className="h2">Frequently Asked Questions</h2>
            <p>Find quick answers to common questions about FamCare.</p>
          </div>
          
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
