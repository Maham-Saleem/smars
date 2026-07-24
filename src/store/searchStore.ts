import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_RECENT = 8;

interface SearchStore {
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      addRecentSearch: (term) => {
        const trimmed = term.trim();
        if (!trimmed) return;
        const existing = get().recentSearches;
        const filtered = existing.filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
        set({ recentSearches: [trimmed, ...filtered].slice(0, MAX_RECENT) });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    { name: 'smars-search' }
  )
);
