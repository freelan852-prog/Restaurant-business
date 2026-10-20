import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Flame } from 'lucide-react';
import { BRAND_VALUES } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

export const StorySection: React.FC = () => {
  const { setIsReservationOpen } = useCart();

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FFF8ED] border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image side */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-[#E8B94F]/30 shadow-xl bg-[#2C241F]">
              <img
                src="/images/restaurant_dining_interior.jpg"
                alt="Parampara Rasoi warm teak dining room and hospitable Indian ambiance"
                referrerPolicy="no-referrer"
                className="w-full aspect-16/10 object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
              />
              <div className="p-4 bg-[#2C241F] text-[#FFF8ED] flex items-center justify-between text-xs">
                <span>Natural teak & brass dining hall at FC Road, Pune</span>
                <span className="text-[#E8B94F]">Est. 1978</span>
              </div>
            </div>
          </div>

          {/* Text Story side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#315B42] font-semibold">
              Our Heritage & Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#2C241F] tracking-tight leading-tight [text-wrap:balance]">
              Rooted in the Soil of Maharashtra and the Warmth of Southern Atithi.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#2C241F]/80 leading-relaxed font-normal">
              <p>
                Founded on Pune’s iconic Fergusson College Road in 1978, Parampara Rasoi was born from a simple belief: that genuine food, prepared with unhurried patience and revered ingredients, transforms ordinary meals into comforting memories.
              </p>
              <p>
                We honor time-tested methods: our dosa and idli batters are naturally fermented for 14 hours in granite wet grinders without artificial rising agents. Our dosas crisp on heavy seasoned cast-iron pans coated in pure golden A2 cow ghee. And our filter kaapi is dripped from slow Chikmagalur plantation roasts, served foaming hot in bell-brass dabarahs.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-5 py-3 bg-[#315B42] hover:bg-[#254633] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Reserve a Dining Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Section G: Quality and Hospitality Feature Strip */}
        <div className="pt-8 border-t border-[#E8B94F]/25">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#E9772B] font-semibold">
              The Parampara Standard
            </div>
            <h3 className="text-2xl font-serif text-[#2C241F]">
              Pillars of Uncompromised Quality
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_VALUES.map((val, idx) => {
              const icons = [Sparkles, Flame, ShieldCheck, HeartHandshake];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-xl bg-[#FAF4E8] border border-[#E8B94F]/30 hover:border-[#315B42]/50 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#315B42]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#315B42]" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#2C241F] leading-tight">
                    {val.title}
                  </h4>
                  <p className="text-xs text-[#2C241F]/75 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
