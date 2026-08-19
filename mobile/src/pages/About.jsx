import React from 'react';
import { Shield, Users, Landmark, Award, Milestone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const timelineEvents = [
    { year: '2019', title: 'Company Founded', desc: 'Established by thermal engineers to reduce crop waste in farming hubs.' },
    { year: '2021', title: 'Patented Loop', desc: 'Patented our energy-efficient heat-pump dehydration loop.' },
    { year: '2023', title: 'Cooperative Deployments', desc: 'Deployed cabinets in 15 cooperatives, preserving 500+ tons of crops.' },
    { year: '2026', title: 'Calor Mega Release', desc: 'Released walk-in commercial chambers for large-scale exports.' }
  ];

  return (
    <div className="w-full py-8 px-4 bg-bg min-h-screen">
      <div className="flex flex-col gap-10 max-w-sm mx-auto">
        
        {/* 1. VISION & MISSION HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 text-center"
        >
          <span className="text-[12px] font-bold uppercase text-accent tracking-wider">
            Engineering Better Yields
          </span>
          <h1 className="text-3xl font-black font-outfit text-primary-text leading-tight">
            About CalorTech
          </h1>
          <p className="text-base text-primary-text font-semibold">
            We engineer high-efficiency, robust dehumidification systems that bridge the gap between harvests and markets.
          </p>
          <p className="text-sm text-secondary-text">
            Our simple-to-operate commercial dehydrators empower farmers and cooperatives to eliminate crop waste, preserve nutrients, and maximize yield value.
          </p>
        </motion.div>

        {/* Interactive Wireframe Column (Mobile scaled) */}
        <div className="flex justify-center items-center h-[200px] perspective-[800px] select-none opacity-80">
          <div className="w-[100px] h-[140px] relative transform-style-3d wireframe-box-animate">
            <div className="absolute w-[100px] h-[140px] border border-accent/40 bg-accent/5 transform rotate-y-0 translate-z-[50px] flex items-center justify-center text-[8px] text-accent/80 font-mono">FRONT</div>
            <div className="absolute w-[100px] h-[140px] border border-accent/40 bg-accent/5 transform rotate-y-180 translate-z-[50px] flex items-center justify-center text-[8px] text-accent/80 font-mono">BACK</div>
            <div className="absolute w-[100px] h-[140px] border border-accent/40 bg-accent/5 transform rotate-y-[-90deg] translate-z-[50px]"></div>
            <div className="absolute w-[100px] h-[140px] border border-accent/40 bg-accent/5 transform rotate-y-[90deg] translate-z-[50px]"></div>
            <div className="absolute w-[100px] h-[100px] border border-accent/40 bg-accent/5 transform rotate-x-[90deg] translate-z-[50px]"></div>
            <div className="absolute w-[100px] h-[100px] border border-accent/40 bg-accent/5 transform rotate-x-[-90deg] translate-z-[90px]"></div>
          </div>
        </div>

        {/* 2. WHY HUMIDITY CONTROL MATTERS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 rounded-3xl bg-brand-light border border-border shadow-sm flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold font-outfit text-primary-text">
              Why Humidity Matters
            </h2>
            <p className="text-sm text-secondary-text">
              Traditional drying uses high heat, damaging crop nutrients. CalorTech uses low-temp **Heat-Pump Dehumidification** to safely extract moisture.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-surface border border-border rounded-2xl flex gap-4">
              <Shield className="w-6 h-6 text-accent shrink-0" />
              <div>
                <strong className="text-sm text-primary-text block font-bold">100% Nutrient Retention</strong>
                <span className="text-xs text-secondary-text">Preserves vitamins, color, and aromas.</span>
              </div>
            </div>
            <div className="p-4 bg-surface border border-border rounded-2xl flex gap-4">
              <Award className="w-6 h-6 text-accent shrink-0" />
              <div>
                <strong className="text-sm text-primary-text block font-bold">Longer Shelf Stability</strong>
                <span className="text-xs text-secondary-text">Maintains a stable 5% moisture baseline.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. QUALITY & STANDARDS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="text-center flex flex-col gap-2 mb-2">
            <h2 className="text-2xl font-extrabold font-outfit text-primary-text">Standards</h2>
            <p className="text-sm text-secondary-text">Built using food-grade materials.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="min-w-[240px] snap-center p-5 rounded-2xl bg-surface border border-border shadow-sm text-center flex flex-col gap-3 items-center">
              <Users className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-primary-text font-outfit">Local Support</h3>
              <p className="text-sm text-secondary-text">On-site training and 24/7 hotline.</p>
            </div>
            <div className="min-w-[240px] snap-center p-5 rounded-2xl bg-surface border border-border shadow-sm text-center flex flex-col gap-3 items-center">
              <Landmark className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-bold text-primary-text font-outfit">Eco Certified</h3>
              <p className="text-sm text-secondary-text">Zero ozone depletion potential.</p>
            </div>
          </div>
        </motion.div>

        {/* 4. COMPANY TIMELINE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8 border-t border-border pt-8"
        >
          <h2 className="text-2xl font-extrabold font-outfit text-primary-text text-center">
            Our Journey
          </h2>

          <div className="relative flex flex-col gap-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border before:z-0">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative pl-10 z-10 flex flex-col gap-1">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-bg border-[3px] border-accent flex items-center justify-center shadow-sm">
                  <Milestone className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <span className="text-accent text-sm font-black">{event.year}</span>
                  <h3 className="text-lg font-bold text-primary-text font-outfit">{event.title}</h3>
                </div>
                <p className="text-sm text-secondary-text">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
