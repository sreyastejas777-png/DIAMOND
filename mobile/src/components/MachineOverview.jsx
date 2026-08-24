import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Sliders,
  Lock,
  Layers,
  Grid,
  ShieldCheck,
  Wind,
  Gauge,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import heroDryer from '../assets/images/hero-dryer.jpeg';
import Hotspot from './Hotspot';
import SectionHeading from './SectionHeading';
import { hotspots } from '../data/hotspots';

const iconMap = {
  'control-panel': Sliders,
  'door-lock': Lock,
  'trays-left': Layers,
  'trays-right': Grid,
  'insulation': ShieldCheck,
  'airflow': Wind,
  'sensors': Gauge,
  'heating': Flame,
};

export default function MachineOverview() {
  const [activeId, setActiveId] = useState(hotspots[0].id);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const activeIndex = hotspots.findIndex((h) => h.id === activeId);
  const activeHotspot = activeIndex !== -1 ? hotspots[activeIndex] : hotspots[0];
  const ActiveIcon = iconMap[activeHotspot.id] || Sparkles;

  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.4 });

  useEffect(() => {
    let timer;
    if (isInView && !hasInteracted) {
      // Show hint after 3 seconds of idle time in view
      timer = setTimeout(() => setShowHint(true), 3000);
    } else {
      setShowHint(false);
    }
    return () => clearTimeout(timer);
  }, [isInView, hasInteracted]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect values
  const yParallaxHeading = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yParallaxShowcase = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handlePrev = () => {
    setHasInteracted(true);
    setShowHint(false);
    const nextIdx = (activeIndex - 1 + hotspots.length) % hotspots.length;
    setActiveId(hotspots[nextIdx].id);
  };

  const handleNext = () => {
    setHasInteracted(true);
    setShowHint(false);
    const nextIdx = (activeIndex + 1) % hotspots.length;
    setActiveId(hotspots[nextIdx].id);
  };

  const handleHotspotClick = (id) => {
    setHasInteracted(true);
    setShowHint(false);
    setActiveId(id);
  };

  return (
    <section ref={sectionRef} className="relative mx-auto flex min-h-[85svh] lg:min-h-[100svh] w-full max-w-[1600px] min-[1600px]:max-w-[98vw] flex-col justify-center px-4 py-8 sm:py-14 sm:px-6 md:px-8 overflow-visible">
      <motion.div style={{ y: yParallaxHeading }}>
        <SectionHeading
          eyebrow="Inside the Machine"
          title="Interactive Engineering Explorer"
          className="mb-4 sm:mb-6"
        />
      </motion.div>

      {/* SHOWCASE WRAPPER */}
      <motion.div style={{ y: yParallaxShowcase }} className="relative mx-auto mt-2 w-full flex flex-col items-center overflow-visible">
        {/* CENTRALIZED PHOTO FRAME */}
        <div
          ref={imageRef}
          className="group relative aspect-[2.15/1] w-full max-w-[680px] lg:max-w-[740px] xl:max-w-[820px] 2xl:max-w-[880px] min-[2000px]:max-w-[980px] min-[2300px]:max-w-[1100px] rounded-3xl border-2 border-accent/30 bg-slate-950 p-1 shadow-2xl backdrop-blur-md dark:border-white/15 overflow-hidden"
        >
          {/* Inner Image Container with rounded corners */}
          <div className="relative h-full w-full overflow-hidden rounded-[22px]">
            <img
              src={heroDryer}
              alt="CALOR MEGA Industrial Food Dehydrator with feature hotspots"
              className="h-full w-full object-cover object-left select-none"
              loading="eager"
            />

            {/* Ambient Lighting Gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

            {/* ALL 8 GLITCH-FREE HOTSPOT PINS */}
            {hotspots.map((h, i) => (
              <Hotspot
                key={h.id}
                {...h}
                index={i + 1}
                isActive={h.id === activeId}
                onClick={() => handleHotspotClick(h.id)}
              />
            ))}

            {/* Idle Interaction Hint Popup */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-slate-900 shadow-[0_4px_20px_rgba(245,158,11,0.5)] border border-amber-400"
                >
                  <span className="h-2 w-2 rounded-full bg-slate-900 animate-ping" />
                  <span>Tap any &ldquo;+&rdquo; pin to explore!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* QUICK FEATURE SELECTOR PILLS (Horizontal Scroll on Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 w-full max-w-3xl px-4 sm:px-6"
        >
          <div className="flex overflow-x-auto pb-4 pt-1 gap-3 snap-x scrollbar-hide w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {hotspots.map((h) => {
              const Icon = iconMap[h.id] || Sparkles;
              const isCurrent = h.id === activeId;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => handleHotspotClick(h.id)}
                  className={`flex-shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 border shadow-sm snap-start ${
                    isCurrent
                      ? 'border-accent bg-accent text-primary shadow-md ring-2 ring-accent/30'
                      : 'border-secondary/20 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-primary/85 dark:text-paper/85'
                  }`}
                >
                  <Icon className="h-4 w-4 text-secondary dark:text-accent" />
                  <span className="whitespace-nowrap">{h.title.replace(' (Left Bay)', '').replace(' (Right Bay)', '')}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* DETAILS BOX BELOW PILLS */}
        <div className="z-40 relative -mt-2 sm:mt-2 mb-28 sm:mb-16 mx-auto w-full max-w-lg px-4 sm:px-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative rounded-2xl border-2 border-accent/40 bg-white/95 dark:border-accent/40 dark:bg-[#151518]/95 p-2.5 sm:p-4.5 shadow-2xl backdrop-blur-xl ring-1 ring-black/10 dark:ring-white/10"
            >
              {/* Header: Category Badge & Steppers */}
              <div className="flex items-center justify-between border-b border-secondary/15 dark:border-white/10 pb-1.5 sm:pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-accent/20 text-accent dark:bg-accent/30 shadow-sm">
                    <ActiveIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-accent">
                    {activeHotspot.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-primary/50 dark:text-paper/50 mr-1">
                    {String(activeIndex + 1).padStart(2, '0')}/{String(hotspots.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-secondary/20 dark:border-white/10 bg-white/70 dark:bg-white/5 text-primary dark:text-paper hover:bg-accent hover:text-primary transition-colors"
                    aria-label="Previous feature"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-secondary/20 dark:border-white/10 bg-white/70 dark:bg-white/5 text-primary dark:text-paper hover:bg-accent hover:text-primary transition-colors"
                    aria-label="Next feature"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="my-1.5 sm:my-2">
                <h4 className="font-display text-[13px] sm:text-base font-bold text-primary dark:text-paper leading-snug">
                  {activeHotspot.title}
                </h4>
                {activeHotspot.subtitle && (
                  <p className="text-[11px] font-semibold text-accent mt-0.5">
                    {activeHotspot.subtitle}
                  </p>
                )}
                <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-primary/75 dark:text-paper/75">
                  {activeHotspot.description}
                </p>
              </div>

              {/* Mini Specifications Chips */}
              {activeHotspot.specs && (
                <div className="mt-1.5 sm:mt-2 pt-1 sm:pt-1.5 border-t border-secondary/10 dark:border-white/5 space-y-1">
                  {activeHotspot.specs.slice(0, 2).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between rounded-md bg-secondary/5 dark:bg-white/[0.03] px-2.5 py-1 text-[11px]"
                    >
                      <span className="flex items-center gap-1 font-medium text-primary/70 dark:text-paper/70">
                        <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                        {spec.label}
                      </span>
                      <span className="font-bold text-primary dark:text-paper">
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
