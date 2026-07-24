import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  description: string;
}

const VALID_COUPONS: Coupon[] = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minPurchase: 0, description: '10% off your first order' },
  { code: 'SMARS20', type: 'percentage', value: 20, minPurchase: 100, description: '20% off orders over $100' },
  { code: 'FREESHIP', type: 'fixed', value: 15, minPurchase: 0, description: '$15 off standard shipping' },
  { code: 'VIP50', type: 'fixed', value: 50, minPurchase: 200, description: '$50 off orders over $200' },
  { code: 'AMBER15', type: 'percentage', value: 15, minPurchase: 75, description: '15% off orders over $75' },
];

interface CouponStore {
  appliedCode: string | null;
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

export const useCouponStore = create<CouponStore>()(
  persist(
    (set, get) => ({
      appliedCode: null,
      activeCoupon: null,
      applyCoupon: (code) => {
        const coupon = VALID_COUPONS.find((c) => c.code === code.toUpperCase().trim());
        if (!coupon) {
          return { success: false, message: 'Invalid coupon code. Please try again.' };
        }
        set({ appliedCode: coupon.code, activeCoupon: coupon });
        return { success: true, message: `Coupon "${coupon.code}" applied! ${coupon.description}` };
      },
      removeCoupon: () => set({ appliedCode: null, activeCoupon: null }),
      calculateDiscount: (subtotal) => {
        const { activeCoupon } = get();
        if (!activeCoupon) return 0;
        if (subtotal < activeCoupon.minPurchase) return 0;
        if (activeCoupon.type === 'percentage') return subtotal * (activeCoupon.value / 100);
        return activeCoupon.value;
      },
    }),
    { name: 'smars-coupon' }
  )
);
