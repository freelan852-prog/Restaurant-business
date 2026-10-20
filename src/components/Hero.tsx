import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Sparkles, Wind } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero: React.FC = () => {
  const { setIsReservationOpen } = useCart();
  const [steamActive, setSteamActive] = useState(false);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF8ED] py-12 lg:py-20 border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Staggered Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-[#315B42] font-semibold"
            >
              Heritage Deccan & South Indian Culinary Tradition
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2C241F] tracking-tight leading-[1.12] [text-wrap:balance]"
            >
              India on a Plate. <br />
              <span className="italic text-[#E9772B]">Tradition in Every Bite.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl text-[#2C241F]/80 max-w-2xl leading-relaxed font-normal"
            >
              From natural stone-ground fermentations to hand-roasted Chikmagalur degree filter kaapi, discover freshly prepared regional flavors made to bring people together.
            </motion.p>

            {/* Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToMenu}
                className="px-6 py-3.5 bg-[#E9772B] hover:bg-[#d5681f] text-white text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsReservationOpen(true)}
                className="px-6 py-3.5 bg-[#315B42] hover:bg-[#254633] text-white text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Table</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToMenu}
                className="px-4 py-3.5 text-base font-semibold text-[#2C241F] hover:text-[#E9772B] transition-colors underline underline-offset-4 cursor-pointer"
              >
                Order for Delivery
              </motion.button>
            </motion.div>

            {/* Quiet verified trust statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-6 border-t border-[#E8B94F]/25 text-xs text-[#2C241F]/70 flex flex-wrap items-center gap-2"
            >
              <span>Pure Gir Cow A2 Desi Ghee</span>
              <span aria-hidden="true">·</span>
              <span>14-Hour Natural Fermentation</span>
              <span aria-hidden="true">·</span>
              <span>Cast Iron Tawa Roasted</span>
              <span aria-hidden="true">·</span>
              <span>Since 1978 in Pune</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Card with Interactive Hover & Steam Micro-interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#E8B94F]/30 shadow-xl bg-[#FAF4E8] group">
              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/images/hero_masala_dosa.jpg"
                  alt="Signature Mysore Masala Dosa served with fresh chutneys and sambar on a banana leaf"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-4/3 object-cover cursor-pointer"
                  onClick={() => setSteamActive(!steamActive)}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80';
                    }
                  }}
                />

                {/* Interactive Steam Particle Wisps when active */}
                <AnimatePresence>
                  {steamActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 40, x: (i - 1.5) * 40, scale: 0.6 }}
                          animate={{
                            opacity: [0, 0.6, 0.3, 0],
                            y: -80,
                            x: (i - 1.5) * 50 + (i % 2 === 0 ? 15 : -15),
                            scale: 1.8
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.2 + i * 0.4,
                            ease: 'easeInOut',
                            delay: i * 0.3
                          }}
                          className="absolute bottom-16 w-12 h-16 rounded-full bg-white/40 blur-md"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Micro-interaction Button to trigger aroma steam */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setSteamActive(!steamActive)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-[#E8B94F] text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Click to toggle tawa aroma steam"
                >
                  <Wind className="w-3.5 h-3.5 text-[#E8B94F]" />
                  <span>{steamActive ? 'Aroma Active' : 'Warm Tawa Steam'}</span>
                </motion.button>
              </div>

              <div className="p-4 bg-[#2C241F] text-[#FFF8ED] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#FFF8ED]">Royal Mysore Masala Dosa</h4>
                  <p className="text-xs text-[#FFF8ED]/70">Roasted in A2 Desi Ghee · Sambar & Coconut Chutney</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-[#E8B94F]">₹185</span>
                  <div className="text-[11px] text-[#FFF8ED]/60">Freshly Made</div>
                </div>
              </div>
            </div>

            {/* Floating accent highlight */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FFF8ED] p-3.5 rounded-xl border border-[#E8B94F]/40 shadow-lg items-center gap-3 max-w-xs cursor-pointer transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#315B42]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#315B42]" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#2C241F]">Fresh Morning Batches</p>
                <p className="text-[#2C241F]/70">Crisp dosas & cloud-soft idlis crafted from 7:00 AM daily</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
