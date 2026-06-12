import React, { useEffect, useRef, useState } from 'react';

const chatData = [
  { text: "My mother is here for 3 days i want a physiotherapist for her every morning 👵💪", color: "#FFF9C4", rotate: -5, side: 'left', avatar: 'Felix' },
  { text: "Looking for a top rated Italian chef to host a party for friends. �‍🍳🍝", color: "#FFF9C4", rotate: -2, side: 'left', avatar: 'Dr' },
  { text: "Need to book a last-minute flight to Mumbai. Any deals? ✈️�️", color: "#DCFCE7", rotate: 4, side: 'right', avatar: 'Bandit' },
  { text: "My MIL is here for 3 days and need a physiotherapist every morning. Can you assist. 👵🤝", color: "#FFF9C4", rotate: 3, side: 'left', avatar: 'Aneka' },
  { text: "Can you organize a maid for deep cleaning on Saturday morning? 🧹🧽", color: "#DCFCE7", rotate: -3, side: 'right', avatar: 'Lilith' },
  { text: "4-6 meeting pushed to 6-8. Urgently need someone to babysit for 2 hrs ? 🗓️🧸🆘", color: "#FFF9C4", rotate: 2, side: 'left', avatar: 'George' },
  { text: "Bangalore weather - suddenly raining and my umbrella ditched me. Can someone fix it ? 🌧️☂️🔧", color: "#FFF9C4", rotate: -4, side: 'left', avatar: 'Jasper' },
  { text: "Send a parcel to my friend in Koramangala. 📦🚚", color: "#DCFCE7", rotate: 5, side: 'right', avatar: 'Oliver' },
  { text: "Woke up with a headache, but my dog needs a run. Can you send a dogwalker ? 🤒🐕🏃", color: "#FFF9C4", rotate: -3, side: 'left', avatar: 'Sasha' },
  { text: "Categories: Home Services, Errand Running, Personal Assistance, Pet Care 🏠🏃🧘🐾", color: "#DCFCE7", rotate: 2, side: 'right' },
  { text: "Sudden train trip trip my bag chain is broken ? 🚆🎒⛓️", color: "#DCFCE7", rotate: -5, side: 'right', avatar: 'Leo' },
  { text: "Need a tutor for 10th grade math. 📚✏️", color: "#DCFCE7", rotate: 4, side: 'right' },
  { text: "I have a last-minute event and need an instant makeup artist! Can you send one? 💄✨", color: "#FFF9C4", rotate: -2, side: 'right', avatar: 'Maya' }
];

