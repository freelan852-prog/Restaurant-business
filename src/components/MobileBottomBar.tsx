import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomBar: React.FC = () => {
  const { itemCount, setIsCartOpen, setIsReservationOpen, isCartOpen, isCheckoutOpen, isReservationOpen } = useCart();

  // If a full modal or cart is active, keep bottom bar discreet
  if (isCartOpen || isCheckoutOpen || isReservationOpen) {
    return null;
  }

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FFF8ED]/95 backdrop-blur-md border-t border-[#E8B94F]/30 px-4 pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] shadow-lg">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsReservationOpen(true)}
          className="flex-1 min-h-[44px] py-2 px-3 bg-[#315B42] active:bg-[#254633] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Table</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={itemCount > 0 ? () => setIsCartOpen(true) : scrollToMenu}
          className="flex-1 min-h-[44px] py-2 px-3 bg-[#E9772B] active:bg-[#d5681f] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{itemCount > 0 ? `Basket (${itemCount})` : 'Order Food'}</span>
        </motion.button>
      </div>
    </div>
  );
};
