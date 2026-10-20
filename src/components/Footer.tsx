import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ShieldAlert } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_OUTLETS, MENU_CATEGORIES } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { setIsReservationOpen, setIsCartOpen } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C241F] text-[#FFF8ED] pt-16 pb-12 border-t border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8ED] tracking-tight">
              {RESTAURANT_INFO.brandName}
            </h3>
            <p className="text-xs text-[#E8B94F] uppercase tracking-wider font-semibold">
              {RESTAURANT_INFO.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#FFF8ED]/75 leading-relaxed">
              Serving generations of Pune families with authentic South Indian breakfast favorites, regional Deccan thalis, and artisanal filter kaapi since 1978.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#FFF8ED]/70">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E9772B] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E9772B] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E9772B] hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base text-[#E8B94F]">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#FFF8ED]/80">
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-[#E9772B] transition-colors cursor-pointer">
                  Explore Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('combos')} className="hover:text-[#E9772B] transition-colors cursor-pointer">
                  Breakfast Combos
                </button>
              </li>
              <li>
                <button onClick={() => setIsReservationOpen(true)} className="hover:text-[#E9772B] transition-colors cursor-pointer">
                  Reserve a Table
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('story')} className="hover:text-[#E9772B] transition-colors cursor-pointer">
                  Our Culinary Heritage
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('locations')} className="hover:text-[#E9772B] transition-colors cursor-pointer">
                  Pune Outlets
                </button>
              </li>
              <li>
                <a
                  href="/parampara-rasoi-source-code.zip"
                  download="parampara-rasoi-source-code.zip"
                  className="hover:text-[#E9772B] text-[#E8B94F] font-medium transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
                >
                  <span>Download Source (.ZIP)</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-[#E9772B] text-[#FFF8ED]/50 transition-colors flex items-center gap-1 cursor-pointer pt-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Staff Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base text-[#E8B94F]">Menu Specialties</h4>
            <ul className="space-y-2 text-xs text-[#FFF8ED]/80">
              {MENU_CATEGORIES.slice(1).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => scrollTo('menu')}
                    className="hover:text-[#E9772B] transition-colors cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base text-[#E8B94F]">Contact & Service</h4>
            <div className="space-y-2.5 text-xs text-[#FFF8ED]/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E9772B] shrink-0" />
                <span>{RESTAURANT_INFO.primaryPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E9772B] shrink-0" />
                <span>{RESTAURANT_INFO.supportEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E9772B] shrink-0 mt-0.5" />
                <span>FC Road, Law College Road, Baner (Pune)</span>
              </div>
              <div className="pt-2 text-[11px] text-[#FFF8ED]/60 leading-tight">
                Operating Daily: 7:00 AM – 11:00 PM <br />
                Delivery coverage: Pune City & PCMC
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full py-2 bg-[#315B42] hover:bg-[#254633] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Book Table Online
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full py-2 bg-[#E9772B] hover:bg-[#d5681f] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Direct Online Order
              </button>
            </div>
          </div>

        </div>

        {/* Allergen & Policies Notice */}
        <div className="pt-8 border-t border-white/10 text-[11px] text-[#FFF8ED]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Allergen Notice: Dishes are prepared in an authentic 100% pure vegetarian kitchen. Peanuts, sesame, and dairy (desi ghee/milk) are used in selected items. Jain preparations available on request.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span>FSSAI Lic. 11521034000189</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} {RESTAURANT_INFO.brandName}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
