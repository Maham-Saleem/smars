import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';
import { products } from '../data/products';

const MAX_VIEWED = 8;

interface RecentStore {
  recentIds: number[];
  addRecentView: (id: number) => void;
  getRecentProducts: () => Product[];
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set, get) => ({
      recentIds: [],
      addRecentView: (id) => {
        const existing = get().recentIds;
        const filtered = existing.filter((i) => i !== id);
        set({ recentIds: [id, ...filtered].slice(0, MAX_VIEWED) });
      },
      getRecentProducts: () => {
        return get().recentIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
      },
    }),
    { name: 'smars-recent' }
  )
);
