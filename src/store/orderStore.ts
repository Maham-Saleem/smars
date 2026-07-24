import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  saveAddress: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  shippingDetails: ShippingDetails;
  status: string;
  date: string;
  estimatedDelivery: string;
  giftMessage?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByUser: () => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      getOrderById: (id) => get().orders.find((o) => o.id === id),
      getOrdersByUser: () => get().orders,
    }),
    { name: 'smars-orders' }
  )
);

export function generateOrderId(): string {
  const rand = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `SMARS-${rand}`;
}

export function estimateDeliveryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 5 + Math.floor(Math.random() * 5));
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
