import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartCustomization, MenuItem, CustomerOrder, ReservationData } from '../types/restaurant';
import { MENU_ITEMS, RESTAURANT_OUTLETS } from '../data/restaurantData';

interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minOrder: number;
  description: string;
}

const VALID_COUPONS: Coupon[] = [
  { code: 'FIRST50', discountFixed: 50, minOrder: 200, description: '₹50 flat off on orders above ₹200' },
  { code: 'FEAST100', discountFixed: 100, minOrder: 450, description: '₹100 flat off on orders above ₹450' },
  { code: 'PARAMPARA15', discountPercent: 15, minOrder: 300, description: '15% off up to ₹120 on orders above ₹300' }
];

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, customizations?: CartCustomization, instructions?: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  packagingCharge: number;
  gstAmount: number;
  deliveryFee: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  grandTotal: number;
  fulfillmentType: 'delivery' | 'pickup';
  setFulfillmentType: (type: 'delivery' | 'pickup') => void;
  selectedOutletId: string;
  setSelectedOutletId: (id: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  activeOrder: CustomerOrder | null;
  setActiveOrder: (order: CustomerOrder | null) => void;
  ordersList: CustomerOrder[];
  reservationsList: ReservationData[];
  addOrder: (order: CustomerOrder) => void;
  addReservation: (reservation: ReservationData) => void;
  updateOrderStatus: (orderId: string, status: CustomerOrder['orderStatus']) => void;
  updateReservationStatus: (reservationId: string, status: ReservationData['status']) => void;
  menuItems: MenuItem[];
  toggleMenuItemAvailability: (id: string) => void;
  updateMenuItemPrice: (id: string, newPrice: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('parampara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedOutletId, setSelectedOutletId] = useState<string>(RESTAURANT_OUTLETS[0].id);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Active orders and reservations stored in localStorage
  const [ordersList, setOrdersList] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('parampara_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<CustomerOrder | null>(() => {
    try {
      const saved = localStorage.getItem('parampara_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [reservationsList, setReservationsList] = useState<ReservationData[]>(() => {
    try {
      const saved = localStorage.getItem('parampara_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  // Dynamic menu items (allows staff admin to toggle availability & prices)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('parampara_menu');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('parampara_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('parampara_orders', JSON.stringify(ordersList));
    } catch (e) {
      console.warn('Could not save orders', e);
    }
  }, [ordersList]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('parampara_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('parampara_active_order');
      }
    } catch (e) {
      console.warn('Could not save active order', e);
    }
  }, [activeOrder]);

  useEffect(() => {
    try {
      localStorage.setItem('parampara_reservations', JSON.stringify(reservationsList));
    } catch (e) {
      console.warn('Could not save reservations', e);
    }
  }, [reservationsList]);

  useEffect(() => {
    try {
      localStorage.setItem('parampara_menu', JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Could not save menu', e);
    }
  }, [menuItems]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    customizations?: CartCustomization,
    instructions?: string
  ) => {
    const customKey = customizations ? JSON.stringify(customizations) : '';
    const itemUniqueId = `${item.id}-${customKey}`;

    // Calculate extra costs if any from customization
    let extraCost = 0;
    if (customizations && item.availableOptions) {
      for (const [optionName, selectedChoice] of Object.entries(customizations)) {
        const option = item.availableOptions.find((o) => o.name === optionName);
        if (option) {
          const choice = option.choices.find((c) => c.label === selectedChoice);
          if (choice) extraCost += choice.price;
        }
      }
    }

    const unitPrice = item.price + extraCost;

    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === itemUniqueId);
      if (existing) {
        return prev.map((c) =>
          c.id === itemUniqueId
            ? {
                ...c,
                quantity: c.quantity + quantity,
                itemTotal: (c.quantity + quantity) * unitPrice,
                specialInstructions: instructions || c.specialInstructions
              }
            : c
        );
      }
      return [
        ...prev,
        {
          id: itemUniqueId,
          menuItem: item,
          quantity,
          customizations,
          itemTotal: quantity * unitPrice,
          specialInstructions: instructions
        }
      ];
    });

    showToast(`Added ${quantity}x ${item.name} to your basket`);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const unitPrice = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            itemTotal: newQuantity * unitPrice
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  const packagingCharge = cartItems.length > 0 ? 15 : 0;
  const gstAmount = Math.round(subtotal * 0.05);
  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 499 || subtotal === 0 ? 0 : 35) : 0;

  let discount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrder) {
      if (appliedCoupon.discountFixed) {
        discount = appliedCoupon.discountFixed;
      } else if (appliedCoupon.discountPercent) {
        discount = Math.min(120, Math.round((subtotal * appliedCoupon.discountPercent) / 100));
      }
    }
  }

  const grandTotal = Math.max(0, subtotal + packagingCharge + gstAmount + deliveryFee - discount);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try FIRST50 or FEAST100' };
    }
    if (subtotal < found.minOrder) {
      return { success: false, message: `Minimum order of ₹${found.minOrder} required for ${found.code}` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addOrder = (order: CustomerOrder) => {
    setOrdersList((prev) => [order, ...prev]);
    setActiveOrder(order);
  };

  const addReservation = (reservation: ReservationData) => {
    setReservationsList((prev) => [reservation, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['orderStatus']) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, orderStatus: status } : null));
    }
  };

  const updateReservationStatus = (reservationId: string, status: ReservationData['status']) => {
    setReservationsList((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status } : r))
    );
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const updateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        packagingCharge,
        gstAmount,
        deliveryFee,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        grandTotal,
        fulfillmentType,
        setFulfillmentType,
        selectedOutletId,
        setSelectedOutletId,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        activeOrder,
        setActiveOrder,
        ordersList,
        reservationsList,
        addOrder,
        addReservation,
        updateOrderStatus,
        updateReservationStatus,
        menuItems,
        toggleMenuItemAvailability,
        updateMenuItemPrice,
        toastMessage,
        showToast,
        hideToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
