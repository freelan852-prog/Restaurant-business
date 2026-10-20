import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, CartCustomization } from '../types/restaurant';
import { useCart } from '../context/CartContext';

interface DishCustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const DishCustomizationModal: React.FC<DishCustomizationModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<CartCustomization>({});
  const [instructions, setInstructions] = useState('');

  if (!item) return null;

  const handleChoiceChange = (optionName: string, choiceLabel: string) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [optionName]: choiceLabel
    }));
  };

  let extraCost = 0;
  if (item.availableOptions) {
    item.availableOptions.forEach((opt) => {
      const chosenLabel = selectedChoices[opt.name] || opt.choices[0]?.label;
      const foundChoice = opt.choices.find((c) => c.label === chosenLabel);
      if (foundChoice) extraCost += foundChoice.price;
    });
  }

  const unitPrice = item.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const finalChoices: CartCustomization = { ...selectedChoices };
    if (item.availableOptions) {
      item.availableOptions.forEach((opt) => {
        if (!finalChoices[opt.name] && opt.choices.length > 0) {
          finalChoices[opt.name] = opt.choices[0].label;
        }
      });
    }

    addToCart(item, quantity, finalChoices, instructions);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative bg-[#FFF8ED] rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-[#E8B94F]/30 z-10 overflow-hidden"
        >
          {/* Header with image */}
          <div className="relative h-40 sm:h-52 w-full bg-[#2C241F] shrink-0">
            <img
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </motion.button>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs text-[#E8B94F] mb-0.5">
                <span>{item.regionalName || item.category}</span>
                <span>·</span>
                <span>Prep: {item.preparationTimeMinutes} mins</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-serif leading-tight">{item.name}</h3>
            </div>
          </div>

          {/* Content body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            <p className="text-xs sm:text-sm text-[#2C241F]/80 leading-relaxed">{item.description}</p>

            {/* Options & Customizations */}
            {item.availableOptions && item.availableOptions.length > 0 && (
              <div className="space-y-4 pt-1">
                {item.availableOptions.map((option) => (
                  <div key={option.name} className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#315B42]">
                      {option.name}
                    </div>
                    <div className="space-y-1.5">
                      {option.choices.map((choice) => {
                        const isSelected =
                          (selectedChoices[option.name] ?? option.choices[0]?.label) === choice.label;
                        return (
                          <motion.label
                            key={choice.label}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleChoiceChange(option.name, choice.label)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-colors min-h-[44px] ${
                              isSelected
                                ? 'border-[#E9772B] bg-[#E9772B]/5 text-[#2C241F] font-medium'
                                : 'border-[#E8B94F]/30 bg-white/60 hover:bg-white text-[#2C241F]/80'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-[#E9772B] bg-[#E9772B]' : 'border-gray-400'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                              <span className="text-xs sm:text-sm">{choice.label}</span>
                            </div>
                            {choice.price > 0 && (
                              <span className="font-mono text-xs text-[#E9772B] font-semibold">
                                +₹{choice.price}
                              </span>
                            )}
                          </motion.label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C241F]/70">
                Special Cooking Instructions (Optional)
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Less spicy, extra crispy tawa roast, separate chutney"
                className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-[#E8B94F]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
              />
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E8B94F]/20">
              <span className="text-sm font-medium text-[#2C241F]">Quantity</span>
              <div className="flex items-center gap-3 bg-white border border-[#E8B94F]/40 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2C241F] hover:bg-[#FAF4E8] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono text-sm font-semibold w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2C241F] hover:bg-[#FAF4E8] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal footer with safe area */}
          <div className="p-4 sm:p-5 bg-[#FAF4E8] border-t border-[#E8B94F]/20 flex items-center justify-between gap-4 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
            <div>
              <div className="text-xs text-[#2C241F]/60">Total Item Price</div>
              <div className="font-mono text-lg sm:text-xl font-bold text-[#2C241F]">₹{totalPrice}</div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleConfirm}
              className="px-5 sm:px-6 py-3.5 bg-[#E9772B] active:bg-[#d5681f] text-white font-semibold rounded-xl shadow-sm transition-colors cursor-pointer min-h-[48px] text-xs sm:text-sm"
            >
              Add to Cart · ₹{totalPrice}
            </motion.button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
