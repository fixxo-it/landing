import React, { useEffect, useRef, useState } from 'react';

const chatData = [
  { text: "My mother is here for 3 days i want a physiotherapist for her every morning 👵💪", color: "#FFF9C4", rotate: -5, side: 'left', icon: '❓', avatar: 'Felix' },
  { text: "My MIL is here for 3 days and need a physiotherapist every morning. Can you assist. 👵🤝", color: "#FFF9C4", rotate: 3, side: 'left', avatar: 'Aneka' },
  { text: "Looking for a top rated Italian chef to host a party for friends. 👨‍🍳🍝", color: "#FFF9C4", rotate: -2, side: 'right', icon: '👨‍🍳', avatar: 'Dr' },
  { text: "Need to book a last-minute flight to Mumbai. Any deals? ✈️🎟️", color: "#DCFCE7", rotate: 4, side: 'left', icon: '💼', avatar: 'Bandit' },
  { text: "Can you organize a maid for deep cleaning on Saturday morning? 🧹🧽", color: "#DCFCE7", rotate: -3, side: 'right', icon: '🧹', avatar: 'Lilith' },
  { text: "4-6 meeting pushed to 6-8. Urgently need someone to babysit for 2 hrs ? 🗓️🧸🆘", color: "#FFF9C4", rotate: 2, side: 'left', icon: '⏰', avatar: 'George' },
  { text: "Bangalore weather - suddenly raining and my umbrella ditched me. Can someone fix it ? 🌧️☂️🔧", color: "#FFF9C4", rotate: -4, side: 'left', icon: '🌧️', avatar: 'Jasper' },
  { text: "Send a parcel to my friend in Koramangala. 📦🚚", color: "#DCFCE7", rotate: 5, side: 'right', icon: '📦', avatar: 'Oliver' },
  { text: "Woke up with a headache, but my dog needs a run. Can you send a dogwalker ? 🤒🐕🏃", color: "#FFF9C4", rotate: -3, side: 'left', icon: '🐕', avatar: 'Sasha' },
  { text: "Categories: Home Services, Errand Running, Personal Assistance, Pet Care 🏠🏃🧘🐾", color: "#DCFCE7", rotate: 2, side: 'left', icon: '🏠' },
  { text: "Sudden train trip trip my bag chain is broken ? 🚆🎒⛓️", color: "#DCFCE7", rotate: -5, side: 'right', icon: '🎒', avatar: 'Leo' },
  { text: "Need a tutor for 10th grade math. 📚✏️", color: "#DCFCE7", rotate: 4, side: 'left', icon: '📚' },
  { text: "I have a last-minute event and need an instant makeup artist! Can you send one? 💄✨", color: "#FFF9C4", rotate: -2, side: 'right', icon: '💄', avatar: 'Maya' }
];

const services = [
  { id: "01", title: "Ironing at home", desc: "Professional ironing services right at your doorstep.", icon: "👕" },
  { id: "02", title: "Dog walker", desc: "Reliable walkers to keep your furry friends active and happy.", icon: "🐕" },
  { id: "03", title: "Nanny", desc: "Trusted childcare for your little ones whenever you need it.", icon: "👵" },
  { id: "04", title: "Gardener", desc: "Expert care to keep your home garden lush and beautiful.", icon: "🌱" },
  { id: "05", title: "Home Services", desc: "Deep cleaning, plumbing, and electrical assistance.", icon: "🏠" },
  { id: "06", title: "Errand Running", desc: "Deliveries, porter services, and personal tasks handled.", icon: "🏃" },
  { id: "07", title: "Travel & Admin", desc: "Bookings, reminders, and document management.", icon: "📂" },
  { id: "08", title: "Social & Lifestyle", desc: "Gifting, event hosting, and restaurant reservations.", icon: "🎉" }
];

