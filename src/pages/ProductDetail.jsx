import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Check, Info, Hammer, PenTool, Flame, Zap, HelpCircle } from 'lucide-react';
import { client, urlFor } from '../sanityClient';

export default function ProductDetail() {
  const { id } = useParams(); // 'id' parameter now acts as the Sanity slug
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'installation', 'maintenance'
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug: id });
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-bold text-primary-text font-outfit">Product Not Found</h2>
        <p className="text-[18px] text-secondary-text">The product you are looking for does not exist in our system.</p>
        <Link to="/products" className="px-6 py-3 bg-accent text-white text-[18px] font-bold rounded-lg hover:bg-accent/90 transition-all">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-6 md:px-12 bg-bg transition-colors duration-300">
      <div className="max-w-[1440px] min-[1600px]:max-w-[98vw] mx-auto flex flex-col gap-12">
        
        {/* Navigation Breadcrumb */}
        <div className="text-[18px] text-secondary-text font-bold">
          <Link to="/" className="hover:text-accent">Home</Link> &gt;&nbsp;
          <Link to="/products" className="hover:text-accent">Products</Link> &gt;&nbsp;
          <span className="text-primary-text">{product.name}</span>
        </div>

        {/* 1. PRODUCT INTRO BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 md:p-6 bg-surface border border-border rounded-2xl shadow-skeuo-out flex items-center justify-center">
              {product.img && (
                <img
                  src={urlFor(product.img).url()}
                  alt={product.name}
                  className="max-h-[450px] w-auto object-contain rounded-xl"
                />
              )}
            </div>
            {/* Small thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.gallery && product.gallery.map((thumb, idx) => (
                <div key={idx} className="p-2 bg-surface border border-border rounded-lg shadow-skeuo-in flex items-center justify-center cursor-pointer hover:border-accent transition-colors">
                  <img src={urlFor(thumb).url()} alt="thumbnail" className="h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Core Info Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[18px] font-black uppercase text-accent tracking-wider">
                {product.tagline}
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-outfit text-primary-text mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-[20px] text-primary-text leading-relaxed font-medium">
              {product.overview}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-brand-light border border-border mt-4">
              <div className="flex flex-col">
                <span className="text-secondary-text text-[18px] font-bold">Pricing Starts At</span>
                <span className="text-4xl font-extrabold text-primary-text">{product.price} USD</span>
              </div>
              <a
                href={`https://wa.me/1234567890?text=Hello%20CalorTech%2C%20I%20would%20like%20to%20request%20information%20and%20purchase%20enquiry%20on%20the%20${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 h-14 bg-whatsapp hover:bg-whatsapp/90 active:scale-95 text-white text-[18px] font-bold rounded-lg transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-whatsapp"
              >
                Inquire via WhatsApp
              </a>
            </div>

            {/* Safety & warranty alerts */}
            <div className="flex gap-4 items-start p-4 bg-accent/5 border border-accent/20 rounded-xl">
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div className="text-[18px]">
                <strong className="text-primary-text block font-bold">Warranty Shield Protected</strong>
                <span className="text-secondary-text">{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABBED DETAILED SPECIFICATIONS SECTION */}
        <div className="mt-8 border-t border-border pt-12">
          {/* Tabs header */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-px">
            {[
              { id: 'specs', label: 'Technical Specifications', icon: <Zap className="w-5 h-5" /> },
              { id: 'installation', label: 'Installation Requirements', icon: <Hammer className="w-5 h-5" /> },
              { id: 'maintenance', label: 'Maintenance & Service', icon: <PenTool className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-[18px] font-bold rounded-t-xl transition-all border-t border-l border-r ${
                  activeTab === tab.id
                    ? 'bg-surface border-border text-accent shadow-sm translate-y-px z-10'
                    : 'bg-transparent border-transparent text-secondary-text hover:text-primary-text hover:bg-brand-light'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <div className="p-5 md:p-6 bg-surface border-b border-l border-r border-border rounded-b-2xl shadow-skeuo-out transition-colors duration-300">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Tech specifications table */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-primary-text font-outfit">Physical Specs Sheet</h3>
                  <table className="w-full text-left border-collapse text-[18px]">
                    <tbody>
                      {product.detailedSpecs && product.detailedSpecs.map((item, i) => (
                        <tr key={i} className="border-b border-border/60 hover:bg-brand-light transition-colors">
                          <td className="py-3 pr-4 font-bold text-secondary-text w-1/3">{item.label}</td>
                          <td className="py-3 text-primary-text font-semibold">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Features & use cases */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-text font-outfit mb-3">Key Design Advantages</h3>
                    <ul className="flex flex-col gap-2">
                      {product.features && product.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 items-start text-[18px] text-secondary-text">
                          <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-primary-text font-outfit mb-3">Ideal Sizing & Use Cases</h3>
                    <ul className="flex flex-col gap-2">
                      {product.useCases && product.useCases.map((use, i) => (
                        <li key={i} className="flex gap-2 items-start text-[18px] text-secondary-text">
                          <Info className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-primary-text font-outfit">Installation Procedures & Site Readiness</h3>
                <p className="text-[18px] text-secondary-text leading-relaxed max-w-[900px]">
                  {product.installation}
                </p>
                <div className="mt-4 p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-700 dark:text-orange-300 text-[18px] flex gap-4 items-start max-w-[900px]">
                  <HelpCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block font-bold">Need Help Planning Your Space?</strong>
                    Our engineering team offers complimentary remote site evaluation to verify power lines and air circulation layout. Contact sales today to arrange a layout design review.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-primary-text font-outfit">Routine Maintenance and Longevity Protocol</h3>
                <p className="text-[18px] text-secondary-text leading-relaxed max-w-[900px]">
                  {product.maintenance}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-w-[900px]">
                  <div className="p-6 border border-border rounded-xl bg-bg">
                    <strong className="text-primary-text block mb-2 font-bold">Weekly Diagnostics Checklist</strong>
                    <ul className="list-disc pl-5 text-[18px] text-secondary-text flex flex-col gap-1">
                      <li>Verify drain hose drainage clearance</li>
                      <li>Check display screen console warnings</li>
                      <li>Inspect polyurethane door gaskets for seal</li>
                    </ul>
                  </div>
                  <div className="p-6 border border-border rounded-xl bg-bg">
                    <strong className="text-primary-text block mb-2 font-bold">Energy Performance Audit</strong>
                    <p className="text-[18px] text-secondary-text">
                      {product.energy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. CTA CARD TO ANOTHER PRODUCT */}
        <div className="mt-8 p-5 md:p-6 rounded-3xl bg-brand-light border border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left transition-colors duration-300">
          <div>
            <h3 className="text-2xl font-extrabold font-outfit text-primary-text">Want to compare other capacities?</h3>
            <p className="text-[18px] text-secondary-text mt-1">Review the full CalorTech line from compact desktop units to commercial systems.</p>
          </div>
          <Link
            to="/products"
            className="px-8 py-4 bg-surface text-primary-text border border-border text-[18px] font-bold rounded-lg shadow-skeuo-out hover:bg-toggle-bg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Back to Catalog
          </Link>
        </div>

      </div>
    </div>
  );
}
