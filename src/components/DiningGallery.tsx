import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export const DiningGallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF4E8] border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#315B42] font-semibold">
            Visual Storytelling
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2C241F] tracking-tight">
            Atmosphere & Plating
          </h2>
          <p className="text-sm sm:text-base text-[#2C241F]/75 leading-relaxed">
            Moments from our dining halls, traditional brass presentations, and culinary craft.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveImage(item.image)}
              className={`group relative rounded-2xl overflow-hidden border border-[#E8B94F]/30 bg-[#2C241F] cursor-pointer shadow-sm hover:shadow-xl transition-all ${
                index === 0 ? 'lg:col-span-2 aspect-16/9' : 'aspect-4/3'
              }`}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#E8B94F] font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-[#FFF8ED] mt-0.5">
                    {item.title}
                  </h4>
                </div>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0"
                >
                  <Maximize2 className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-10"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl z-10"
            >
              <img
                src={activeImage}
                alt="Parampara Rasoi dining ambiance showcase"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
