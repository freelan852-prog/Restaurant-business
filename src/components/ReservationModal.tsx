import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, Copy, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_OUTLETS } from '../data/restaurantData';
import { ReservationData } from '../types/restaurant';

const TIME_SLOTS = [
  { label: '07:30 AM', meal: 'Breakfast' },
  { label: '08:30 AM', meal: 'Breakfast' },
  { label: '09:30 AM', meal: 'Breakfast' },
  { label: '10:30 AM', meal: 'Morning Tiffin' },
  { label: '12:30 PM', meal: 'Lunch' },
  { label: '01:15 PM', meal: 'Lunch' },
  { label: '02:00 PM', meal: 'Lunch' },
  { label: '02:45 PM', meal: 'Lunch' },
  { label: '05:00 PM', meal: 'Teatime Kaapi' },
  { label: '07:00 PM', meal: 'Dinner' },
  { label: '07:45 PM', meal: 'Dinner' },
  { label: '08:30 PM', meal: 'Dinner' },
  { label: '09:15 PM', meal: 'Dinner' },
  { label: '10:00 PM', meal: 'Dinner' }
];

export const ReservationModal: React.FC = () => {
  const {
    isReservationOpen,
    setIsReservationOpen,
    selectedOutletId,
    setSelectedOutletId,
    addReservation
  } = useCart();

  // Form states
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const todayStr = new Date().toISOString().split('T')[0];
  const [resDate, setResDate] = useState(todayStr);
  const [partySize, setPartySize] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState('01:15 PM');
  const [seatingPref, setSeatingPref] = useState<'indoor-ac' | 'garden-verandah' | 'traditional-baithak' | 'any'>('indoor-ac');
  const [occasion, setOccasion] = useState('');
  
  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [formError, setFormError] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isReservationOpen) return null;

  const outlet = RESTAURANT_OUTLETS.find((o) => o.id === selectedOutletId) || RESTAURANT_OUTLETS[0];

  const handleProceedToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!resDate) {
      setFormError('Please select a date');
      return;
    }
    if (!selectedSlot) {
      setFormError('Please select a dining time slot');
      return;
    }
    setStep(2);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!guestName.trim()) {
      setFormError('Please enter your full name');
      return;
    }

    const cleanPhone = guestPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    const newRes: ReservationData = {
      id: `PR-RES-${Math.floor(10000 + Math.random() * 90000)}`,
      outletId: outlet.id,
      outletName: outlet.name,
      date: resDate,
      timeSlot: selectedSlot,
      partySize,
      guestName: guestName.trim(),
      guestPhone: cleanPhone,
      guestEmail: guestEmail.trim(),
      occasion: occasion || undefined,
      seatingPreference: seatingPref,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    addReservation(newRes);
    setConfirmedReservation(newRes);
    setStep(3);
  };

  const copyBookingId = () => {
    if (!confirmedReservation) return;
    navigator.clipboard.writeText(confirmedReservation.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setStep(1);
    setConfirmedReservation(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative bg-[#FFF8ED] rounded-t-3xl sm:rounded-2xl max-w-xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-[#E8B94F]/30 z-10 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 bg-[#315B42] text-[#FFF8ED] flex items-center justify-between shrink-0">
            <div>
              <span className="text-xs text-[#E8B94F] uppercase tracking-wider font-semibold">
                Dining Reservations
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Reserve Your Table
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close reservation dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Step Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                {formError}
              </div>
            )}

            {/* STEP 1: Date, Outlet, Party Size & Time Slot */}
            {step === 1 && (
              <form onSubmit={handleProceedToDetails} className="space-y-5">
                
                {/* Outlet Selector */}
                <div>
                  <label className="text-xs font-semibold text-[#2C241F]/80 block mb-1.5">
                    Select Restaurant Location
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {RESTAURANT_OUTLETS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setSelectedOutletId(o.id)}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer min-h-[44px] ${
                          selectedOutletId === o.id
                            ? 'border-[#E9772B] bg-[#E9772B]/10 text-[#2C241F] font-semibold'
                            : 'border-[#E8B94F]/30 bg-white hover:bg-[#FAF4E8] text-[#2C241F]/80'
                        }`}
                      >
                        <div className="text-xs font-serif leading-tight">{o.name}</div>
                        <div className="text-[11px] opacity-70 mt-0.5">{o.area}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Party Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#2C241F]/80 block mb-1.5">
                      Reservation Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#2C241F]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C241F]/80 block mb-1.5">
                      Party Size (Guests)
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#2C241F]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 font-medium cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Available Time Slots */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#2C241F]/80 block">
                    Available Time Slots ({outlet.area})
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlot === slot.label;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => setSelectedSlot(slot.label)}
                          className={`py-2 px-2.5 rounded-lg border text-center transition-colors cursor-pointer min-h-[44px] ${
                            isSelected
                              ? 'bg-[#315B42] text-white border-[#315B42] font-semibold shadow-xs'
                              : 'bg-white border-[#E8B94F]/30 text-[#2C241F]/80 hover:border-[#315B42]/50 hover:bg-[#FAF4E8]'
                          }`}
                        >
                          <div className="text-xs font-mono">{slot.label}</div>
                          <div className="text-[10px] opacity-70">{slot.meal}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="text-xs font-semibold text-[#2C241F]/80 block mb-1.5">
                    Seating Zone Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'indoor-ac', label: 'Indoor AC' },
                      { id: 'garden-verandah', label: 'Verandah' },
                      { id: 'traditional-baithak', label: 'Baithak' },
                      { id: 'any', label: 'First Available' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSeatingPref(s.id as any)}
                        className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer min-h-[44px] flex items-center justify-center ${
                          seatingPref === s.id
                            ? 'border-[#E9772B] bg-[#E9772B]/10 text-[#2C241F] font-semibold'
                            : 'border-[#E8B94F]/30 bg-white hover:bg-[#FAF4E8] text-[#2C241F]/70'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Step CTA with Safe Area */}
                <div className="pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 bg-[#E9772B] hover:bg-[#d5681f] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer min-h-[48px]"
                  >
                    Continue to Guest Details →
                  </motion.button>
                </div>
              </form>
            )}

            {/* STEP 2: Guest Information & Special Requests */}
            {step === 2 && (
              <form onSubmit={handleConfirmReservation} className="space-y-5">
                
                {/* Summary pill */}
                <div className="p-3 bg-[#FAF4E8] rounded-xl border border-[#E8B94F]/30 text-xs text-[#2C241F]/80 flex items-center justify-between">
                  <div>
                    <strong>{outlet.name}</strong> · {resDate} at {selectedSlot}
                    <div className="text-[11px] text-[#2C241F]/60">Party of {partySize} guests · {seatingPref}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#E9772B] font-semibold underline hover:text-[#d5681f] p-1"
                  >
                    Edit
                  </button>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#2C241F]/70 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#2C241F]/70 block mb-1">Mobile Number *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-xs font-medium text-gray-500 bg-gray-100 border border-r-0 border-[#E8B94F]/30 rounded-l-lg">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="9823012345"
                          className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[#2C241F]/70 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#2C241F]/70 block mb-1">Dining Occasion (Optional)</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30 cursor-pointer"
                    >
                      <option value="">Casual Dining / No specific occasion</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Business Breakfast">Business Breakfast</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#2C241F]/70 block mb-1">Special Notes / Accessibility</label>
                    <input
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. High chair for baby, quiet table, senior citizen wheelchair"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-[#E8B94F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9772B]/30"
                    />
                  </div>
                </div>

                {/* Action buttons with Safe Area */}
                <div className="flex items-center gap-3 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3.5 border border-[#E8B94F]/40 text-[#2C241F] text-xs font-semibold rounded-xl hover:bg-black/5 transition-colors cursor-pointer min-h-[48px]"
                  >
                    Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-3.5 bg-[#315B42] hover:bg-[#254633] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer min-h-[48px]"
                  >
                    Confirm Table Reservation
                  </motion.button>
                </div>

              </form>
            )}

            {/* STEP 3: Confirmed State Ticket */}
            {step === 3 && confirmedReservation && (
              <div className="space-y-6 text-center py-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#2C241F]">
                    Reservation Confirmed!
                  </h4>
                  <p className="text-xs text-[#2C241F]/70 mt-1">
                    We look forward to welcoming you and your family to {confirmedReservation.outletName}.
                  </p>
                </div>

                {/* Reservation Ticket Card */}
                <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#E8B94F]/40 shadow-sm text-left space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-[#2C241F]/60 text-[11px]">Booking Reference</span>
                      <div className="font-mono text-base font-bold text-[#E9772B]">
                        {confirmedReservation.id}
                      </div>
                    </div>
                    <button
                      onClick={copyBookingId}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50 text-[#2C241F]/80 cursor-pointer min-h-[36px]"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-[#2C241F]/80">
                    <div>
                      <span className="text-[#2C241F]/60 block text-[11px]">Guest Name</span>
                      <strong className="text-[#2C241F]">{confirmedReservation.guestName}</strong>
                    </div>
                    <div>
                      <span className="text-[#2C241F]/60 block text-[11px]">Party Size</span>
                      <strong className="text-[#2C241F]">{confirmedReservation.partySize} Guests</strong>
                    </div>
                    <div>
                      <span className="text-[#2C241F]/60 block text-[11px]">Date & Time</span>
                      <strong className="text-[#2C241F]">{confirmedReservation.date} at {confirmedReservation.timeSlot}</strong>
                    </div>
                    <div>
                      <span className="text-[#2C241F]/60 block text-[11px]">Seating Area</span>
                      <strong className="text-[#2C241F] capitalize">{confirmedReservation.seatingPreference}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-[11px] text-[#2C241F]/70">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#E9772B]" />
                    <span>{outlet.address}</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#2C241F]/60 space-y-1">
                  <p>We hold reserved tables for up to 15 minutes past your booking time.</p>
                  <p>For instant changes, call the branch concierge directly at {outlet.phone}.</p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 bg-[#315B42] hover:bg-[#254633] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[48px]"
                >
                  Done
                </button>

              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
