import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Bike, Store, CreditCard, QrCode, Banknote, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_OUTLETS } from '../data/restaurantData';
import { CustomerOrder, OrderItemRecord } from '../types/restaurant';

interface CheckoutModalProps {
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const {
    cartItems,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    subtotal,
    packagingCharge,
    gstAmount,
    deliveryFee,
    discount,
    grandTotal,
    fulfillmentType,
    selectedOutletId,
    addOrder
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [street, setStreet] = useState('');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('411004');
  const [cookingNotes, setCookingNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const currentOutlet = RESTAURANT_OUTLETS.find((o) => o.id === selectedOutletId) || RESTAURANT_OUTLETS[0];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (fulfillmentType === 'delivery') {
      if (!flatNo.trim() || !street.trim() || !locality.trim()) {
        setErrorMessage('Please enter your complete delivery address');
        return;
      }
      if (pincode.trim().length !== 6) {
        setErrorMessage('Please enter a valid 6-digit Pune PIN code');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `PR-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderItems: OrderItemRecord[] = cartItems.map((c) => ({
        name: c.menuItem.name,
        quantity: c.quantity,
        unitPrice: c.itemTotal / c.quantity,
        customizations: c.customizations ? JSON.stringify(c.customizations) : undefined
      }));

      const newOrder: CustomerOrder = {
        id: `ord-${Date.now()}`,
        orderNumber,
        fulfillmentType,
        outletId: currentOutlet.id,
        outletName: currentOutlet.name,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        deliveryAddress:
          fulfillmentType === 'delivery'
            ? {
                flatNo,
                street,
                locality,
                city: 'Pune',
                pincode
              }
            : undefined,
        items: orderItems,
        subtotal,
        packagingCharge,
        gstAmount,
        deliveryFee,
        discount,
        totalAmount: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
        orderStatus: 'placed',
        placedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        estimatedDeliveryTime: fulfillmentType === 'delivery' ? '30-40 mins' : '15-20 mins',
        cookingInstructions: cookingNotes.trim() || undefined
      };

      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      onOrderSuccess(newOrder);
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative bg-[#FFF8ED] rounded-t-3xl sm:rounded-2xl max-w-xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-[#E8B94F]/30 z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#FAF4E8] border-b border-[#E8B94F]/25 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C241F]">
                Confirm Your Order
              </h3>
              <p className="text-xs text-[#315B42] font-medium mt-0.5">
                {fulfillmentType === 'delivery' ? 'Doorstep Delivery' : 'Express Counter Pickup'} · {currentOutlet.name}
              </p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full text-[#2C241F]/60 hover:text-[#2C241F] hover:bg-black/5 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Form Body */}
          <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                {errorMessage}
              </div>
            )}

            {/* Section 1: Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#315B42]">
                1. Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#2C241F]/70 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#2C241F]/70 block mb-1">Indian Mobile Number *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-medium text-gray-500 bg-gray-100 border border-r-0 border-[#E8B94F]/30 rounded-l-lg">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9823012345"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Address (If Delivery) */}
            {fulfillmentType === 'delivery' ? (
              <div className="space-y-3 pt-2 border-t border-[#E8B94F]/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#315B42]">
                    2. Pune Delivery Address
                  </h4>
                  <span className="text-[11px] text-[#2C241F]/60 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E9772B]" />
                    <span>Est: 30-40 mins</span>
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#2C241F]/70 block mb-1">Flat / House / Wing *</label>
                      <input
                        type="text"
                        required
                        value={flatNo}
                        onChange={(e) => setFlatNo(e.target.value)}
                        placeholder="e.g. Flat 402, Anand Baug"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#2C241F]/70 block mb-1">Street / Building *</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. Gulmohar Path"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#2C241F]/70 block mb-1">Area / Locality *</label>
                      <input
                        type="text"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Deccan Gymkhana"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#2C241F]/70 block mb-1">Pune PIN Code *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="411004"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-emerald-700" />
                  <span>Pickup Counter Location:</span>
                </div>
                <p>{currentOutlet.address}</p>
                <p className="text-[11px] text-emerald-700">Ready in approximately 15-20 minutes after order placement.</p>
              </div>
            )}

            {/* Section 3: Kitchen Instructions */}
            <div className="space-y-1.5 pt-2 border-t border-[#E8B94F]/20">
              <label className="text-xs font-semibold text-[#2C241F]/70">
                Cooking or Delivery Notes (Optional)
              </label>
              <input
                type="text"
                value={cookingNotes}
                onChange={(e) => setCookingNotes(e.target.value)}
                placeholder="e.g. Ring bell once, no plastic cutlery needed"
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
              />
            </div>

            {/* Section 4: Payment Method */}
            <div className="space-y-3 pt-2 border-t border-[#E8B94F]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#315B42]">
                3. Payment Method
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer flex sm:flex-col justify-between items-center sm:items-start transition-colors min-h-[44px] ${
                    paymentMethod === 'upi'
                      ? 'border-[#E9772B] bg-[#E9772B]/10 text-[#2C241F]'
                      : 'border-[#E8B94F]/30 bg-white hover:bg-[#FAF4E8]'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:justify-between sm:w-full sm:mb-2">
                    <QrCode className="w-5 h-5 text-[#E9772B]" />
                    <span className="font-semibold sm:hidden">UPI Instant</span>
                  </div>
                  <div>
                    <div className="font-semibold hidden sm:block">UPI Instant</div>
                    <div className="text-[11px] opacity-70">GPay / PhonePe / QR</div>
                  </div>
                  {paymentMethod === 'upi' && <CheckCircle className="w-4 h-4 text-[#E9772B] shrink-0" />}
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer flex sm:flex-col justify-between items-center sm:items-start transition-colors min-h-[44px] ${
                    paymentMethod === 'card'
                      ? 'border-[#E9772B] bg-[#E9772B]/10 text-[#2C241F]'
                      : 'border-[#E8B94F]/30 bg-white hover:bg-[#FAF4E8]'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:justify-between sm:w-full sm:mb-2">
                    <CreditCard className="w-5 h-5 text-[#315B42]" />
                    <span className="font-semibold sm:hidden">Cards / Netbanking</span>
                  </div>
                  <div>
                    <div className="font-semibold hidden sm:block">Cards / Netbanking</div>
                    <div className="text-[11px] opacity-70">Visa / Mastercard / RuPay</div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle className="w-4 h-4 text-[#E9772B] shrink-0" />}
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer flex sm:flex-col justify-between items-center sm:items-start transition-colors min-h-[44px] ${
                    paymentMethod === 'cod'
                      ? 'border-[#E9772B] bg-[#E9772B]/10 text-[#2C241F]'
                      : 'border-[#E8B94F]/30 bg-white hover:bg-[#FAF4E8]'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:justify-between sm:w-full sm:mb-2">
                    <Banknote className="w-5 h-5 text-[#E8B94F]" />
                    <span className="font-semibold sm:hidden">
                      {fulfillmentType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold hidden sm:block">
                      {fulfillmentType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                    </div>
                    <div className="text-[11px] opacity-70">Cash or UPI on arrival</div>
                  </div>
                  {paymentMethod === 'cod' && <CheckCircle className="w-4 h-4 text-[#E9772B] shrink-0" />}
                </label>
              </div>
            </div>

            {/* Bill summary review before submission */}
            <div className="p-4 bg-[#FAF4E8] rounded-xl border border-[#E8B94F]/30 space-y-1.5 text-xs text-[#2C241F]/80">
              <div className="flex justify-between">
                <span>Item Subtotal ({cartItems.length} items)</span>
                <span className="font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging & Taxes</span>
                <span className="font-mono">₹{packagingCharge + gstAmount}</span>
              </div>
              {fulfillmentType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount Applied</span>
                  <span className="font-mono">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#2C241F] pt-2 border-t border-[#E8B94F]/25">
                <span>Final Payable Amount</span>
                <span className="font-mono text-[#E9772B]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Trust notice */}
            <div className="flex items-center gap-2 text-[11px] text-[#2C241F]/60">
              <ShieldCheck className="w-4 h-4 text-[#315B42] shrink-0" />
              <span>Secure 256-bit encrypted checkout · Contactless packaging</span>
            </div>

            {/* Submit Button with Safe Area Margin */}
            <div className="pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E9772B] active:bg-[#d5681f] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[48px]"
              >
                {isSubmitting ? (
                  <span>Preparing Your Order...</span>
                ) : (
                  <span>Place Order · ₹{grandTotal}</span>
                )}
              </motion.button>
            </div>

          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
