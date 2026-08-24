import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function MobileHeader({ toggleMenu, isMenuOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/85 dark:bg-[#1a1a1a]/85 backdrop-blur-lg border-b border-primary/10 dark:border-white/10 z-[60] flex items-center justify-between px-5 shadow-sm">
      <Link to="/" className="flex items-center">
        <h1 className="text-xl font-display font-bold text-primary-text">
          Calor <span className="text-accent">Mega</span>
        </h1>
      </Link>
      
      <button 
        onClick={toggleMenu}
        className="p-2 -mr-2 text-primary-text hover:bg-black/5 rounded-full transition-colors flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
    </header>
  );
}
