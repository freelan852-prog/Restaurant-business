import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { COMBOS_DATA, MENU_ITEMS } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

export const CombosSection: React.FC = () => {
  const { addToCart } = useCart();
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  const handleAddCombo = (comboId: string) => {
    const matchingItem = MENU_ITEMS.find((m) => m.id === 'south-indian-tiffin-combo' || m.id === 'grand-deccan-thali');
    if (matchingItem) {
      addToCart(matchingItem, 1);
      setAddedComboId(comboId);
      setTimeout(() => setAddedComboId(null), 1500);
    }
  };

  return (
    <section id="combos" className="py-16 sm:py-24 bg-[#FAF4E8] border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#315B42] font-semibold">
            Curated Meal Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2C241F] tracking-tight">
            Traditional Combinations
          </h2>
          <p className="text-sm sm:text-base text-[#2C241F]/75 leading-relaxed">
            Thoughtfully paired dishes inspired by timeless Deccan mornings, leisurely thali lunches, and teatime traditions.
          </p>
        </div>

        {/* Combo Cards Grid with interactive hover animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMBOS_DATA.map((combo, idx) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-[#FFF8ED] rounded-2xl overflow-hidden border border-[#E8B94F]/30 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#2C241F]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    src={combo.image}
                    alt={combo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80';
                      }
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#2C241F]/85 backdrop-blur-xs text-[#E8B94F] text-xs font-medium px-2.5 py-1 rounded">
                    {combo.badge}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2C241F]">
                      {combo.title}
                    </h3>
                    <p className="text-xs text-[#315B42] font-medium mt-0.5">
                      {combo.tagline}
                    </p>
                  </div>

                  {/* Included items */}
                  <div className="space-y-2 pt-2 border-t border-[#E8B94F]/20">
                    <div className="text-xs font-semibold text-[#2C241F]/70">What’s included:</div>
                    <ul className="space-y-1.5 text-xs text-[#2C241F]/85">
                      {combo.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#315B42] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Price and Add button */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-[#E8B94F]/20">
                  <div>
                    <div className="text-xs text-[#2C241F]/60">Complete Combo</div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xl font-bold text-[#2C241F]">
                        ₹{combo.price}
                      </span>
                      <span className="font-mono text-xs text-[#2C241F]/40 line-through">
                        ₹{combo.originalPrice}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleAddCombo(combo.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer ${
                      addedComboId === combo.id
                        ? 'bg-[#315B42]'
                        : 'bg-[#E9772B] hover:bg-[#d5681f]'
                    }`}
                  >
                    {addedComboId === combo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Combo</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
