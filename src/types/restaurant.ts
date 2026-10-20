export type DietaryType = 'veg' | 'jain' | 'vegan';

export interface MenuItem {
  id: string;
  name: string;
  regionalName?: string;
  category: string;
  price: number;
  description: string;
  image: string;
  dietary: DietaryType;
  spiceLevel: 'mild' | 'medium' | 'spicy';
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  preparationTimeMinutes: number;
  ingredients: string[];
  customizable?: boolean;
  availableOptions?: {
    name: string;
    choices: { label: string; price: number }[];
  }[];
  isAvailable: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  dishCount: number;
}

export interface CartCustomization {
  [optionName: string]: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: CartCustomization;
  itemTotal: number;
  specialInstructions?: string;
}

export interface RestaurantOutlet {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  timings: string;
  seatingCapacity: number;
  features: string[];
  mapEmbedQuery: string;
  acceptsReservations: boolean;
  acceptsOnlineDelivery: boolean;
}

export interface ReservationData {
  id: string;
  outletId: string;
  outletName: string;
  date: string;
  timeSlot: string;
  partySize: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  occasion?: string;
  seatingPreference: 'indoor-ac' | 'garden-verandah' | 'traditional-baithak' | 'any';
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface OrderItemRecord {
  name: string;
  quantity: number;
  unitPrice: number;
  customizations?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  fulfillmentType: 'delivery' | 'pickup';
  outletId: string;
  outletName: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: {
    flatNo: string;
    street: string;
    locality: string;
    city: string;
    pincode: string;
  };
  items: OrderItemRecord[];
  subtotal: number;
  packagingCharge: number;
  gstAmount: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending_cod';
  orderStatus: 'placed' | 'confirmed' | 'preparing' | 'packed' | 'out_for_delivery' | 'delivered';
  placedAt: string;
  estimatedDeliveryTime: string;
  cookingInstructions?: string;
}
