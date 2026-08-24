import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-paper pt-8 pb-8 px-6 mt-12 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10">
      <div className="flex flex-col items-center text-center space-y-4">
        
        {/* Brand */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-cinzel font-extrabold tracking-widest text-accent">CALOR MEGA</h2>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-paper/80">
          <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
          <Link to="/products" className="hover:text-accent transition-colors">Machines</Link>
          <Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5 pt-4">
          <a href="#" className="p-2 bg-white/5 rounded-full text-paper hover:text-accent hover:bg-white/10 transition-colors">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="p-2 bg-white/5 rounded-full text-paper hover:text-accent hover:bg-white/10 transition-colors">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="p-2 bg-white/5 rounded-full text-paper hover:text-accent hover:bg-white/10 transition-colors">
            <FaLinkedin size={18} />
          </a>
          <a href="#" className="p-2 bg-white/5 rounded-full text-paper hover:text-accent hover:bg-white/10 transition-colors">
            <FaInstagram size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="w-full border-t border-white/10 pt-6 mt-2">
          <p className="text-xs text-paper/50">
            &copy; {currentYear} Technology Calor Mega. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
