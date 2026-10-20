import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, ShoppingBag, Calendar, Utensils, CheckCircle, Clock, MapPin, Edit3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_OUTLETS } from '../data/restaurantData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    ordersList,
    updateOrderStatus,
    reservationsList,
    updateReservationStatus,
    menuItems,
    toggleMenuItemAvailability,
    updateMenuItemPrice
  } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu' | 'outlets'>('orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.trim() === 'staff') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. For demo access, use PIN: 1234');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative bg-[#FFF8ED] rounded-t-3xl sm:rounded-2xl max-w-4xl w-full max-h-[94vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-[#E8B94F]/30 z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#2C241F] text-[#FFF8ED] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E9772B] flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold">
                  Restaurant Staff & Kitchen Console
                </h3>
                <p className="text-[11px] text-[#E8B94F]">
                  Parampara Rasoi Management System
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close admin portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Staff Authentication Screen */
            <div className="p-6 sm:p-8 text-center max-w-sm mx-auto space-y-4 my-auto pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
              <div className="w-12 h-12 rounded-full bg-[#E8B94F]/20 text-[#2C241F] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-[#E9772B]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#2C241F]">
                  Staff Passkey Required
                </h4>
                <p className="text-xs text-[#2C241F]/70 mt-1">
                  Enter your staff terminal authorization PIN.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Demo: 1234)"
                  className="w-full text-center tracking-widest font-mono text-xl py-3 bg-white border border-[#E8B94F]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E9772B]"
                />
                {pinError && <p className="text-xs text-red-600 font-medium">{pinError}</p>}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E9772B] hover:bg-[#d5681f] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[48px]"
                >
                  Unlock Staff Console
                </button>
                <div className="text-[11px] text-[#2C241F]/60">
                  Staff Demo Passcode: <span className="font-mono font-bold text-[#2C241F]">1234</span>
                </div>
              </form>
            </div>
          ) : (
            /* Staff Console Tabs & Data */
            <div className="flex flex-col flex-1 overflow-hidden">
              
              {/* Navigation Tabs (Horizontal scroll on mobile) */}
              <div className="flex items-center gap-1.5 p-2 bg-[#FAF4E8] border-b border-[#E8B94F]/25 text-xs font-medium overflow-x-auto no-scrollbar shrink-0">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
                    activeTab === 'orders'
                      ? 'bg-[#315B42] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F] hover:bg-black/5'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Orders ({ordersList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`px-3.5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
                    activeTab === 'reservations'
                      ? 'bg-[#315B42] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F] hover:bg-black/5'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bookings ({reservationsList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-3.5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
                    activeTab === 'menu'
                      ? 'bg-[#315B42] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F] hover:bg-black/5'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Menu & Stock</span>
                </button>

                <button
                  onClick={() => setActiveTab('outlets')}
                  className={`px-3.5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
                    activeTab === 'outlets'
                      ? 'bg-[#315B42] text-white shadow-xs'
                      : 'text-[#2C241F]/70 hover:text-[#2C241F] hover:bg-black/5'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kitchens</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
                
                {/* TAB 1: Live Orders */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base sm:text-lg text-[#2C241F]">Customer Orders Queue</h4>
                      <span className="text-[11px] text-[#2C241F]/60">Real-time updates</span>
                    </div>

                    {ordersList.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[#2C241F]/60 bg-white rounded-xl border border-[#E8B94F]/30">
                        No incoming customer orders yet. Place an order through the website to test live tracking!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {ordersList.map((order) => (
                          <div
                            key={order.id}
                            className="p-4 bg-white rounded-xl border border-[#E8B94F]/30 shadow-xs space-y-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                              <div>
                                <span className="font-mono font-bold text-sm text-[#2C241F]">
                                  #{order.orderNumber}
                                </span>
                                <span className="text-[11px] text-[#2C241F]/60 ml-2">
                                  {order.placedAt} · {order.outletName}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#2C241F]/70">Status:</span>
                                <select
                                  value={order.orderStatus}
                                  onChange={(e) =>
                                    updateOrderStatus(order.id, e.target.value as any)
                                  }
                                  className="text-xs bg-[#FAF4E8] font-semibold border border-[#E8B94F]/40 rounded-lg px-2.5 py-1.5 text-[#2C241F] focus:outline-none cursor-pointer min-h-[36px]"
                                >
                                  <option value="placed">Order Placed</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="preparing">Kitchen Preparing</option>
                                  <option value="packed">Freshly Packed</option>
                                  <option value="out_for_delivery">Out for Delivery</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#2C241F]/80">
                              <div>
                                <span className="text-[#2C241F]/60 block text-[11px]">Customer & Contact</span>
                                <strong>{order.customerName}</strong> ({order.customerPhone})
                                {order.deliveryAddress && (
                                  <p className="text-[11px] text-[#2C241F]/70 mt-0.5">
                                    {order.deliveryAddress.flatNo}, {order.deliveryAddress.street}, {order.deliveryAddress.locality} ({order.deliveryAddress.pincode})
                                  </p>
                                )}
                              </div>
                              <div>
                                <span className="text-[#2C241F]/60 block text-[11px]">Items Ordered</span>
                                <ul className="space-y-0.5">
                                  {order.items.map((it, i) => (
                                    <li key={i}>
                                      {it.quantity}x {it.name} — ₹{it.unitPrice * it.quantity}
                                    </li>
                                  ))}
                                </ul>
                                <div className="font-mono font-bold text-[#E9772B] mt-1">
                                  Total: ₹{order.totalAmount} ({order.paymentMethod.toUpperCase()})
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: Reservations */}
                {activeTab === 'reservations' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base sm:text-lg text-[#2C241F]">Table Reservations Log</h4>
                      <span className="text-[11px] text-[#2C241F]/60">Manage guest seatings</span>
                    </div>

                    {reservationsList.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[#2C241F]/60 bg-white rounded-xl border border-[#E8B94F]/30">
                        No table bookings recorded yet. Use the "Book Table" button to submit a reservation.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {reservationsList.map((res) => (
                          <div
                            key={res.id}
                            className="p-4 bg-white rounded-xl border border-[#E8B94F]/30 shadow-xs space-y-2.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                              <div>
                                <span className="font-mono font-bold text-sm text-[#E9772B]">
                                  {res.id}
                                </span>
                                <span className="text-[11px] text-[#2C241F]/70 ml-2">
                                  {res.outletName} · {res.date} at {res.timeSlot}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                                    res.status === 'confirmed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {res.status}
                                </span>
                                {res.status === 'confirmed' ? (
                                  <button
                                    onClick={() => updateReservationStatus(res.id, 'cancelled')}
                                    className="text-xs text-red-600 hover:underline min-h-[36px] flex items-center"
                                  >
                                    Cancel Booking
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => updateReservationStatus(res.id, 'confirmed')}
                                    className="text-xs text-emerald-700 hover:underline min-h-[36px] flex items-center"
                                  >
                                    Re-confirm
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#2C241F]/80">
                              <div>
                                <span className="text-[#2C241F]/60 block text-[11px]">Guest</span>
                                <strong>{res.guestName}</strong>
                              </div>
                              <div>
                                <span className="text-[#2C241F]/60 block text-[11px]">Contact</span>
                                <span>+91 {res.guestPhone}</span>
                              </div>
                              <div>
                                <span className="text-[#2C241F]/60 block text-[11px]">Party Size</span>
                                <span>{res.partySize} Guests</span>
                              </div>
                              <div>
                                <span className="text-[#2C241F]/60 block text-[11px]">Seating Zone</span>
                                <span className="capitalize">{res.seatingPreference}</span>
                              </div>
                            </div>

                            {res.specialRequests && (
                              <div className="text-[11px] text-[#2C241F]/70 italic bg-[#FAF4E8] p-2 rounded">
                                Special Request: "{res.specialRequests}"
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: Menu & Inventory */}
                {activeTab === 'menu' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base sm:text-lg text-[#2C241F]">Dish Availability & Pricing</h4>
                      <span className="text-[11px] text-[#2C241F]/60">Live customer menu updates</span>
                    </div>

                    <div className="space-y-2">
                      {menuItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-white rounded-xl border border-[#E8B94F]/30 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.dataset.triedFallback) {
                                  target.dataset.triedFallback = 'true';
                                  target.src = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80';
                                }
                              }}
                            />
                            <div className="min-w-0">
                              <h5 className="font-serif font-bold text-[#2C241F] truncate">
                                {item.name}
                              </h5>
                              <span className="text-[10px] text-[#2C241F]/60">
                                {item.category} · Prep {item.preparationTimeMinutes}m
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {editingPriceId === item.id ? (
                              <div className="flex items-center gap-1">
                                <span className="font-mono">₹</span>
                                <input
                                  type="number"
                                  value={newPrice}
                                  onChange={(e) => setNewPrice(Number(e.target.value))}
                                  className="w-14 px-1 py-1 border rounded text-xs font-mono font-bold"
                                />
                                <button
                                  onClick={() => {
                                    updateMenuItemPrice(item.id, newPrice);
                                    setEditingPriceId(null);
                                  }}
                                  className="px-2 py-1 bg-[#315B42] text-white rounded text-[11px] min-h-[36px]"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span className="font-mono font-bold text-sm text-[#2C241F]">
                                  ₹{item.price}
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingPriceId(item.id);
                                    setNewPrice(item.price);
                                  }}
                                  className="text-gray-400 hover:text-[#2C241F] p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center"
                                  title="Edit price"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            <button
                              onClick={() => toggleMenuItemAvailability(item.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer min-h-[36px] flex items-center justify-center ${
                                item.isAvailable
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              {item.isAvailable ? 'In Stock' : 'Sold Out'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: Outlets Overview */}
                {activeTab === 'outlets' && (
                  <div className="space-y-4">
                    <h4 className="font-serif text-base sm:text-lg text-[#2C241F]">Operating Kitchen Locations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {RESTAURANT_OUTLETS.map((o) => (
                        <div
                          key={o.id}
                          className="p-4 bg-white rounded-xl border border-[#E8B94F]/30 space-y-2"
                        >
                          <h5 className="font-serif font-bold text-sm text-[#2C241F]">{o.name}</h5>
                          <p className="text-[#2C241F]/70">{o.address}</p>
                          <div className="text-[11px] text-[#315B42] font-semibold pt-1">
                            Hours: {o.timings}
                          </div>
                          <div className="text-[11px] text-[#2C241F]/60">
                            Capacity: {o.seatingCapacity} seats
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
