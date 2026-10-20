import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, SlidersHorizontal, Flame, Check } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { useCart } from '../context/CartContext';

interface DishCardProps {
  item: MenuItem;
  onCustomize: (item: MenuItem) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ item, onCustomize }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizable && item.availableOptions && item.availableOptions.length > 0) {
      onCustomize(item);
    } else {
      addToCart(item, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onCustomize(item)}
      className="group relative bg-[#FAF4E8] rounded-2xl overflow-hidden border border-[#E8B94F]/30 hover:border-[#E9772B]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Dish image container */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-[#2C241F]">
          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.triedFallback) {
                target.dataset.triedFallback = 'true';
                target.src = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80';
              }
            }}
          />

          {/* Indian Vegetarian Symbol (FSSAI green square with circle) */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-1 rounded border border-gray-200 shadow-xs flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-[#315B42] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#315B42]" />
            </div>
          </div>

          {/* Label: Chef's Special / Bestseller */}
          {item.isChefSpecial && (
            <div className="absolute top-3 right-3 bg-[#2C241F]/85 backdrop-blur-xs text-[#E8B94F] text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
              Chef Special
            </div>
          )}
          {!item.isChefSpecial && item.isBestseller && (
            <div className="absolute top-3 right-3 bg-[#2C241F]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
              Popular Choice
            </div>
          )}

          {/* Subtle overlay bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Dish Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2C241F] group-hover:text-[#E9772B] transition-colors leading-tight">
                {item.name}
              </h3>
              {item.regionalName && (
                <div className="text-xs text-[#2C241F]/60 mt-0.5">{item.regionalName}</div>
              )}
            </div>
          </div>

          <p className="text-xs text-[#2C241F]/75 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Clean unboxed metadata separator */}
          <div className="flex items-center gap-2 text-[11px] text-[#2C241F]/60 pt-1">
            <span>Prep: {item.preparationTimeMinutes}m</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#E9772B]" />
              <span className="capitalize">{item.spiceLevel}</span>
            </span>
            {item.customizable && (
              <>
                <span aria-hidden="true">·</span>
                <span>Customizable</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart row */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#E8B94F]/20 mt-2">
        <div>
          <span className="text-xs text-[#2C241F]/60 block">Price</span>
          <span className="font-mono text-lg font-bold text-[#2C241F] tabular-nums">
            ₹{item.price}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleQuickAdd}
          disabled={!item.isAvailable}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer ${
            justAdded
              ? 'bg-[#315B42] text-white'
              : item.isAvailable
              ? 'bg-[#E9772B] hover:bg-[#d5681f] text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          aria-label={item.customizable ? `Customize ${item.name}` : `Add ${item.name} to cart`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Added!</span>
            </>
          ) : item.customizable ? (
            <>
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
};
