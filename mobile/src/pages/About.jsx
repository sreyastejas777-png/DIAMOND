import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, CheckCircle2, User, Building2, Calendar, BookOpen, PenTool, Layout, FileText, PhoneCall } from 'lucide-react';

export default function About() {
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
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="w-full pt-8 pb-32 px-4 bg-bg min-h-screen">
      <div className="flex flex-col gap-16 max-w-sm mx-auto">
        
        {/* 1. HERO & COMPANY PROFILE */}
        <motion.div 
          className="flex flex-col gap-4 text-center"
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

          <div className="flex flex-col gap-3 mt-4 text-left">
            <div className="p-4 bg-surface border border-border rounded-2xl shadow-soft flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <strong className="block text-primary-text text-sm mb-0.5">Established</strong>
                <span className="text-secondary-text text-xs">March 12, 2026</span>
              </div>
            </div>
            <div className="p-4 bg-surface border border-border rounded-2xl shadow-soft flex items-start gap-3">
              <Building2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <strong className="block text-primary-text text-sm mb-0.5">Inaugurated By</strong>
                <span className="text-secondary-text text-xs">Dr. Arunkumar (Former Director, IHRD)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. VISION & MISSION */}
        <div className="flex flex-col gap-6">
          <motion.div 
            className="p-5 rounded-3xl bg-brand-light border border-accent/20 shadow-soft"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <Lightbulb className="w-8 h-8 text-accent mb-3" />
            <h2 className="text-2xl font-extrabold font-outfit text-primary-text mb-2">Our Vision</h2>
            <p className="text-[13px] text-secondary-text leading-relaxed">
              To emerge as a pioneer in student-led industrial engineering by developing cutting-edge machinery and advancing research-driven solutions that bridge academic innovation with global industrial standards.
            </p>
          </motion.div>

          <motion.div 
            className="p-5 rounded-3xl bg-brand-light border border-accent/20 shadow-soft"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <Target className="w-8 h-8 text-accent mb-3" />
            <h2 className="text-2xl font-extrabold font-outfit text-primary-text mb-2">Our Mission</h2>
            <p className="text-[13px] text-secondary-text leading-relaxed">
              To design and build high-performance industrial machinery through practical innovation under the IHRD "Earn While Learn" framework, empowering engineering talent while delivering reliable, market-ready equipment and research solutions to industry partners.
            </p>
          </motion.div>
        </div>
        {/* NEW SECTION: WEBSITE STRUCTURE (PROPOSED SITE ARCHITECTURE) */}
        <div className="flex flex-col gap-8 pt-6 border-t border-border/50">
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
        </div>

        {/* NEW SECTION: TECHNICAL & DESIGN REQUIREMENTS */}
        <div className="flex flex-col gap-8 pt-6 border-t border-border/50">
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
        </div>

        {/* 3. TEAM HIERARCHY & LEADERSHIP */}
        <div className="flex flex-col gap-8 pt-6 border-t border-border/50">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text">
              Leadership
            </h2>
            <p className="text-sm text-secondary-text">
              The dedicated team driving innovation under the IHRD framework.
            </p>
          </div>

          <div className="flex flex-col gap-4">
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
