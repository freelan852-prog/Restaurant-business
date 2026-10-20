import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Clock, MapPin, Phone, ChefHat, Package, Bike, Sparkles, Play } from 'lucide-react';
import { CustomerOrder } from '../types/restaurant';
import { RESTAURANT_OUTLETS } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

interface OrderTrackingModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
}

const ORDER_STEPS = [
  { key: 'placed', label: 'Order Received', desc: 'Sent to restaurant kitchen', icon: Clock },
  { key: 'preparing', label: 'Kitchen Preparing', desc: 'Crafting fresh dosas on tawa', icon: ChefHat },
  { key: 'packed', label: 'Freshly Packed', desc: 'Sealed in eco-friendly warm packaging', icon: Package },
  { key: 'out_for_delivery', label: 'On the Way', desc: 'Valet out for delivery', icon: Bike },
  { key: 'delivered', label: 'Delivered', desc: 'Enjoy your authentic feast!', icon: Sparkles }
];

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  const { updateOrderStatus } = useCart();
  if (!order) return null;

  const outlet = RESTAURANT_OUTLETS.find((o) => o.id === order.outletId) || RESTAURANT_OUTLETS[0];

  const statusOrder = ['placed', 'preparing', 'packed', 'out_for_delivery', 'delivered'];
  const currentIndex = Math.max(0, statusOrder.indexOf(order.orderStatus));

  const handleAdvanceStatus = () => {
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1] as CustomerOrder['orderStatus'];
      updateOrderStatus(order.id, nextStatus);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#FFF8ED] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8B94F]/30 z-10"
        >
          {/* Header */}
          <div className="p-5 bg-[#315B42] text-[#FFF8ED] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#E8B94F] uppercase tracking-wider font-semibold">
                Live Order Status
              </span>
              <h3 className="font-serif text-xl font-bold">
                Order #{order.orderNumber}
              </h3>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close tracking"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Status Tracker Body */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Estimated Time Card with Animated Pulsing Pill */}
            <div className="p-4 rounded-xl bg-[#FAF4E8] border border-[#E8B94F]/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-[#2C241F]/60">Estimated Fulfillment</span>
                <div className="font-serif text-2xl font-bold text-[#E9772B]">
                  {order.estimatedDeliveryTime}
                </div>
              </div>
              <div className="text-right text-xs text-[#2C241F]/70">
                <div className="flex items-center justify-end gap-1.5 font-medium text-[#315B42]">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="w-2 h-2 rounded-full bg-[#315B42]"
                  />
                  <span>Live Kitchen</span>
                </div>
                <p className="mt-0.5">Placed at {order.placedAt}</p>
              </div>
            </div>

            {/* Timeline Steps with Motion */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#315B42]">
                  Order Journey
                </h4>
                {currentIndex < statusOrder.length - 1 && (
                  <button
                    onClick={handleAdvanceStatus}
                    className="text-[11px] font-semibold text-[#E9772B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Simulate Next Stage</span>
                  </button>
                )}
              </div>

              <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8B94F]/30">
                {ORDER_STEPS.map((step, idx) => {
                  const isCompleted = idx <= Math.min(currentIndex, ORDER_STEPS.length - 1);
                  const isCurrent = idx === Math.min(currentIndex, ORDER_STEPS.length - 1);
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex items-start gap-4 relative z-10">
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                        transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                          isCompleted
                            ? 'bg-[#E9772B] text-white shadow-xs'
                            : 'bg-white border border-[#E8B94F]/40 text-[#2C241F]/40'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-semibold ${
                              isCurrent ? 'text-[#E9772B]' : isCompleted ? 'text-[#2C241F]' : 'text-[#2C241F]/40'
                            }`}
                          >
                            {step.label}
                          </span>
                          {isCompleted && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#315B42]" />
                          )}
                        </div>
                        <p className="text-xs text-[#2C241F]/60 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary & Items */}
            <div className="space-y-3 pt-3 border-t border-[#E8B94F]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#315B42]">
                Order Summary
              </h4>
              <div className="p-3.5 rounded-xl bg-white border border-[#E8B94F]/25 space-y-2 text-xs">
                {order.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-medium text-[#2C241F]">
                      {it.quantity}x {it.name}
                    </span>
                    <span className="font-mono text-[#2C241F] font-semibold">
                      ₹{it.unitPrice * it.quantity}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-bold text-sm text-[#2C241F]">
                  <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
                  <span className="font-mono text-[#E9772B]">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Outlet Details & Assistance */}
            <div className="p-4 rounded-xl bg-[#FAF4E8] border border-[#E8B94F]/30 space-y-2 text-xs text-[#2C241F]/80">
              <div className="font-semibold text-[#2C241F] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E9772B]" />
                <span>Fulfilled by {outlet.name}</span>
              </div>
              <p className="text-[11px] text-[#2C241F]/70">{outlet.address}</p>
              <div className="pt-1 flex items-center justify-between">
                <span>Need help with your order?</span>
                <a
                  href={`tel:${outlet.phone}`}
                  className="text-xs font-semibold text-[#315B42] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Kitchen</span>
                </a>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
