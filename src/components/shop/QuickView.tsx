import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiStar, HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import type { Product } from '../../data/products';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  const { toggleWishlist, isInWishlist, isAuthenticated } = useAuthStore();
  const addItem = useCartStore((s) => s.addItem);
  const { openAuth, setPendingProduct } = useUIStore();

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-[90] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-cream rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-dark-brown hover:bg-white transition-all">
              <HiX size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <img src={product.images[0]} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                <h2 className="font-heading text-2xl text-dark-brown">{product.name}</h2>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} size={16} className={i < Math.floor(product.rating) ? 'text-champagne-gold' : 'text-dark-brown/20'} />
                  ))}
                  <span className="text-xs text-dark-brown/50 ml-2">{product.rating} ({product.reviews.length} reviews)</span>
                </div>
                <p className="font-heading text-2xl text-dark-brown mt-4">${product.price}</p>
                <p className="text-sm text-dark-brown/60 mt-4 leading-relaxed">{product.shortDescription}</p>

                <div className="mt-6">
                  <h4 className="text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Fragrance Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.fragranceNotes.slice(0, 4).map((note) => (
                      <span key={note} className="px-3 py-1 bg-dark-brown/5 text-dark-brown/70 text-xs rounded-full">{note}</span>
                    ))}
                    {product.fragranceNotes.length > 4 && (
                      <span className="px-3 py-1 bg-dark-brown/5 text-dark-brown/40 text-xs rounded-full">+{product.fragranceNotes.length - 4}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        addItem(product);
                        toast.success(`${product.name} added to cart`);
                      } else {
                        onClose();
                        setPendingProduct(product);
                        openAuth();
                      }
                    }}
                    className="flex-1 py-3 bg-dark-brown text-cream text-xs tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
                  >
                    <HiOutlineShoppingBag size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? 'Added to wishlist' : 'Removed from wishlist'); }}
                    className={`w-12 h-12 rounded-lg border transition-all flex items-center justify-center ${
                      isInWishlist(product.id) ? 'bg-champagne-gold border-champagne-gold text-deep-coffee' : 'border-dark-brown/20 text-dark-brown/50 hover:border-dark-brown'
                    }`}
                  >
                    <HiOutlineHeart size={18} />
                  </button>
                </div>
                <Link to={`/product/${product.id}`} onClick={onClose} className="block text-center text-xs text-dark-brown/50 hover:text-champagne-gold mt-4 underline underline-offset-2">
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
