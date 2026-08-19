import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-border/50 z-30 flex items-center justify-between px-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <Link to="/" className="flex items-center">
        <h1 className="text-xl font-display font-bold text-primary-text">
          Calor <span className="text-accent">Mega</span>
        </h1>
      </Link>
      
      <a href="tel:+919810148123" className="flex items-center space-x-1.5 text-xs font-semibold bg-accent/10 text-accent px-3 py-2 rounded-full border border-accent/20">
        <PhoneCall size={14} />
        <span>Call</span>
      </a>
    </header>
  );
}
