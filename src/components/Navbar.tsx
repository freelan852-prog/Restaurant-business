import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, ShieldAlert, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenOrderTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenOrderTracking }) => {
  const { itemCount, setIsCartOpen, setIsReservationOpen, activeOrder } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#E8B94F]/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-tight text-[#2C241F] hover:text-[#E9772B] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Parampara Rasoi</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#2C241F]/80">
          <button
            onClick={() => scrollTo('menu')}
            className="hover:text-[#E9772B] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E9772B] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
          >
            Our Menu
          </button>
          <button
            onClick={() => scrollTo('combos')}
            className="hover:text-[#E9772B] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E9772B] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
          >
            Combos
          </button>
          <button
            onClick={() => scrollTo('story')}
            className="hover:text-[#E9772B] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E9772B] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollTo('locations')}
            className="hover:text-[#E9772B] transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E9772B] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
          >
            Locations
          </button>
          {activeOrder && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onOpenOrderTracking}
              className="text-[#E9772B] font-semibold hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Track Live Order
            </motion.button>
          )}
        </nav>

        {/* Zone 3: Actions & Cart & Reservation */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/parampara-rasoi-source-code.zip"
            download="parampara-rasoi-source-code.zip"
            title="Download Full Source Code (.ZIP)"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#2C241F]/80 hover:text-[#E9772B] border border-[#E8B94F]/40 hover:border-[#E9772B] rounded-lg transition-colors min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5 text-[#E9772B]" />
            <span>Source ZIP</span>
          </a>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsReservationOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#315B42] border border-[#315B42]/30 rounded-lg hover:bg-[#315B42]/5 transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <Calendar className="w-4 h-4 text-[#315B42]" />
            <span>Book Table</span>
          </motion.button>

          {/* Interactive Animated Shopping Bag */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-lg text-[#2C241F] hover:bg-[#E8B94F]/15 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
            aria-label={`Shopping bag with ${itemCount} items`}
          >
            <ShoppingBag className="w-5 h-5 text-[#2C241F]" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute top-1 right-1 bg-[#E9772B] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('menu')}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#E9772B] hover:bg-[#d5681f] rounded-lg transition-all whitespace-nowrap shadow-xs cursor-pointer min-h-[40px] flex items-center justify-center"
          >
            Order Online
          </motion.button>

          {/* Admin Staff Access Trigger */}
          <button
            onClick={onOpenAdmin}
            title="Restaurant Staff Portal"
            className="hidden md:inline-flex items-center text-[#2C241F]/40 hover:text-[#2C241F] p-2 text-xs transition-colors cursor-pointer"
            aria-label="Staff Portal"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#2C241F] hover:bg-black/5 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-[#E8B94F]/20 bg-[#FFF8ED] px-4 pt-4 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <button
              onClick={() => scrollTo('menu')}
              className="block w-full text-left py-2.5 text-base font-medium text-[#2C241F] min-h-[44px] flex items-center"
            >
              Our Menu
            </button>
            <button
              onClick={() => scrollTo('combos')}
              className="block w-full text-left py-2.5 text-base font-medium text-[#2C241F] min-h-[44px] flex items-center"
            >
              Curated Combos
            </button>
            <button
              onClick={() => scrollTo('story')}
              className="block w-full text-left py-2.5 text-base font-medium text-[#2C241F] min-h-[44px] flex items-center"
            >
              Our Story & Heritage
            </button>
            <button
              onClick={() => scrollTo('locations')}
              className="block w-full text-left py-2.5 text-base font-medium text-[#2C241F] min-h-[44px] flex items-center"
            >
              Pune Outlets & Hours
            </button>

            {activeOrder && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderTracking();
                }}
                className="block w-full text-left py-2.5 text-base font-semibold text-[#E9772B] min-h-[44px] flex items-center"
              >
                Track Live Order
              </button>
            )}

            <div className="pt-3 border-t border-[#E8B94F]/20 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#315B42] border border-[#315B42] rounded-xl min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Table</span>
              </button>

              <a
                href="/parampara-rasoi-source-code.zip"
                download="parampara-rasoi-source-code.zip"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#2C241F] bg-[#FAF4E8] border border-[#E8B94F]/40 rounded-xl min-h-[44px]"
              >
                <Download className="w-4 h-4 text-[#E9772B]" />
                <span>Download Source Code (.ZIP)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs text-center text-[#2C241F]/60 hover:text-[#2C241F] py-2 min-h-[44px] flex items-center justify-center"
              >
                Staff Portal Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
