import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight, FaLeaf, FaCheckCircle } from 'react-icons/fa';
import { GiFallingLeaf } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function ApplicationModal({ application, allApplications, onClose, onSelectRelated }) {
  const app = application;
  const related = app && app.related ? allApplications?.find(a => a.title === app.related) : null;

  return (
    <AnimatePresence>
      {app && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-primary/80 p-4"
        >
          <motion.div
            layoutId={app.layoutId || `app-card-${app.title}`}
            key={app.title}
            transition={{ layout: { duration: 0.35, ease: 'easeInOut' } }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-[#1a1a1a] shadow-soft flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="max-h-[85svh] w-full overflow-y-auto"
            >
              <div className="relative bg-gradient-to-br from-primary to-secondary px-5 pb-5 pt-6 text-center text-white">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <FaTimes className="text-sm" />
                </button>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">CALOR MEGA Performance</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{app.title}</h3>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-xl text-success">
                      <FaLeaf />
                    </span>
                    <span className="text-[11px] font-semibold text-primary dark:text-paper">Fresh</span>
                  </div>
                  <FaArrowRight className="text-lg text-accent" />
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-xl text-accent">
                      <GiFallingLeaf />
                    </span>
                    <span className="text-[11px] font-semibold text-primary dark:text-paper">Dehydrated</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-primary/5 dark:bg-white/5 p-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary/50 dark:text-paper/50">
                      Moisture Reduction
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1.5 font-display text-lg font-bold text-primary dark:text-paper">
                      {app.moistureBefore}% <FaArrowRight className="text-[10px] text-accent" /> {app.moistureAfter}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/5 dark:bg-white/5 p-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary/50 dark:text-paper/50">
                      Shelf Life Extension
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1 font-display text-base font-bold text-primary dark:text-paper">
                      {app.shelfBefore} <FaArrowRight className="text-[10px] text-accent shrink-0" /> {app.shelfAfter}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold text-primary dark:text-paper">Possible Products</p>
                    <ul className="space-y-1.5">
                      {app.products.map((p) => (
                        <li key={p} className="flex items-center gap-1.5 text-[11px] leading-snug text-primary/75 dark:text-paper/75">
                          <FaCheckCircle className="text-accent shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold text-primary dark:text-paper">Business Benefits</p>
                    <ul className="space-y-1.5">
                      {app.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-1.5 text-[11px] leading-snug text-primary/75 dark:text-paper/75">
                          <FaCheckCircle className="text-accent shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {related && (
                  <div className="mt-6 border-t border-primary/10 dark:border-white/10 pt-5">
                    <p className="mb-2 text-xs font-bold text-primary dark:text-paper">Explore Related</p>
                    <button
                      onClick={() => onSelectRelated(related)}
                      className="rounded-full bg-primary/5 dark:bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-primary dark:text-paper hover:bg-accent hover:text-primary transition-colors"
                    >
                      {related.title}
                    </button>
                  </div>
                )}

                <Button as={Link} to="/quote" variant="accent" className="mt-8 w-full justify-center">
                  Can CALOR MEGA Process My {app.title}?
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
