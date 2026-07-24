import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserReview {
  id: number;
  productId: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface ReviewStore {
  userReviews: UserReview[];
  addReview: (review: Omit<UserReview, 'id' | 'date'>) => void;
  getProductReviews: (productId: number) => UserReview[];
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      userReviews: [],
      addReview: (review) => {
        const newReview: UserReview = {
          ...review,
          id: Date.now(),
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        };
        set((state) => ({ userReviews: [newReview, ...state.userReviews] }));
      },
      getProductReviews: (productId) =>
        get().userReviews.filter((r) => r.productId === productId),
    }),
    { name: 'smars-reviews' }
  )
);
