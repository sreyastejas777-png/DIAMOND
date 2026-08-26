import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Thermometer, Battery, MapPin } from 'lucide-react';
import { client, urlFor } from '../sanityClient';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && (!defined(status) || status == 'current')] | order(_createdAt asc) {
          _id,
          name,
          slug,
          tagline,
          desc,
          capacity,
          sizing,
          energy,
          specs,
          price,
          img
        }`;
        const data = await client.fetch(query);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-6 md:px-12 bg-bg transition-colors duration-300">
      <div className="max-w-[1440px] min-[1600px]:max-w-[98vw] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-black font-outfit text-primary-text">
            Calor Tech Product Catalog
          </h1>
          <p className="text-[20px] md:text-[22px] text-secondary-text leading-relaxed font-semibold">
            Explore our line of high-capacity post-harvest dehydration hardware. Engineered for maximum reliability and ease of use.
          </p>
        </div>

        {/* Catalog List */}
        <div className="flex flex-col gap-12">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="p-5 md:p-6 rounded-3xl bg-surface border border-border shadow-skeuo-out hover:shadow-card-hover hover:scale-[1.005] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Product Image Column */}
              <div className="lg:col-span-5 flex justify-center p-4 bg-bg rounded-2xl border border-border/50">
                {product.img && (
                  <img
                    src={urlFor(product.img).url()}
                    alt={`${product.name} Cabinet`}
                    className="max-h-[350px] w-auto object-contain hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                )}
              </div>

              {/* Product Info Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-[16px] font-black uppercase tracking-wider text-accent">
                    {product.tagline}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-primary-text mt-1">
                    {product.name}
                  </h2>
                </div>

                <p className="text-[18px] text-secondary-text leading-relaxed">
                  {product.desc}
                </p>

                {/* Key specs highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-border/80 py-4 text-[16px]">
                  <div className="flex flex-col">
                    <span className="text-secondary-text font-bold">Capacity</span>
                    <span className="text-primary-text font-black text-[18px]">{product.capacity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-text font-bold">Energy Rating</span>
                    <span className="text-primary-text font-black text-[18px]">{product.energy}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-text font-bold">Ideal Room Sizing</span>
                    <span className="text-primary-text font-black text-[18px]">{product.sizing}</span>
                  </div>
                </div>

                {/* Quick specs lists */}
                <div>
                  <h4 className="text-[18px] font-bold text-primary-text mb-2">Key Hardware Specifications:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.specs && product.specs.map((spec, i) => (
                      <li key={i} className="flex gap-2 items-start text-[18px] text-secondary-text">
                        <span className="text-accent mt-1.5">&#9670;</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions & Price */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-border/40">
                  <div className="flex flex-col">
                    <span className="text-secondary-text text-[18px]">Starting Price</span>
                    <span className="text-3xl font-extrabold text-primary-text">{product.price} USD</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                      to={`/products/${product.slug?.current}`}
                      className="inline-flex items-center justify-center px-8 h-14 bg-accent hover:bg-accent/90 active:scale-95 text-white text-[18px] font-bold rounded-lg transition-all shadow-btn focus:outline-none focus:ring-4 focus:ring-accent"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/1234567890?text=Hello%20CalorTech%2C%20I%20would%20like%20to%20place%20an%20enquiry%20regarding%20the%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 h-14 bg-whatsapp hover:bg-whatsapp/90 active:scale-95 text-white text-[18px] font-bold rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-whatsapp"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
