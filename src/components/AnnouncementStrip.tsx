import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#315B42] text-[#FFF8ED] text-xs font-medium py-2 px-4 border-b border-[#315B42]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto text-center truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#E8B94F] shrink-0" />
          <span className="truncate">
            Pure Gir Cow A2 Ghee Preparations <span className="opacity-60">·</span> Morning Filter Kaapi from 7:00 AM <span className="opacity-60">·</span> Use code <strong className="text-[#E8B94F] font-semibold tracking-wide">FIRST50</strong> for ₹50 off
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#FFF8ED]/70 hover:text-white transition-colors p-1 shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
