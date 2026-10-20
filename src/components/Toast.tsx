import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast, setIsCartOpen } = useCart();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage, hideToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 24, stiffness: 320 }}
          className="fixed bottom-20 lg:bottom-8 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#2C241F] text-[#FFF8ED] rounded-2xl p-4 shadow-2xl border border-[#E8B94F]/30 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#E9772B] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#FFF8ED] truncate">
                {toastMessage}
              </p>
              <button
                onClick={() => {
                  hideToast();
                  setIsCartOpen(true);
                }}
                className="text-[11px] text-[#E8B94F] hover:underline font-medium flex items-center gap-1 mt-0.5"
              >
                <span>View Dining Basket</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <button
            onClick={hideToast}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
