import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineHeart, HiOutlineShoppingBag, HiChevronLeft, HiMinus, HiPlus } from 'react-icons/hi';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { useReviewStore } from '../store/reviewStore';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'reviews'>('description');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist, isAuthenticated, user } = useAuthStore();
  const { openAuth, setPendingProduct } = useUIStore();
  const { addReview, getProductReviews } = useReviewStore();

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="font-heading text-2xl text-dark-brown mb-4">Fragrance not found</p>
          <Link to="/shop" className="text-champagne-gold hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-20 lg:pt-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-dark-brown/50 hover:text-champagne-gold transition-colors mb-8">
          <HiChevronLeft size={18} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white group">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button className="absolute inset-0 cursor-crosshair" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-3">{product.category}</p>
            <h1 className="font-heading text-4xl lg:text-5xl text-dark-brown">{product.name}</h1>
            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <HiStar key={i} size={18} className={i < Math.floor(product.rating) ? 'text-champagne-gold' : 'text-dark-brown/20'} />
              ))}
              <span className="text-sm text-dark-brown/50 ml-2">{product.rating} ({product.reviews.length} reviews)</span>
            </div>
            <p className="font-heading text-3xl text-dark-brown mt-6">${product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-dark-brown/40 line-through mt-1">${product.originalPrice}</p>
            )}
            <p className="text-dark-brown/70 mt-6 leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <h4 className="text-xs tracking-wider uppercase text-dark-brown/50 mb-3">Fragrance Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.fragranceNotes.map((note) => (
                  <span key={note} className="px-4 py-2 bg-dark-brown/5 text-dark-brown/70 text-sm rounded-full">{note}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-dark-brown/20 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-dark-brown/5 transition-colors">
                  <HiMinus size={16} />
                </button>
                <span className="px-4 py-3 font-body text-sm min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-dark-brown/5 transition-colors">
                  <HiPlus size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    addItem(product, quantity);
                    toast.success('Added to your shopping bag.');
                  } else {
                    setPendingProduct(product);
                    openAuth();
                  }
                }}
                className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
              >
                <HiOutlineShoppingBag size={18} />
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
              <button
                onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? 'Added to wishlist' : 'Removed from wishlist'); }}
                className={`w-12 h-12 rounded-lg border transition-all flex items-center justify-center ${
                  isInWishlist(product.id) ? 'bg-champagne-gold border-champagne-gold text-deep-coffee' : 'border-dark-brown/20 text-dark-brown/50 hover:border-dark-brown'
                }`}
              >
                <HiOutlineHeart size={20} />
              </button>
            </div>

            <div className="mt-8 border-t border-dark-brown/10 pt-8">
              <div className="flex gap-6 border-b border-dark-brown/10">
                {(['description', 'notes', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm tracking-wider uppercase transition-colors ${
                      activeTab === tab ? 'text-dark-brown border-b-2 border-dark-brown' : 'text-dark-brown/40 hover:text-dark-brown/70'
                    }`}
                  >
                    {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                {activeTab === 'description' && (
                  <div className="space-y-4 text-dark-brown/70 leading-relaxed">
                    <p>{product.description}</p>
                    <h4 className="font-heading text-lg text-dark-brown mt-6 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {product.ingredients.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'notes' && (
                  <div className="grid grid-cols-2 gap-3">
                    {product.fragranceNotes.map((note) => (
                      <div key={note} className="px-4 py-3 bg-dark-brown/5 rounded-lg text-dark-brown/70 text-sm">{note}</div>
                    ))}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {isAuthenticated && (
                      <div className="bg-warm-beige/50 rounded-xl p-6 mb-6">
                        <h4 className="font-heading text-dark-brown text-sm mb-3">Write a Review</h4>
                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => setReviewForm({ ...reviewForm, rating: star })} type="button" aria-label={`Rate ${star} stars`}>
                              <HiStar size={20} className={star <= reviewForm.rating ? 'text-champagne-gold' : 'text-dark-brown/20'} />
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          placeholder="Share your experience with this fragrance..."
                          rows={3}
                          className="w-full px-4 py-3 bg-cream border border-dark-brown/10 rounded-lg text-sm text-dark-brown outline-none focus:border-champagne-gold transition-colors resize-none placeholder:text-dark-brown/30 font-light"
                        />
                        <button
                          onClick={() => {
                            if (!reviewForm.comment.trim()) { toast.error('Please write a review.'); return; }
                            setSubmittingReview(true);
                            addReview({ productId: product.id, name: user?.name || 'Guest', rating: reviewForm.rating, comment: reviewForm.comment.trim() });
                            setReviewForm({ rating: 5, comment: '' });
                            setSubmittingReview(false);
                            toast.success('Review submitted. Thank you!');
                          }}
                          disabled={submittingReview}
                          className="mt-3 px-6 py-2 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm disabled:opacity-40"
                        >
                          {submittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </div>
                    )}
                    {getProductReviews(product.id).length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-dark-brown/40 tracking-wider uppercase font-body">Your Reviews</p>
                        <div className="h-[1px] bg-dark-brown/5 mt-2 mb-4" />
                      </div>
                    )}
                    {[...product.reviews, ...getProductReviews(product.id)].map((review) => (
                      <div key={review.id} className="pb-6 border-b border-dark-brown/10 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-dark-brown/10 flex items-center justify-center text-sm font-medium text-dark-brown">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-dark-brown text-sm">{review.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <HiStar key={i} size={12} className={i < Math.floor(review.rating) ? 'text-champagne-gold' : 'text-dark-brown/20'} />
                              ))}
                              <span className="text-xs text-dark-brown/40 ml-1">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-dark-brown/70 mt-3">{review.comment}</p>
                      </div>
                    ))}
                    {product.reviews.length === 0 && getProductReviews(product.id).length === 0 && (
                      <p className="text-dark-brown/40 text-sm font-light text-center py-8">No reviews yet. Be the first to review this fragrance.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-heading text-3xl text-dark-brown">Complete the Collection</h2>
              <div className="w-12 h-[1px] bg-champagne-gold mt-3" />
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rp) => (
                  <div key={rp.id} className="group">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-3">
                      <Link to={`/product/${rp.id}`}>
                        <img src={rp.images[0]} alt={rp.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </Link>
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <button
                          onClick={() => {
                            if (isAuthenticated) {
                              addItem(rp);
                              toast.success('Added to your shopping bag.');
                            } else {
                              setPendingProduct(rp);
                              openAuth();
                            }
                          }}
                          className="w-full py-2 bg-dark-brown text-cream text-[10px] tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <Link to={`/product/${rp.id}`}>
                      <h3 className="font-heading text-sm text-dark-brown group-hover:text-champagne-gold transition-colors">{rp.name}</h3>
                    </Link>
                    <p className="font-body text-sm text-dark-brown">${rp.price}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
