import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import { galleryItems as staticGalleryItems } from '../data/gallery';
import { client } from '../sanityClient';

export default function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = activeCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const query = `*[_type == "gallery"]{
          title,
          "images": images[]{
            "id": _key,
            "url": asset->url,
            "caption": alt
          }
        }`;
        const data = await client.fetch(query);
        
        if (data && data.length > 0) {
          let fetchedImages = [];
          let fetchedCategories = ['All'];

          data.forEach(doc => {
            const catName = doc.title || 'Uncategorized';
            if (!fetchedCategories.includes(catName)) {
              fetchedCategories.push(catName);
            }
            if (doc.images && doc.images.length > 0) {
              doc.images.forEach(img => {
                fetchedImages.push({
                  id: img.id,
                  image: img.url,
                  caption: img.caption || 'Gallery Image',
                  category: catName
                });
              });
            }
          });

          setCategories(fetchedCategories);
          setAllImages(fetchedImages);
        } else {
          // Fallback to static data if no sanity document exists
          setAllImages(staticGalleryItems);
          const staticCats = ['All', ...new Set(staticGalleryItems.map(i => i.category).filter(Boolean))];
          setCategories(staticCats);
        }
      } catch (error) {
        console.error("Error fetching gallery from Sanity:", error);
        setAllImages(staticGalleryItems);
        // Extract unique categories from static fallback data if it has any, otherwise just 'All'
        const staticCats = ['All', ...new Set(staticGalleryItems.map(i => i.category).filter(Boolean))];
        setCategories(staticCats);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const openLightbox = (id) => {
    const index = images.findIndex((g) => g.id === id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => setLightboxIndex((lightboxIndex + 1) % images.length);
  const showPrev = () => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 min-h-screen">
      <SectionHeading
        eyebrow="See It In Action"
        title="Gallery"
        subtitle="A closer look at the machine, its chamber, control panel and the produce it preserves."
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="mb-10 flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-accent text-primary'
                      : 'bg-white dark:bg-white/5 text-primary/70 dark:text-paper/70 hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 mt-4">
          {images.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(item.id)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-soft"
            >
              <img src={item.image} alt={item.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-primary/0 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <FaSearchPlus className="mb-2 text-white" />
                <p className="text-left text-sm font-medium text-white">{item.caption}</p>
              </div>
            </motion.button>
          ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 text-3xl text-white/80 hover:text-white"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 text-3xl text-white/70 hover:text-white md:left-10"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <motion.img
              key={images[lightboxIndex].id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              src={images[lightboxIndex].image}
              alt={images[lightboxIndex].caption}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-soft"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 text-3xl text-white/70 hover:text-white md:right-10"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/80">
              {images[lightboxIndex].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
