import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { MenuItem } from '../types/restaurant';
import { useCart } from '../context/CartContext';
import { DishCard } from './DishCard';
import { DishCustomizationModal } from './DishCustomizationModal';

export const MenuSection: React.FC = () => {
  const { menuItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState<'all' | 'mild' | 'medium' | 'spicy'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (spiceFilter !== 'all' && item.spiceLevel !== spiceFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesRegional = item.regionalName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredient = item.ingredients.some((i) => i.toLowerCase().includes(query));
        if (!matchesName && !matchesRegional && !matchesDesc && !matchesIngredient) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (a.isChefSpecial && !b.isChefSpecial) return -1;
      if (b.isChefSpecial && !a.isChefSpecial) return 1;
      if (a.isBestseller && !b.isBestseller) return -1;
      if (b.isBestseller && !a.isBestseller) return 1;
      return 0;
    });
  }, [menuItems, selectedCategory, spiceFilter, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FFF8ED] border-b border-[#E8B94F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#315B42] font-semibold">
            Authentic Regional Flavors
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2C241F] tracking-tight">
            Our Heritage Menu
          </h2>
          <p className="text-sm sm:text-base text-[#2C241F]/75 leading-relaxed">
            Freshly prepared using stone-ground batters, A2 cow ghee, and single-estate spices. Every dish reflects generations of culinary mastery.
          </p>
        </div>

        {/* Category Photographic Tiles with interactive animated feedback */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isActive
                    ? 'bg-[#315B42] text-[#FFF8ED] border-[#315B42] shadow-md ring-2 ring-[#315B42]/30'
                    : 'bg-[#FAF4E8] text-[#2C241F] border-[#E8B94F]/30 hover:border-[#E9772B]/50 hover:bg-white'
                }`}
              >
                <div className="space-y-1 relative z-10">
                  <div className="text-xs opacity-75 font-mono">{cat.dishCount} items</div>
                  <div className="font-serif text-sm font-semibold leading-tight line-clamp-2">
                    {cat.name}
                  </div>
                </div>
                <div className="text-[11px] opacity-80 mt-2 font-medium relative z-10">
                  {isActive ? 'Viewing' : 'Explore'} →
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="bg-[#FAF4E8] p-4 sm:p-5 rounded-2xl border border-[#E8B94F]/30 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#2C241F]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name, podi, ghee, sambar, thali..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E8B94F]/30 rounded-lg text-[#2C241F] placeholder-[#2C241F]/40 focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2C241F]/50 hover:text-[#2C241F] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Spice Level Segmented Controls with smooth interactive pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#E8B94F]/30 shrink-0">
            <span className="text-xs text-[#2C241F]/60 px-2 font-medium">Spice:</span>
            {(['all', 'mild', 'medium', 'spicy'] as const).map((spice) => {
              const isSelected = spiceFilter === spice;
              return (
                <motion.button
                  key={spice}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSpiceFilter(spice)}
                  className={`px-2.5 py-1 text-xs font-medium rounded capitalize transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E9772B] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F]'
                  }`}
                >
                  {spice}
                </motion.button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#2C241F]/60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-[#E8B94F]/30 rounded-lg px-3 py-2 text-[#2C241F] focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 cursor-pointer"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Animated Dishes Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-[#FAF4E8] rounded-2xl border border-dashed border-[#E8B94F]/40 p-8 space-y-3"
            >
              <Sparkles className="w-8 h-8 text-[#E8B94F] mx-auto" />
              <h3 className="font-serif text-lg text-[#2C241F]">No matching dishes found</h3>
              <p className="text-xs text-[#2C241F]/70 max-w-sm mx-auto">
                We couldn't find items matching "{searchQuery}". Try selecting "Full Menu" or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSpiceFilter('all');
                }}
                className="px-4 py-2 bg-[#E9772B] text-white text-xs font-semibold rounded-lg hover:bg-[#d5681f] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredItems.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  onCustomize={(i) => setCustomizingItem(i)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Dish Customization Modal */}
      <DishCustomizationModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
      />
    </section>
  );
};
