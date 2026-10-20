import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_OUTLETS, RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

export const LocationsSection: React.FC = () => {
  const { setSelectedOutletId, setIsReservationOpen, setIsCartOpen } = useCart();

  const handleBookAtOutlet = (outletId: string) => {
    setSelectedOutletId(outletId);
    setIsReservationOpen(true);
  };

  const handleOrderFromOutlet = (outletId: string) => {
    setSelectedOutletId(outletId);
    setIsCartOpen(true);
  };

  return (
    <section id="locations" className="py-16 sm:py-24 bg-[#FFF8ED] border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section I: Table Booking Feature Banner */}
        <div className="rounded-3xl bg-[#315B42] text-[#FFF8ED] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#E8B94F] font-semibold">
              Reservations & Family Dining
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-serif text-[#FFF8ED] tracking-tight leading-tight [text-wrap:balance]">
              Your Table Is Waiting.
            </h2>
            
            <p className="text-sm sm:text-base text-[#FFF8ED]/85 leading-relaxed font-normal">
              Planning a family breakfast, leisurely thali lunch, or a celebratory gathering? Reserve your preferred seating in advance across our Pune dining pavilions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-6 py-3.5 bg-[#E9772B] hover:bg-[#d5681f] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Reserve a Table Online
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.primaryPhone}`}
                className="px-5 py-3.5 border border-white/30 hover:bg-white/10 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge: {RESTAURANT_INFO.primaryPhone}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-white/15 text-xs text-[#FFF8ED]/75 flex flex-wrap items-center gap-3">
              <span>Instant Confirmation</span>
              <span aria-hidden="true">·</span>
              <span>No Advance Deposit Required</span>
              <span aria-hidden="true">·</span>
              <span>AC & Verandah Seating Options</span>
            </div>
          </div>

          {/* Decorative ambient visual background accent */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        </div>

        {/* Section J: Outlets, Hours & Directions */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#315B42] font-semibold">
              Visit Us in Pune
            </div>
            <h3 className="text-3xl font-serif text-[#2C241F]">
              Our Outlets & Dining Pavilions
            </h3>
            <p className="text-xs sm:text-sm text-[#2C241F]/70">
              Each location features our full heritage menu, live filter kaapi counter, and warm hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESTAURANT_OUTLETS.map((outlet) => (
              <div
                key={outlet.id}
                className="bg-[#FAF4E8] rounded-2xl p-6 border border-[#E8B94F]/30 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#315B42] font-semibold mb-1">
                      <span>{outlet.area}</span>
                      <span className="flex items-center gap-1 text-[11px] text-[#2C241F]/60">
                        <Users className="w-3 h-3" />
                        <span>{outlet.seatingCapacity} Seats</span>
                      </span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#2C241F]">
                      {outlet.name}
                    </h4>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-xs text-[#2C241F]/80 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#E9772B] shrink-0 mt-0.5" />
                    <div>
                      <p>{outlet.address}</p>
                      <p className="text-[11px] text-[#2C241F]/60 mt-0.5">({outlet.landmark})</p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-2.5 text-xs text-[#2C241F]/80">
                    <Clock className="w-4 h-4 text-[#315B42] shrink-0" />
                    <span>{outlet.timings} Daily</span>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-[#E8B94F]/20 space-y-1.5">
                    {outlet.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#2C241F]/70">
                        <CheckCircle2 className="w-3 h-3 text-[#315B42]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#E8B94F]/20 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleBookAtOutlet(outlet.id)}
                      className="w-full py-2 text-xs font-semibold text-[#315B42] border border-[#315B42]/40 rounded-lg hover:bg-[#315B42]/5 transition-colors cursor-pointer"
                    >
                      Book Table
                    </button>
                    <button
                      onClick={() => handleOrderFromOutlet(outlet.id)}
                      className="w-full py-2 text-xs font-semibold text-white bg-[#E9772B] hover:bg-[#d5681f] rounded-lg transition-colors cursor-pointer"
                    >
                      Order Takeaway
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-[#2C241F]/70">
                    <a
                      href={`https://maps.google.com/?q=${outlet.mapEmbedQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E9772B] inline-flex items-center gap-1"
                    >
                      <span>Google Maps</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://wa.me/${outlet.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#315B42] inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${outlet.phone}`}
                      className="hover:text-[#2C241F] inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
