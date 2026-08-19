import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Thermometer, Battery, MapPin } from 'lucide-react';
import calorMegaImg from '../assets/calor_mega.png';
import calorMiniImg from '../assets/calor_mini.png';
import calorStandardImg from '../assets/calor_standard.png';
import SectionHeading from '../components/SectionHeading';

export default function Products() {
  const products = [
    {
      id: 'mega',
      name: 'Calor Mega',
      tagline: 'Complete Dehydration System',
      img: calorMegaImg,
      desc: 'Premium commercial walk-in food dehydrator utilizing highly efficient heat-pump moisture extraction. Perfect for agricultural hubs.',
      capacity: '1200L / 24 hrs',
      sizing: 'Up to 1,000 sq ft',
      energy: '5-Star Heat-Pump',
      specs: ['10x10x8 ft Aluminium room', 'Polyurethane double-insulation', 'Precision digital thermostat', 'Multi-point air blowers'],
      price: '$12,500',
    },
    {
      id: 'standard',
      name: 'Calor Standard',
      tagline: 'Cooperative Mid-Range',
      img: calorStandardImg,
      desc: 'A heavy-duty commercial cabinet dehumidifier. Recommended for regional labs and medium-scale farms.',
      capacity: '350L / 24 hrs',
      sizing: 'Up to 350 sq ft',
      energy: '4.5-Star Rating',
      specs: ['Stainless steel cabinet', '12 slide shelves', 'Multi-zone sensors', 'Auto-drain system'],
      price: '$4,200',
    },
    {
      id: 'mini',
      name: 'Calor Mini',
      tagline: 'Desktop Precision',
      img: calorMiniImg,
      desc: 'Compact desktop dehydrator scaled down to preserve high-value artisanal batches and botanicals.',
      capacity: '80L / 24 hrs',
      sizing: 'Up to 80 sq ft',
      energy: '4-Star Rating',
      specs: ['Desktop footprint (2x2 ft)', 'Touchscreen control', '6 stainless mesh trays', 'Dual-axis fans'],
      price: '$1,800',
    }
  ];

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
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 rounded-3xl bg-surface border border-border shadow-soft flex flex-col gap-5"
            >
              <div className="flex justify-center p-4 bg-bg rounded-2xl border border-border/50">
                <img
                  src={product.img}
                  alt={`${product.name} Cabinet`}
                  className="max-h-[220px] w-auto object-contain drop-shadow-md"
                />
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
                    {product.specs.map((spec, i) => (
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
                    to={`/products/${product.id}`}
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
