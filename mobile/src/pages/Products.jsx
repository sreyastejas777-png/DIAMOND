import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Thermometer, Battery, MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
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
      <div className="w-full py-32 flex justify-center items-center min-h-[60vh] bg-bg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 bg-bg min-h-screen">
      <div className="flex flex-col gap-8 w-full max-w-sm mx-auto">
        <SectionHeading 
          eyebrow="Hardware Catalog" 
          title="Our Products" 
          subtitle="Explore high-capacity post-harvest dehydration hardware." 
          className="text-center" 
        />

        <div className="flex flex-col gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 rounded-3xl bg-surface border border-border shadow-soft flex flex-col gap-5"
            >
              <div className="flex justify-center p-4 bg-bg rounded-2xl border border-border/50">
                {product.img && (
                  <img
                    src={urlFor(product.img).url()}
                    alt={`${product.name} Cabinet`}
                    className="max-h-[220px] w-auto object-contain drop-shadow-md"
                  />
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
                    {product.tagline}
                  </span>
                  <h2 className="text-2xl font-extrabold font-outfit text-primary-text mt-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-secondary-text mt-2 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-b border-border/80 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-secondary-text text-[10px] font-bold uppercase">Capacity</span>
                    <span className="text-primary-text font-black">{product.capacity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-text text-[10px] font-bold uppercase">Energy</span>
                    <span className="text-primary-text font-black">{product.energy}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary-text mb-2">Key Specs:</h4>
                  <ul className="flex flex-col gap-1.5">
                    {product.specs && product.specs.map((spec, i) => (
                      <li key={i} className="flex gap-2 items-start text-sm text-secondary-text">
                        <span className="text-accent text-[10px] mt-1">&#9670;</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-secondary-text text-sm">Price</span>
                    <span className="text-xl font-extrabold text-primary-text">{product.price}</span>
                  </div>
                  <Link
                    to={`/products/${product.slug?.current}`}
                    className="flex items-center justify-center w-full py-3.5 bg-accent text-white text-sm font-bold rounded-xl shadow-btn active:scale-95 transition-transform"
                  >
                    View Details
                  </Link>
                  <a
                    href={`https://wa.me/1234567890?text=Enquiry%20regarding%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3.5 bg-[#25D366] text-white text-sm font-bold rounded-xl active:scale-95 transition-transform"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
