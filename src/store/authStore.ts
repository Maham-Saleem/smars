import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedAddress {
  fullName: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  wishlist: number[];
  savedAddress: SavedAddress | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  saveAddress: (address: SavedAddress) => void;
  updateProfile: (updates: { name?: string; phone?: string }) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      wishlist: [],
      savedAddress: null,
      login: async (email, _password) => {
        await new Promise((r) => setTimeout(r, 800));
        set({ user: { id: '1', name: email.split('@')[0], email, phone: '' }, isAuthenticated: true });
        return true;
      },
      register: async (name, email, _password) => {
        await new Promise((r) => setTimeout(r, 800));
        set({ user: { id: '1', name, email, phone: '' }, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        });
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),
      saveAddress: (address) => set({ savedAddress: address }),
      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    { name: 'smars-auth' }
  )
);
