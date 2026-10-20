import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementStrip } from './components/AnnouncementStrip';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CombosSection } from './components/CombosSection';
import { StorySection } from './components/StorySection';
import { DiningGallery } from './components/DiningGallery';
import { LocationsSection } from './components/LocationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminPortal } from './components/AdminPortal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Toast } from './components/Toast';
import { CustomerOrder } from './types/restaurant';

// Reusable editorial scroll-reveal animation configuration
const sectionScrollReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const RestaurantAppContent: React.FC = () => {
  const { activeOrder, setActiveOrder, isCartOpen, isCheckoutOpen, isReservationOpen } = useCart();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Background body scroll lock to eliminate mobile scroll glitches when modals/drawers are open
  useEffect(() => {
    const isAnyModalOpen = isCartOpen || isCheckoutOpen || isReservationOpen || isTrackingOpen || isAdminOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isCartOpen, isCheckoutOpen, isReservationOpen, isTrackingOpen, isAdminOpen]);

  const handleOrderSuccess = (order: CustomerOrder) => {
    setActiveOrder(order);
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8ED] text-[#2C241F] selection:bg-[#E9772B]/20 selection:text-[#E9772B] w-full overflow-x-hidden">
      {/* Dynamic Announcement Banner */}
      <AnnouncementStrip />

      {/* Primary Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrderTracking={() => setIsTrackingOpen(true)}
      />

      {/* Main Content Sections with Smooth Scroll-Reveal Motion Wrappers */}
      <main className="flex-1 pb-24 lg:pb-0 overflow-hidden w-full">
        {/* Section B: Hero (Entrance Animated) */}
        <Hero />

        {/* Section C & D & Dedicated Interactive Menu */}
        <motion.div
          variants={sectionScrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <MenuSection />
        </motion.div>

        {/* Section E: Combos & Meal Experiences */}
        <motion.div
          variants={sectionScrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <CombosSection />
        </motion.div>

        {/* Section F & G: Our Story, Culinary Values & Hospitality Pillars */}
        <motion.div
          variants={sectionScrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <StorySection />
        </motion.div>

        {/* Section H: Gallery & Atmosphere */}
        <motion.div
          variants={sectionScrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <DiningGallery />
        </motion.div>

        {/* Section I & J: Table Booking CTA & Pune Outlets */}
        <motion.div
          variants={sectionScrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <LocationsSection />
        </motion.div>

        {/* Section K: Diner Feedback & Testimonials */}
        <motion.div
          variants={sectionScrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <TestimonialsSection />
        </motion.div>
      </main>

      {/* Section L: Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Persistent Mobile Bottom Action Bar */}
      <MobileBottomBar />

      {/* Interactive Modals & Drawers */}
      <CartDrawer />
      
      <CheckoutModal onOrderSuccess={handleOrderSuccess} />

      <ReservationModal />

      <OrderTrackingModal
        order={activeOrder}
        onClose={() => setIsTrackingOpen(false)}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Interactive Toast Notification */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <RestaurantAppContent />
    </CartProvider>
  );
}
