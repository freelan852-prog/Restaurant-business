import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Bike, Store, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_OUTLETS } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    packagingCharge,
    gstAmount,
    deliveryFee,
    discount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    fulfillmentType,
    setFulfillmentType,
    selectedOutletId,
    setSelectedOutletId,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#FFF8ED] h-full shadow-2xl flex flex-col border-l border-[#E8B94F]/30 z-10"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E8B94F]/25 bg-[#FAF4E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E9772B]" />
                <h3 className="font-serif text-lg font-bold text-[#2C241F]">
                  Your Dining Basket
                </h3>
                <span className="text-xs text-[#2C241F]/60 font-mono">
                  ({cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'})
                </span>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-[#2C241F]/60 hover:text-[#2C241F] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close basket"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Fulfillment Mode Toggle (Delivery vs Pickup) */}
            <div className="p-4 bg-[#FAF4E8]/60 border-b border-[#E8B94F]/20 space-y-3">
              <div className="grid grid-cols-2 gap-2 bg-[#FFF8ED] p-1 rounded-xl border border-[#E8B94F]/30">
                <button
                  onClick={() => setFulfillmentType('delivery')}
                  className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    fulfillmentType === 'delivery'
                      ? 'bg-[#E9772B] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F]'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Door Delivery</span>
                </button>
                <button
                  onClick={() => setFulfillmentType('pickup')}
                  className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'bg-[#315B42] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F]'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Express Pickup</span>
                </button>
              </div>

              {/* Outlet Selection */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#2C241F]/60 font-medium">Preparing Kitchen:</span>
                <select
                  value={selectedOutletId}
                  onChange={(e) => setSelectedOutletId(e.target.value)}
                  className="bg-white border border-[#E8B94F]/30 rounded-lg px-2.5 py-1 text-xs text-[#2C241F] font-medium focus:outline-none cursor-pointer"
                >
                  {RESTAURANT_OUTLETS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.area})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cart Item List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#FAF4E8] border border-[#E8B94F]/30 flex items-center justify-center text-[#E9772B]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h4 className="font-serif text-lg text-[#2C241F]">Your basket is empty</h4>
                  <p className="text-xs text-[#2C241F]/70 max-w-xs">
                    Explore our signature Mysore masala dosas, button idlis, or authentic Deccan thalis to begin your feast.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const el = document.getElementById('menu');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-2 px-5 py-2.5 bg-[#E9772B] text-white text-xs font-semibold rounded-lg hover:bg-[#d5681f] transition-colors cursor-pointer"
                  >
                    Browse Our Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-3.5 rounded-xl bg-white border border-[#E8B94F]/30 shadow-xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover shrink-0 border border-black/5"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.triedFallback) {
                                target.dataset.triedFallback = 'true';
                                target.src = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=200&q=80';
                              }
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-serif text-sm font-semibold text-[#2C241F] leading-tight truncate">
                              {item.menuItem.name}
                            </h4>
                            <div className="font-mono text-xs text-[#2C241F] font-bold mt-0.5">
                              ₹{item.itemTotal}
                            </div>

                            {/* Customization Details */}
                            {item.customizations && Object.keys(item.customizations).length > 0 && (
                              <div className="text-[11px] text-[#315B42] mt-1 space-y-0.5 leading-tight">
                                {Object.entries(item.customizations).map(([opt, val]) => (
                                  <div key={opt} className="truncate">
                                    • {val}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Special instructions */}
                            {item.specialInstructions && (
                              <div className="text-[11px] text-[#2C241F]/60 italic mt-0.5 truncate">
                                Note: "{item.specialInstructions}"
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity adjuster */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                        <span className="text-[#2C241F]/60">Quantity</span>
                        <div className="flex items-center gap-2 bg-[#FAF4E8] rounded-md px-1.5 py-0.5 border border-[#E8B94F]/40">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#E9772B] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-semibold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#E9772B] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer & Bill Summary */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 bg-[#FAF4E8] border-t border-[#E8B94F]/25 space-y-4">
                
                {/* Promo Code Form */}
                <div>
                  {appliedCoupon ? (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Coupon <strong>{appliedCoupon.code}</strong> applied!</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Promo code (e.g. FIRST50, FEAST100)"
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8B94F]/30 rounded-lg uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#E9772B]"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 bg-[#315B42] hover:bg-[#254633] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Bill Details */}
                <div className="space-y-1.5 text-xs text-[#2C241F]/80 pt-1">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span className="font-mono font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eco Packaging Charge</span>
                    <span className="font-mono">₹{packagingCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant GST (5%)</span>
                    <span className="font-mono">₹{gstAmount}</span>
                  </div>
                  {fulfillmentType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee {subtotal >= 499 && '(Free over ₹499)'}</span>
                      <span className="font-mono">
                        {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}
                      </span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Coupon Discount</span>
                      <span className="font-mono">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#2C241F] pt-2 border-t border-[#E8B94F]/25">
                    <span>To Pay</span>
                    <span className="font-mono text-base text-[#E9772B]">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Action */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 bg-[#E9772B] hover:bg-[#d5681f] text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
