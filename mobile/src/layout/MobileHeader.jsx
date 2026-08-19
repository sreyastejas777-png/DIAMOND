import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white/85 dark:bg-[#1a1a1a]/85 backdrop-blur-lg border-b border-primary/10 dark:border-white/10 z-[60] flex items-center justify-between px-5 shadow-sm">
      <Link to="/" className="flex items-center">
        <h1 className="text-xl font-display font-bold text-primary-text">
          Calor <span className="text-accent">Mega</span>
        </h1>
      </Link>
      
      <a href="tel:+919810148123" className="animate-vibrate flex items-center space-x-1.5 text-[13px] font-bold bg-gradient-to-r from-accent to-secondary text-white px-4 py-2 rounded-full shadow-md shadow-accent/20">
        <PhoneCall size={15} />
        <span>Call</span>
      </a>
    </header>
  );
}
