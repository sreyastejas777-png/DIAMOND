import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import { galleryCategories, galleryItems } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = (id) => {
    const index = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => setLightboxIndex((lightboxIndex + 1) % filtered.length);
  const showPrev = () => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);

  return (
    <section className="mx-auto w-full px-4 py-8 bg-bg min-h-screen">
      <SectionHeading
        eyebrow="See It In Action"
        title="Gallery"
        subtitle="A closer look at the machine and produce."
        className="text-center"
      />

      <div className="my-6 flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`snap-center shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors border ${
              activeCategory === cat
                ? 'bg-accent text-primary border-accent'
                : 'bg-white/50 border-border text-primary-text/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 2) * 0.1 }}
            onClick={() => openLightbox(item.id)}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-sm bg-white"
          >
            <img src={item.image} alt={item.caption} className="w-full aspect-[4/5] sm:aspect-square object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3 pt-10">
              <p className="text-left text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[110] bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-white/80 text-sm font-medium">
                {lightboxIndex + 1} / {filtered.length}
              </span>
              <button
                onClick={closeLightbox}
                className="text-2xl text-white/80 hover:text-white p-2"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div 
              className="relative w-full flex-1 flex items-center justify-center overflow-hidden touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filtered[lightboxIndex].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].caption}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center gap-6 bg-gradient-to-t from-black/90 to-transparent z-[110]" onClick={e => e.stopPropagation()}>
               <p className="text-center text-sm font-medium text-white px-4">
                 {filtered[lightboxIndex].caption}
               </p>
               <div className="flex items-center gap-12">
                 <button onClick={showPrev} className="text-2xl text-white/80 p-4 border border-white/20 rounded-full active:bg-white/10">
                   <FaChevronLeft />
                 </button>
                 <button onClick={showNext} className="text-2xl text-white/80 p-4 border border-white/20 rounded-full active:bg-white/10">
                   <FaChevronRight />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
