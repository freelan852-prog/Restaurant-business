import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF4E8] border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#315B42] font-semibold">
            Diner Stories & Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2C241F] tracking-tight">
            Cherished by Generations of Pune Food Lovers
          </h2>
          <p className="text-sm sm:text-base text-[#2C241F]/75 leading-relaxed">
            From morning college crowds to weekend family reunions, read genuine dining impressions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFF8ED] rounded-2xl p-6 sm:p-7 border border-[#E8B94F]/30 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E8B94F]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E8B94F] text-[#E8B94F]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E8B94F]/40" />
                </div>

                <p className="text-xs sm:text-sm text-[#2C241F]/85 leading-relaxed italic">
                  "{review.content}"
                </p>
              </div>

              {/* Author attribution */}
              <div className="pt-4 border-t border-[#E8B94F]/20">
                <div className="font-serif text-base font-bold text-[#2C241F]">
                  {review.author}
                </div>
                <div className="text-xs text-[#2C241F]/70">{review.role}</div>
                <div className="text-[11px] text-[#315B42] font-medium mt-1 flex items-center gap-2">
                  <span>Dined at: {review.outlet}</span>
                  <span aria-hidden="true">·</span>
                  <span>{review.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