// Ruleset for mobile vs desktop placement to control overlap and sizing
const PLACEMENT_RULES = {
  mobile: { width: 160, height: 70, gap: 10 },
  desktop: { width: 280, height: 100, gap: 20 }
};

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
  const [scrollProgress, setScrollProgress] = useState(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const rules = isMobile ? PLACEMENT_RULES.mobile : PLACEMENT_RULES.desktop;
  const bubbleW = rules.width;
  const bubbleH = rules.height;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const progress = Math.min(1, scrollY / viewportH);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (placedNotes.length > 0) return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const centerX = screenW / 2;

    const mobileCount = 7;
    const notesToPlace = isMobile ? chatData.slice(0, mobileCount) : chatData;

    const newPlacedNotes = notesToPlace.map((data, i) => {
      // Start positions: Edges for desktop, hidden for mobile
      let startX, startY;
      if (isMobile) {
        startX = centerX - bubbleW / 2;
        startY = screenH + 100; // Below screen
      } else {
        const side = data.side || (i % 2 === 0 ? 'left' : 'right');
        if (side === 'left') {
          // Peek in more (around 75-80% visible)
          startX = -bubbleW * 0.2 + Math.random() * 40;
          startY = (screenH / (notesToPlace.length / 2)) * (i / 2) + 60;
        } else {
          // Peek in more (around 75-80% visible)
          startX = screenW - bubbleW * 0.8 - Math.random() * 40;
          startY = (screenH / (notesToPlace.length / 2)) * (i / 2) + 60;
        }
      }

      // Target positions: Spread layout
      const cols = isMobile ? 1 : 3;
      const colIndex = i % cols;
      const rowIndex = Math.floor(i / cols);

      const gridW = screenW * (isMobile ? 0.9 : 0.95);
      const startGridX = (screenW - gridW) / 2;

      // Calculate available vertical space to stay above chat bar
      // Reduced top margin to fill the "above strip" better
      const topMargin = isMobile ? 80 : 50;
      // Reduced bottom reservation to prevent cutoff at the bottom
      const bottomBound = screenH - 120;
      const availableH = bottomBound - topMargin;
      const numRows = Math.ceil(notesToPlace.length / cols);

      // Ensure vertical spacing is AT LEAST bubble height + gap to prevent overlap
      // Slightly reduced minRowGap to help fit on smaller screens
      const minRowGap = isMobile ? 15 : 20;
      const rowSpacing = Math.max(bubbleH + minRowGap, availableH / (numRows || 1));

      let targetX;
      if (isMobile) {
        // More dramatic side-to-side stagger for mobile
        const side = i % 2 === 0 ? 'left' : 'right';
        const margin = 15;
        if (side === 'left') {
          targetX = margin + Math.random() * 20;
        } else {
          targetX = screenW - bubbleW - margin - Math.random() * 20;
        }
      } else {
        // Spread more on desktop with jitter
        targetX = startGridX + (colIndex * (gridW / cols)) + (Math.random() * 120 - 60);
      }

      let targetY = topMargin + (rowIndex * rowSpacing) + (Math.random() * 10 - 5);

      return {
        id: i,
        data,
        startX,
        startY,
        targetX,
        targetY,
        startRotation: data.rotate || (Math.random() * 20 - 10),
        currentX: startX,
        currentY: startY,
        currentRotation: data.rotate || 0,
        opacity: isMobile ? 0 : 1
      };
    });

    setPlacedNotes(newPlacedNotes);
    notesStateRef.current = newPlacedNotes;
  }, [isMobile]); // Added isMobile to dependencies to re-run on resize if it changes

  useEffect(() => {
    if (placedNotes.length === 0) return;

    let animationFrame;
    const notes = notesStateRef.current;
    const elements = bubblesRef.current;

    const animate = () => {
      const p = scrollProgress; // 0 to 1

      // Use a custom ease for smoother transition
      const easeP = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const el = elements[i];
        if (!el) continue;

        const curX = note.startX + (note.targetX - note.startX) * easeP;
        const curY = note.startY + (note.targetY - note.startY) * easeP;
        const curRot = note.startRotation + (0 - note.startRotation) * easeP;
        const curOpacity = isMobile ? easeP : 1;
        const curScale = isMobile ? 0.8 + 0.2 * easeP : 1;

        el.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${curRot}deg) scale(${curScale})`;
        el.style.opacity = curOpacity;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [placedNotes, scrollProgress, isMobile]); // Added isMobile to dependencies

  const [currentView, setCurrentView] = useState('home');

  if (currentView === 'terms') {
    return <TermsPage onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 relative">
      <SupportChat />
      {/* Hero Section */}
      <div id="hero-pin-container" className="relative h-[250vh]">
        <section id="hero" className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#E2D8CF]/30">
          {/* Background WhatsApp Doodle Pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
              backgroundSize: '400px'
            }}
          ></div>

          <div
            id="main-content"
            className={`center-content absolute inset-0 flex flex-col items-center z-0 pointer-events-auto`}
            style={{
              transform: `translate3d(0, ${-scrollProgress * 250}px, 0)`,
              opacity: 1 - scrollProgress * 3
            }}
          >
            <div className={`text-center max-w-4xl px-4 ${isMobile ? 'mt-auto mb-32' : 'pt-24'}`}>
              <h1
                className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-slate-900 transition-colors duration-500`}
              >
                What Are We <span className="text-indigo-600">Solving</span> For?
              </h1>
              <div
                className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 rounded-full"
              >
                Hyperlocal AI Task Master
              </div>
              <p
                className="text-slate-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium"
              >
                Providing quick and seamless services to your doorstep via WhatsApp. From nannies to errand runners, consider it done.
              </p>
              <div>
                <a href="https://api.whatsapp.com/send?phone=919972678833&text=hi" className="inline-flex items-center justify-center px-10 py-5 bg-indigo-600 text-white rounded-full text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-indigo-500/40">
                  Start Automating
                </a>
              </div>
              <p className="mt-12 text-sm text-slate-400 font-bold">
                Brewed with ☕ in Bangalore
              </p>
            </div >
          </div >

          <div id="bubble-container" className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            {placedNotes.map((note, idx) => (
              <div
                key={note.id}
                ref={el => bubblesRef.current[idx] = el}
                id={`bubble-${note.id}`}
                className={`chat-bubble absolute text-center p-4 h-auto ${note.data.side === 'right' ? 'tail-right' : 'tail-left'}`}
                style={{
                  backgroundColor: note.data.color,
                  width: `${bubbleW}px`,
                  minHeight: `${bubbleH}px`,
                  left: 0,
                  top: 0,
                  transform: `translate3d(${note.startX}px, ${note.startY}px, 0) rotate(${note.startRotation}deg)`,
                  opacity: note.opacity
                }}
              >
                {note.data.avatar && (
                  <div className="absolute -left-10 md:-left-12 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${note.data.avatar}`} className="w-full h-full object-cover" alt="avatar" />
                  </div>
                )}
                <p className="relative z-10 font-bold text-[#1a1a1a] text-sm md:text-base leading-tight">
                  {note.data.text}
                </p>
              </div>
            ))}
          </div>

          {/* WhatsApp Send Message Bar */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white rounded-full shadow-2xl p-2 flex items-center gap-3 z-20 transition-all duration-500 border border-slate-200"
            style={{
              transform: `translate3d(-50%, ${100 - scrollProgress * 100}px, 0)`,
              opacity: scrollProgress
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </div>
            <div className="flex-1 px-4 py-2 bg-slate-50 rounded-full text-slate-400 text-sm font-medium border border-slate-100">
              Type a message...
            </div>
            <div className="flex gap-2 pr-2">
              <div className="w-8 h-8 flex items-center justify-center text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg></div>
            </div>
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
          © Copyright 2025, All Rights Reserved by FAMCARE TECHNOLOGIES PRIVATE LIMITED.
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

    // Smarter bot logic based on product scope
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "I'm the Fixxo AI assistant. I can tell you about our services, pricing, and how the WhatsApp process works. For specific tasks, it's best to chat with us directly on WhatsApp!";

      if (lowerInput.includes('who') || lowerInput.includes('what is fixxo')) {
        response = "Fixxo is your hyperlocal AI task master! We help you manage home tasks like ironing, dog walking, nannies, and gardening with trusted local help, all coordinated through WhatsApp.";
      } else if (lowerInput.includes('service') || lowerInput.includes('what do you do')) {
        response = "Currently, we specialize in 4 core services for personal use: \n1. Ironing at home 👕\n2. Dog walking 🐕\n3. Nannies 👵\n4. Gardening 🌱\nWhich one can I tell you more about?";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('subscription')) {
        response = "Our monthly subscription is designed to be affordable-costing about as much as a single good night out! It covers all coordination and administrative support. Specific service rates (like hourly nanny or dog walking) are extra.";
      } else if (lowerInput.includes('iron')) {
        response = "Our 'Ironing at Home' service brings the help to you. On WhatsApp, we'll just ask for your volume (up to 20, 50, or more clothes) and your preferred time (today, tomorrow, or this week) to get you sorted!";
      } else if (lowerInput.includes('dog') || lowerInput.includes('pet')) {
        response = "Need a dog walker? We'll match you with verified walkers nearby. We just need to know the duration and your preferred time slots to set it up.";
      } else if (lowerInput.includes('nanny') || lowerInput.includes('baby') || lowerInput.includes('child')) {
        response = "We provide trusted childcare for your little ones. Our onboarding flow ensures we understand your specific needs before finding the right verified helper for you.";
      } else if (lowerInput.includes('garden')) {
        response = "Our gardening service handles expert care for your home garden. Whether it's a one-time cleanup or regular maintenance, we've got you covered.";
      } else if (lowerInput.includes('how it works') || lowerInput.includes('process') || lowerInput.includes('onboarding')) {
        response = "It's simple! \n1) You tell us what you need on WhatsApp. \n2) We suggest verified helpers near you. \n3) You pick one, and we handle the coordination. \nReady to get started? Just click 'Start Automating' on the hero section!";
      } else if (lowerInput.includes('area') || lowerInput.includes('city') || lowerInput.includes('where')) {
        response = "Fixxo is currently active in Bengaluru! We're focusing on being the best hyperlocal assistant for Bengaluru residents before expanding to other cities.";
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        response = "Hey there! 👋 I'm Fixxo. I can help you with questions about our home services (Ironing, Gardening, Nannies, and Dog walking) or explain how our WhatsApp bot works. What's on your mind?";
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

