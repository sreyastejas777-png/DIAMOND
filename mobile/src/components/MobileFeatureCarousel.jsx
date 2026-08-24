import { motion } from 'framer-motion';
import { whyChooseUs } from '../data/whyChooseUs';

export default function MobileFeatureCarousel() {
  return (
    <div className="w-full flex flex-col gap-3.5 lg:hidden px-2 py-4 overflow-hidden">
      {whyChooseUs.slice(0, 5).map((feature, idx) => {
        const Icon = feature.icon;
        // Alternating slide direction: Even items from left (-60px), Odd items from right (60px)
        const xOffset = idx % 2 === 0 ? -60 : 60;
        
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: xOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ 
              duration: 0.6, 
              delay: idx * 0.1,
              type: "spring",
              stiffness: 70,
              damping: 15
            }}
            className="flex flex-row items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-secondary/10 dark:border-white/10 shadow-sm shadow-secondary/5"
          >
            {/* Icon Box */}
            <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20 shadow-inner">
              <Icon className="w-6 h-6 text-accent" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <h3 className="font-display text-[15px] font-bold tracking-tight text-primary dark:text-paper leading-tight mb-1">
                {feature.title}
              </h3>
              <p className="text-[12px] leading-snug text-primary/70 dark:text-paper/70">
                {feature.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
