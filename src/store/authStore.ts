import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  wishlist: number[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      wishlist: [],
      login: async (email, _password) => {
        await new Promise((r) => setTimeout(r, 800));
        set({ user: { id: '1', name: email.split('@')[0], email }, isAuthenticated: true });
        return true;
      },
      register: async (name, email, _password) => {
        await new Promise((r) => setTimeout(r, 800));
        set({ user: { id: '1', name, email }, isAuthenticated: true });
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
    }),
    { name: 'smars-auth' }
  )
);