function App() {
  const containerRef = useRef(null);
  const [placedNotes, setPlacedNotes] = useState([]);
  const notesStateRef = useRef([]);
  const bubblesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, inWindow: false });

  // Physics constants
  const centerThreshold = 800;
  const bubbleW = 280;
  const bubbleH = 100;
  const maxOverlapRatio = 0.12;
  const bubbleArea = bubbleW * bubbleH;

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, inWindow: true };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (placedNotes.length > 0) return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const centerX = screenW / 2;
    const centerY = screenH / 2;
    const margin = 20;
    const minX = margin;
    const maxX = screenW - bubbleW - margin;
    const minY = margin;
    const maxY = screenH - bubbleH - margin;

    const capacity = (screenW * screenH) / (bubbleArea * 1.2);
    const targetCount = Math.min(Math.floor(capacity), chatData.length * 2);
    const placedRects = [];
    const newPlacedNotes = [];

    const getIntersectionArea = (r1, r2) => {
      const xOverlap = Math.max(0, Math.min(r1.x + r1.w, r2.x + r2.w) - Math.max(r1.x, r2.x));
      const yOverlap = Math.max(0, Math.min(r1.y + r1.h, r2.y + r2.h) - Math.max(r1.y, r2.y));
      return xOverlap * yOverlap;
    };

    for (let i = 0; i < targetCount; i++) {
      let bestX, bestY;
      let placed = false;

      for (let attempt = 0; attempt < 150; attempt++) {
        let testX, testY;
        if (i < 4) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 200;
          testX = centerX + Math.cos(angle) * r - bubbleW / 2;
          testY = centerY + Math.sin(angle) * r - bubbleH / 2;
        } else {
          testX = minX + Math.random() * (maxX - minX);
          testY = minY + Math.random() * (maxY - minY);
        }

        const candidate = { x: testX, y: testY, w: bubbleW, h: bubbleH };
        let maxOverlapFound = 0;
        for (const existing of placedRects) {
          const overlap = getIntersectionArea(candidate, existing);
          const ratio = overlap / bubbleArea;
          if (ratio > maxOverlapFound) maxOverlapFound = ratio;
        }

        if (maxOverlapFound <= maxOverlapRatio) {
          bestX = testX;
          bestY = testY;
          placed = true;
          placedRects.push(candidate);
          break;
        }
      }

      if (placed) {
        const data = chatData[i % chatData.length];
        const noteCX = bestX + bubbleW / 2;
        const noteCY = bestY + bubbleH / 2;
        const vecX = noteCX - centerX;
        const vecY = noteCY - centerY;
        const dist = Math.sqrt(vecX * vecX + vecY * vecY) || 1;
        const angle = Math.atan2(vecY, vecX);

        newPlacedNotes.push({
          id: i,
          data,
          baseX: bestX,
          baseY: bestY,
          rotation: data.rotate + (Math.random() * 6 - 3),
          flyAngle: angle,
          distFromCenterAtStart: dist,
          currentX: bestX,
          currentY: bestY,
          currentRotation: data.rotate
        });
      }
    }

    setPlacedNotes(newPlacedNotes);
    notesStateRef.current = newPlacedNotes.map(n => ({ ...n }));
  }, []);

  useEffect(() => {
    if (placedNotes.length === 0) return;

    let animationFrame;
    const notes = notesStateRef.current;
    const elements = bubblesRef.current;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const animate = () => {
      const scrollY = window.scrollY;
      const heroScrollDistance = window.innerHeight;
      const heroScrollProgress = Math.min(1, scrollY / heroScrollDistance);
      const scrollPush = heroScrollProgress * 1200;

      const dx = mouseRef.current.x - centerX;
      const dy = mouseRef.current.y - centerY;
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);

      let mouseScatterProgress = 0;
      if (distFromCenter < centerThreshold) {
        mouseScatterProgress = Math.pow(1 - (distFromCenter / centerThreshold), 2);
      }

      const holeRadius = (750 * mouseScatterProgress) + scrollPush;

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const el = elements[i];
        if (!el) continue;

        const cx = note.baseX + bubbleW / 2;
        const cy = note.baseY + bubbleH / 2;
        const vx = cx - centerX;
        const vy = cy - centerY;
        const dist = Math.sqrt(vx * vx + vy * vy) || 1;

        let targetX = note.baseX;
        let targetY = note.baseY;

        if (dist < holeRadius) {
          const pushFactor = (holeRadius - dist);
          const invDist = 1 / dist;
          const nx = vx * invDist;
          const ny = vy * invDist;

          targetX = note.baseX + nx * pushFactor;
          targetY = note.baseY + ny * pushFactor;

          if (mouseScatterProgress > 0) {
            targetX += nx * 50 * mouseScatterProgress;
            targetY += ny * 50 * mouseScatterProgress;
          }
        }

        const targetRotation = note.rotation + (mouseScatterProgress * 45 * (i % 2 === 0 ? 1 : -1));

        note.currentX += (targetX - note.currentX) * 0.12;
        note.currentY += (targetY - note.currentY) * 0.12;
        note.currentRotation += (targetRotation - note.currentRotation) * 0.12;

        el.style.transform = `translate3d(${note.currentX}px, ${note.currentY}px, 0) rotate(${note.currentRotation}deg)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [placedNotes]);

  const [currentView, setCurrentView] = useState('home');

  if (currentView === 'terms') {
    return <TermsPage onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 relative">
      <SupportChat />
      {/* Hero Section */}
      <div id="hero-pin-container" className="relative h-[200vh]">
        <section id="hero" className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div id="main-content" className="center-content absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-auto">
            <div className="text-center max-w-2xl px-4">
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 leading-[0.9] tracking-tight mb-12">
                What Are We Solving For?
              </h1>
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 rounded-full">
                Hyperlocal AI Task Master
              </div>
              <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Providing quick and seamless services to your doorstep via WhatsApp. From nannies to errand runners, consider it done.
              </p>
              <a href="https://api.whatsapp.com/send?phone=919972678833&text=hi" className="inline-flex items-center justify-center px-8 py-4 bg-[#4F46E5] text-white rounded-full text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-xl shadow-indigo-500/20">
                Start Automating
              </a>
              <div className="mt-12 flex items-center justify-center -space-x-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i === 1 ? 'Felix' : i === 2 ? 'Aneka' : i === 3 ? 'Dr' : 'Bandit'}`} className="w-full h-full object-cover" alt="avatar" />
                  </div >
                ))}
              </div >
              <p className="mt-4 text-sm text-slate-400 font-medium">Brewed with ☕ in Bangalore</p>
            </div >
          </div >
          <div id="bubble-container" className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            {placedNotes.map((note, idx) => (
              <div
                key={note.id}
                ref={el => bubblesRef.current[idx] = el}
                id={`bubble-${note.id}`}
                className={`chat-bubble absolute text-center p-4 w-[280px] h-auto min-h-[80px] ${note.data.side === 'right' ? 'tail-right' : 'tail-left'}`}
                style={{
                  backgroundColor: note.data.color,
                  left: 0,
                  top: 0,
                  transform: `translate3d(${note.baseX}px, ${note.baseY}px, 0) rotate(${note.rotation}deg)`
                }}
              >
                {note.data.avatar && (
                  <div className="absolute -left-10 md:-left-12 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${note.data.avatar}`} className="w-full h-full object-cover" alt="avatar" />
                  </div>
                )}
                {note.data.icon && (
                  <div className={`bubble-icon ${note.data.side === 'right' ? '-right-8 -top-4' : '-right-8 -bottom-4'}`}>
                    {note.data.icon}
                  </div>
                )}
                <p className="relative z-10 font-bold text-[#1a1a1a] text-sm md:text-base leading-tight" style={{ fontFamily: 'General Sans, sans-serif' }}>
                  {note.data.text}
                </p>
              </div>
            ))}
          </div>
        </section >
      </div >

      {/* Marquee */}
      < div className="py-12 bg-indigo-50 overflow-hidden whitespace-nowrap border-y border-indigo-100" >
        <div className="inline-block animate-marquee">
          {[1, 2, 3, 4].map(idx => (
            <React.Fragment key={idx}>
              <span className="text-2xl md:text-3xl font-bold text-indigo-900 mx-8">Great experience! 👍🌟 Highly recommend.</span>
              <span className="text-2xl md:text-3xl font-bold text-indigo-300 mx-8">/</span>
            </React.Fragment>
          ))}
        </div>
      </div >

      {/* Services Section */}
      < section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            How can <img src="/logo.png" alt="Fixxo" className="h-[1.6em] inline-block align-middle mx-4 rotate-2" /> help you?
          </h2>
          <p className="text-xl text-slate-600">Our monthly subscription costs as much as a good night out...<br />because it feels like one.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-x-16 md:gap-y-20 max-w-7xl mx-auto px-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section >

      {/* Phone Mockup Section - PINNED */}
      < div id="phone-pin-container" className="relative h-[250vh] bg-slate-900" >
        <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">You're too important.</h2>
            <p className="text-2xl text-indigo-200">WhatsApp us. Do more.</p>
          </div>

          <div className="relative z-10 mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden mb-12 transition-transform duration-500 scale-90 md:scale-100">
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

            <WhatsAppChat />
          </div>
        </section>
      </div>


      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Frequently asked questions</h2>
        <div className="space-y-4">
          <FAQItem
            question="How does the subscription work?"
            answer="We offer a monthly plan that covers all our coordination and administrative services. You trigger requests via WhatsApp, and our team handles the rest. Setup is instant."
          />
          <FAQItem
            question="Is my data secure?"
            answer="Absolutely. We use enterprise-grade encryption for all communications and documents. Your personal data is never shared with third parties without explicit consent."
          />
          <FAQItem
            question="What cities do you cover?"
            answer="Currently, our physical task services are exclusive to Bangalore. However, our digital and administrative support is available globally."
          />
        </div>

        <div className="mt-16 text-center bg-indigo-50 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
          <p className="text-slate-600 mb-6">Can’t find the answer you are looking for? Please chat to our friendly team.</p>
          <a href="https://api.whatsapp.com/send?phone=919972678833&text=hi" className="text-[#4F46E5] font-semibold hover:underline">Get in touch &rarr;</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="Fixxo Logo" className="h-[1.5em] object-contain" />
            </div>
            <p className="text-slate-500 max-w-xs">We’re your go-to personal assistant on WhatsApp handling everyday tasks so you don’t have to.</p>
          </div>
          <div className="flex space-x-12 text-sm text-slate-600">
            <div className="flex flex-col space-y-3">
              <span className="font-bold text-slate-900">Company</span>
              <button onClick={() => setCurrentView('home')} className="hover:text-indigo-600 text-left">Home</button>
              <button onClick={() => setCurrentView('home')} className="hover:text-indigo-600 text-left">About</button>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="font-bold text-slate-900">Help</span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-indigo-600 text-left">Customer Support</button>
              <button onClick={() => setCurrentView('terms')} className="hover:text-indigo-600 text-left">Terms & Conditions</button>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="font-bold text-slate-900">Social</span>
              <a href="https://api.whatsapp.com/send?phone=919972678833&text=hi" className="hover:text-indigo-600">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          © Copyright 2025, All Rights Reserved by Swad Hotels & Restaurants Private Limited.
        </div>
      </footer >
    </div >
  );
}

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const tilt = (Math.random() * 12) - 6;
  const offX = (Math.random() * 40) - 20;
  const offY = (Math.random() * 40) - 20;
  const bgColor = chatData[index % chatData.length].color;

  return (
    <div
      ref={cardRef}
      className={`service-card flex flex-col p-8 w-64 h-64 md:w-72 md:h-72 shadow-xl transition-all duration-700 ease-out hover:scale-110 active:scale-95 cursor-default ${isVisible ? 'visible' : ''}`}
      style={{
        transform: isVisible ? `rotate(${tilt}deg) translate(${offX}px, ${offY}px)` : `translateY(30px)`,
        backgroundColor: bgColor,
        transitionDelay: `${index * 120}ms`
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-4xl block opacity-80">{service.icon}</span>
        <span className="text-slate-900/10 font-black text-2xl">{service.id}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{service.title}</h3>
      <p className="text-slate-800/60 font-medium leading-relaxed text-sm">{service.desc}</p>
    </div>
  );
}

function WhatsAppChat() {
  const [visibleMessages, setVisibleMessages] = useState(1);
  const chatContainerRef = useRef(null);

  const messages = [
    { type: 'left', text: 'Welcome back Aryan 👋\nWhat can I help you with?', time: '2:03 PM' },
    { type: 'right', text: 'Book me a nanny for 2 hours', time: '2:04 PM' },
    { type: 'left', text: "Okay, what's your location?", time: '2:04 PM' },
    { type: 'right', text: 'Bellandur', time: '2:05 PM' },
    { type: 'left', text: 'Got it! A nanny is available:\n🕒 Time: 3:00 PM - 5:00 PM\n👤 Experience: 4 years\n🟢 Background: Verified\n⭐ Rating: 4.8\n💰 Rate: ₹350/hour\n\nShould I confirm the booking?', time: '2:06 PM' },
    { type: 'right', text: 'Yes confirm', time: '2:06 PM' },
    { type: 'left', text: '✅ Booking confirmed!\nThe nanny will arrive by 2:50 PM.\nBooking ID: #NN5527', time: '2:07 PM' },
    { type: 'right', text: 'Great, thanks!', time: '2:07 PM' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('phone-pin-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      // Start with 1 message, then pop rest
      const count = Math.max(1, Math.floor(scrollProgress * (messages.length + 1)));
      setVisibleMessages(Math.min(messages.length, count));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      // Find the last visible message element
      const container = chatContainerRef.current;
      const visibleElements = container.querySelectorAll('.msg-bubble');
      const lastVisible = visibleElements[visibleMessages - 1];

      if (lastVisible) {
        // Calculate scroll to keep the last message at the bottom of the visible area
        const targetScroll = lastVisible.offsetTop + lastVisible.offsetHeight - container.offsetHeight + 16; // 16 for padding/breathing room
        container.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [visibleMessages]);

  return (
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#e5ddd5] flex flex-col text-slate-900 text-left font-sans shadow-inner">
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] p-3 pt-6 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="FIXXO avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1">
              FIXXO
              <svg className="w-3 h-3 text-blue-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className="text-[10px] opacity-80">Verified Account</div>
          </div>
        </div>
        <div className="flex gap-3 pr-2">
          <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
          <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
          <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </div>
      </div>

      {/* Chat Area - Scroll disabled manually, automated via JS */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-hidden p-3 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat transition-all duration-500"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg-bubble flex ${m.type === 'right' ? 'justify-end' : 'justify-start'} transition-all duration-300 ${i < visibleMessages ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          >
            <div className={`max-w-[85%] p-2 rounded-lg shadow-sm relative text-xs leading-relaxed ${m.type === 'right' ? 'bg-[#dcf8c6]' : 'bg-white'}`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className="text-[9px] text-gray-500 text-right mt-1 flex justify-end gap-1 uppercase">
                {m.time}
                {m.type === 'right' && (
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>
          <div className="text-xs text-gray-400 flex-1">Type a message</div>
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#075e54] flex items-center justify-center text-white">
          <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </div>
      </div>
    </div>
  );
}


function FAQItem({ question, answer }) {
  return (
    <details className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm open:shadow-md transition-all">
      <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-slate-800">
        {question}
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </summary>
      <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
        {answer}
      </p>
    </details>
  );
}

function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! How can I help you today? I can answer questions about Fixxo services and pricing.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Basic bot logic
    setTimeout(() => {
      let response = "I'm a basic assistant. For complex tasks, please chat with us on WhatsApp for a human response!";
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        response = "Our Basic plan starts at Rs. 499/month. We also have Premium (999) and Plus (1499) plans for more hyperlocal tasks!";
      } else if (lowerInput.includes('nanny') || lowerInput.includes('dog')) {
        response = "Yes! We provide Nannies (Rs. 399/hr), Dog Walkers (Rs. 299/hr), and even laundry services at home.";
      }
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 h-[500px] flex flex-col border border-slate-100 overflow-hidden animate-fadeIn">
          <div className="bg-[#4F46E5] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
              <span className="font-bold">Fixxo Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#4F46E5] text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all"
            />
            <button type="submit" className="bg-[#4F46E5] text-white p-2 rounded-full hover:scale-110 transition-transform">
              <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#4F46E5] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
        >
          <div className="absolute -top-12 right-0 bg-white text-slate-800 px-4 py-2 rounded-xl text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
            Need help? Chat with us!
          </div>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
}

function TermsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 p-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Fixxo Logo" className="h-[1.5em] object-contain" />
        </div>
        <button onClick={onBack} className="text-slate-600 hover:text-[#4F46E5] font-bold flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </button>
      </nav>

      <main className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-slate-900 mb-12">Terms of Service</h1>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using Fixxo, you agree to be bound by these terms and all applicable laws and regulations. If you do not agree, you are prohibited from using the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use of Service</h2>
            <p>Our service allows you to request hyperlocal tasks and automation via WhatsApp. You are responsible for maintaining the security of your communication and for all activities that occur under your request.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Privacy and Data</h2>
            <p>We take your privacy seriously. Your data is encrypted and handled according to our Privacy Policy. We do not share your personal information without explicit consent in accordance with Bangalore jurisdictional laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <p>Fixxo shall not be held liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of Karnataka, India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore.</p>
          </section>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col items-center">
          <p className="text-slate-400 text-sm mb-6 text-center">Last updated: February 2025</p>
          <button onClick={onBack} className="bg-[#4F46E5] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-indigo-500/20">
            Accept and Go Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

