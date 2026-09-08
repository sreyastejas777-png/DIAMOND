import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, CheckCircle2, User, Building2, Calendar, BookOpen, PenTool, Layout, FileText, PhoneCall } from 'lucide-react';

export default function About() {
  const { scrollY } = useScroll();
  
  // Parallax transforms for sections
  const yHero = useTransform(scrollY, [0, 1000], [0, 40]);
  const yVision = useTransform(scrollY, [0, 1500], [0, -60]);
  const yStructure = useTransform(scrollY, [0, 2000], [0, 50]);
  const ySpecs = useTransform(scrollY, [0, 2500], [0, -40]);
  
  // Parallax for background decorative orbs
  const yBg1 = useTransform(scrollY, [0, 2000], [0, 300]);
  const yBg2 = useTransform(scrollY, [0, 2000], [0, -200]);
  const yBg3 = useTransform(scrollY, [0, 2000], [0, 150]);

  const team = [
    { name: 'Manoj KG', role: 'Faculty In-Charge', desc: 'Institutional oversight and academic mentorship', icon: BookOpen },
    { name: 'Ananthan PS', role: 'Team CEO', desc: 'Strategic leadership and operational execution', icon: User },
    { name: 'Midhun Mohan', role: 'Technical Designer', desc: 'Machinery design, prototyping, and technical specifications', icon: PenTool },
    { name: 'Swaroop S', role: 'Sales & Supply Coordinator', desc: 'Supply chain, client outreach, and vendor logistics', icon: Building2 },
    { name: 'Aparna SK', role: 'Documentation Head', desc: 'Compliance, technical reporting, and corporate documentation', icon: CheckCircle2 }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="w-full pt-4 pb-32 px-4 bg-bg min-h-screen relative overflow-clip">
      
      {/* Background Parallax Orbs */}
      <motion.div style={{ y: yBg1 }} className="absolute top-20 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
      <motion.div style={{ y: yBg2 }} className="absolute top-[30%] -right-32 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      <motion.div style={{ y: yBg3 }} className="absolute bottom-40 left-10 w-64 h-64 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex flex-col gap-16 max-w-sm mx-auto relative z-10">
        
        {/* 1. HERO & COMPANY PROFILE */}
        <motion.div 
          className="flex flex-col gap-3 text-center min-h-[85vh] justify-center pb-12"
          {...fadeUp}
        >
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 drop-shadow-sm">
            IHRD "Earn While Learn" Initiative
          </span>
          <h1 className="text-4xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-500 to-blue-600 dark:from-slate-200 dark:via-slate-400 dark:to-blue-400 drop-shadow-sm pb-1">
            INNOVA TECH
          </h1>
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary-text to-secondary-text leading-relaxed font-bold">
            Industrial Machinery Manufacturing & Applied R&D
          </p>

          <div className="flex flex-col gap-4 mt-5 text-left">
            {/* Unified Company Milestone Plaque */}
            <motion.div 
              className="relative w-full rounded-3xl bg-surface border border-border shadow-skeuo-out overflow-hidden"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="p-5 border-b border-border/50 flex items-center gap-4 relative z-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 shadow-inner">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-secondary-text font-bold mb-1">Established</span>
                  <strong className="text-[15px] font-black text-primary-text leading-tight">March 12, 2026</strong>
                </div>
              </div>

              <div className="p-5 flex items-center gap-4 relative z-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 shadow-inner">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-secondary-text font-bold mb-1">Inaugurated By</span>
                  <strong className="text-[15px] font-black text-primary-text leading-tight">Dr. Arunkumar</strong>
                  <span className="text-[11px] text-secondary-text mt-0.5">Former Director, IHRD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 2. VISION & MISSION */}
        <motion.div style={{ y: yVision }} className="flex flex-col gap-10 mt-12 overflow-hidden py-4 px-2">
          
          {/* VISION BOX */}
          <motion.div 
            className="relative p-6 rounded-3xl bg-surface border border-border shadow-skeuo-out overflow-hidden"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
            <Lightbulb className="w-8 h-8 text-accent mb-3 relative z-10" />
            <h2 className="text-2xl font-extrabold font-outfit text-primary-text mb-2 relative z-10">Our Vision</h2>
            <p className="text-[13px] text-secondary-text leading-relaxed relative z-10">
              To emerge as a pioneer in student-led industrial engineering by developing cutting-edge machinery and advancing research-driven solutions that bridge academic innovation with global industrial standards.
            </p>
          </motion.div>

          {/* MISSION BOX */}
          <motion.div 
            className="relative p-6 rounded-3xl bg-surface border border-border shadow-skeuo-out overflow-hidden"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
            <Target className="w-8 h-8 text-accent mb-3 relative z-10" />
            <h2 className="text-2xl font-extrabold font-outfit text-primary-text mb-2 relative z-10">Our Mission</h2>
            <p className="text-[13px] text-secondary-text leading-relaxed relative z-10">
              To design and build high-performance industrial machinery through practical innovation under the IHRD "Earn While Learn" framework, empowering engineering talent while delivering reliable, market-ready equipment and research solutions to industry partners.
            </p>
          </motion.div>
        </motion.div>
        {/* NEW SECTION: WEBSITE STRUCTURE (PROPOSED SITE ARCHITECTURE) */}
        <motion.div style={{ y: yStructure }} className="flex flex-col gap-8 pt-6 border-t border-border/50">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text">
              Website Structure
            </h2>
            <p className="text-sm text-secondary-text">
              Proposed Site Architecture
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-2"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-primary-text border-l-4 border-accent pl-3">Home</h3>
              <p className="text-secondary-text text-sm leading-relaxed">Hero section featuring the launch milestone (Inaugurated by Dr. Arunkumar under IHRD), primary core capabilities, and rapid contact access.</p>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-2"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-primary-text border-l-4 border-accent pl-3">About Us</h3>
              <p className="text-secondary-text text-sm leading-relaxed">Background on the company's inception, the IHRD Earn While Learn initiative, vision, mission, and team structure.</p>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-2"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-primary-text border-l-4 border-accent pl-3">Machinery & R&D</h3>
              <p className="text-secondary-text text-sm leading-relaxed">Portfolio of machinery products, custom fabrication capabilities, technical design specs, and ongoing research projects.</p>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-2"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-primary-text border-l-4 border-accent pl-3">Team & Mentorship</h3>
              <p className="text-secondary-text text-sm leading-relaxed">Dedicated section showcasing the leadership team and institutional guidance.</p>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-2"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold text-primary-text border-l-4 border-accent pl-3">Contact & Inquiries</h3>
              <p className="text-secondary-text text-sm leading-relaxed">Inquiry form for sales, supply coordination, and technical collaborations.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* NEW SECTION: TECHNICAL & DESIGN REQUIREMENTS */}
        <motion.div style={{ y: ySpecs }} className="flex flex-col gap-8 pt-12 mt-2 border-t border-border/50">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text">
              Technical Specs
            </h2>
            <p className="text-sm text-secondary-text">
              The foundational pillars of our methodology.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-3"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit text-primary-text mb-1">Industrial Aesthetics</h3>
                <p className="text-secondary-text text-sm leading-relaxed">Clean, industrial layouts designed with dark slate, metallic silver, and energetic blue accents.</p>
              </div>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-3"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit text-primary-text mb-1">Responsive Platforms</h3>
                <p className="text-secondary-text text-sm leading-relaxed">Mobile-responsive ecosystems with fast-loading media galleries for CAD models.</p>
              </div>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-3"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit text-primary-text mb-1">Documentation</h3>
                <p className="text-secondary-text text-sm leading-relaxed">Comprehensive, downloadable PDF spec sheets rigorously managed by our department.</p>
              </div>
            </motion.div>

            <motion.div
              className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-3"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit text-primary-text mb-1">Streamlined Inquiries</h3>
                <p className="text-secondary-text text-sm leading-relaxed">Direct contact routing to the Sales & Supply team ensuring rapid turnarounds.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. TEAM HIERARCHY & LEADERSHIP */}
        <div className="flex flex-col pt-6 border-t border-border/50 relative">
          
          <div className="sticky top-16 z-30 bg-bg pt-4 pb-2 text-center flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text">
              Leadership
            </h2>
            <p className="text-sm text-secondary-text">
              The dedicated team driving innovation under the IHRD framework.
            </p>
            <div className="absolute top-full left-0 right-0 h-10 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {team.map((member, idx) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-5 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-3"
                  initial={fadeUp.initial}
                  whileInView={fadeUp.whileInView}
                  viewport={fadeUp.viewport}
                  transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-outfit text-primary-text mb-1">{member.name}</h3>
                    <span className="text-xs font-black uppercase tracking-wider text-accent block mb-2">
                      {member.role}
                    </span>
                    <p className="text-secondary-text text-sm leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
