import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaArrowRight, FaPlayCircle, FaChevronDown, FaCheckCircle, FaThermometerHalf } from 'react-icons/fa';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import TestimonialCard from '../components/TestimonialCard';
import Newsletter from '../components/Newsletter';
import MachineOverview from '../components/MachineOverview';
import ParticlesBackground from '../components/ParticlesBackground';
import GradientBlobs from '../components/GradientBlobs';
import TrustMarquee from '../components/TrustMarquee';
import FloatingBadge from '../components/FloatingBadge';
import FAQAccordion from '../components/FAQAccordion';
import slideMachine from '../assets/images/slide-machine.svg';
import slideTrays from '../assets/images/slide-trays.svg';
import slideControl from '../assets/images/slide-control.svg';
import { stats } from '../data/stats';
import { whyChooseUs } from '../data/whyChooseUs';
import { applications } from '../data/applications';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faqs';

const homeCategories = ['All Featured', 'Fruits', 'Spices and Herbs'];

export default function Home() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Featured');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const displayedCrops = activeCategory === 'All Featured'
    ? applications.slice(0, 4)
    : applications.filter(a => a.category === activeCategory).slice(0, 4);

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-start bg-gradient-to-br from-transparent to-secondary/5 pt-8 pb-12 px-4 min-h-[90svh]">
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
        <GradientBlobs variant="hero" />
        <ParticlesBackground />

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center text-center w-full relative z-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-tight tracking-tight text-primary">
            Premium Drying <br />
            <span className="text-accent">Solutions.</span>
          </h1>
          <p className="mt-4 text-sm text-primary-text/80 px-2">
            Industrial-grade moisture control engineered to eliminate food waste and unlock agricultural profitability.
          </p>
          
          <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
            <Button as={Link} to="/quote" variant="primary" icon={FaArrowRight} className="w-full justify-center">
              Get Quote
            </Button>
            <Button as={Link} to="/technology" variant="outline" icon={FaPlayCircle} className="w-full justify-center">
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Image Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[320px] mt-10 z-10"
        >
          <div className="animate-float">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="relative aspect-square w-full min-w-0 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-border/50 bg-white"
            >
              <SwiperSlide className="flex items-center justify-center">
                <img src={slideMachine} alt="Machine" className="h-full w-full object-cover p-4" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <img src={slideTrays} alt="Trays" className="h-full w-full object-cover p-4" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <img src={slideControl} alt="Control" className="h-full w-full object-cover p-4" />
              </SwiperSlide>
            </Swiper>
            <FloatingBadge icon={FaCheckCircle} label="Food Grade" className="-left-2 -top-4 shadow-lg scale-90" delay={0.1} />
            <FloatingBadge icon={FaThermometerHalf} label="Precision" className="-right-4 bottom-4 shadow-lg scale-90" delay={0.3} />
          </div>
        </motion.div>
        
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-12 text-secondary-text">
          <FaChevronDown size={20} />
        </motion.div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="py-2">
        <TrustMarquee />
      </div>

      {/* STATS */}
      <section className="px-4 py-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {stats.map((s, idx) => (
             <StatCard key={s.label} {...s} index={idx} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 py-10 bg-surface border-y border-border/50 overflow-hidden">
        <SectionHeading
          eyebrow="The Difference"
          title="Why CALOR MEGA"
          className="mb-6 text-center"
        />
        
        {/* Horizontal Scrolling Icon Menu */}
        <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-4 px-4 scrollbar-hide">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === activeFeatureIndex;
            return (
              <button
                key={item.title}
                onClick={() => setActiveFeatureIndex(i)}
                className={`snap-center flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 w-[100px] h-[100px] border shadow-sm ${
                  isActive
                    ? 'bg-accent/10 border-accent/40 shadow-md ring-2 ring-accent/20 scale-105'
                    : 'bg-white border-border/50 hover:bg-secondary/5 text-secondary-text'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-1.5 transition-colors ${isActive ? 'bg-accent text-primary shadow-sm' : 'bg-secondary/10 text-primary/70'}`}>
                   <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold text-center leading-tight line-clamp-2 px-1 ${isActive ? 'text-primary' : 'text-primary-text'}`}>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Feature Display Box */}
        <div className="relative mt-2 w-full max-w-sm mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatureIndex}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full bg-white rounded-3xl p-6 border-2 border-accent/20 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-primary shadow-lg flex-shrink-0">
                    {(() => {
                        const ActiveIcon = whyChooseUs[activeFeatureIndex].icon;
                        return <ActiveIcon className="w-6 h-6" />;
                    })()}
                  </div>
                  <h3 className="font-display font-bold text-[17px] text-primary leading-tight">
                    {whyChooseUs[activeFeatureIndex].title}
                  </h3>
                </div>
                <p className="text-secondary-text text-sm leading-relaxed font-medium">
                  {whyChooseUs[activeFeatureIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
        </div>
      </section>

      {/* APPLICATIONS OVERVIEW */}
      <section className="px-4 py-10">
        <SectionHeading eyebrow="Versatility" title="Featured Crops" className="mb-6 text-center" />
        
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {homeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-accent text-primary shadow-md scale-105' 
                  : 'bg-white/50 border border-border text-primary-text/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {displayedCrops.map((app, i) => (
              <ApplicationCard key={app.title} application={app} index={i} onSelect={setSelectedApp} />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center">
          <Button as={Link} to="/applications" variant="accent" className="w-full max-w-xs justify-center">
            View All
          </Button>
        </div>
      </section>

      {/* MACHINE OVERVIEW (Mobile Friendly) */}
      <div className="bg-white/40 py-8">
        <MachineOverview />
      </div>

      {/* TESTIMONIALS */}
      <section className="px-4 py-10 bg-surface">
        <SectionHeading eyebrow="Farmers Trust Us" title="Testimonials" className="mb-6 text-center" />
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {testimonials.map((t, idx) => (
            <div key={t.name} className="min-w-[280px] snap-center">
              <TestimonialCard {...t} index={idx} />
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-10">
        <SectionHeading eyebrow="Q & A" title="FAQs" className="mb-6 text-center" />
        <FAQAccordion items={faqs} />
      </section>

      {/* NEWSLETTER */}
      <section className="px-4 pb-20 pt-10">
        <Newsletter />
      </section>

      <ApplicationModal application={selectedApp} onClose={() => setSelectedApp(null)} onSelectRelated={setSelectedApp} />
    </div>
  );
}
