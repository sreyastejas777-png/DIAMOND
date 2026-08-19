import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Image as ImageIcon, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav({ toggleMenu, isMenuOpen }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-t border-border/50 z-50 flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => isMenuOpen && toggleMenu()}
            className={`flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors relative z-10 ${
              isActive ? 'text-accent' : 'text-secondary-text hover:text-primary-text'
            }`}
          >
            <div className="relative">
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                />
              )}
            </div>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}

      <button
        onClick={toggleMenu}
        className={`flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors relative z-10 ${
          isMenuOpen ? 'text-accent' : 'text-secondary-text hover:text-primary-text'
        }`}
      >
        <div className="relative">
          {isMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2} />}
        </div>
        <span className="text-[10px] font-medium">Menu</span>
      </button>
    </nav>
  );
}
