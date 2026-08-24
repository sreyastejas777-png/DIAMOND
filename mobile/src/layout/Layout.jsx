import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';
import AIChatbotPopup from '../components/AIChatbotPopup';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg text-primary-text font-sans flex flex-col relative overflow-x-hidden">
      <MobileHeader toggleMenu={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      
      <main className="flex-1 w-full relative z-10 pt-16">
        <Outlet />
      </main>
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <WhatsAppButton />
      <AIChatbotPopup />
    </div>
  );
}
