import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiStar } from 'react-icons/hi';
import type { Product } from '../../data/products';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const { toggleWishlist, isInWishlist, isAuthenticated } = useAuthStore();
  const addItem = useCartStore((s) => s.addItem);
  const { openAuth, setPendingProduct } = useUIStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/4] mb-4 shadow-sm">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isInWishlist(product.id) ? 'bg-champagne-gold text-deep-coffee' : 'bg-white/80 text-dark-brown/60 hover:bg-white'
          }`}
        >
          <HiOutlineHeart size={16} />
        </button>
        {product.originalPrice && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-champagne-gold text-deep-coffee text-xs font-medium tracking-wider uppercase rounded-full">
            Sale
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-dark-brown text-cream text-xs font-medium tracking-wider uppercase rounded-full">
            New
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={() => {
              if (isAuthenticated) {
                addItem(product);
                toast.success('Added to your shopping bag.');
              } else {
                setPendingProduct(product);
                openAuth();
              }
            }}
            className="w-full py-3 bg-dark-brown text-cream text-xs tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee transition-all duration-300 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-heading text-base text-dark-brown group-hover:text-champagne-gold transition-colors">
          {product.name}
        </h3>
      </Link>
      <p className="text-xs text-dark-brown/50 mt-1 line-clamp-1">{product.shortDescription}</p>
      <div className="flex items-center gap-1 mt-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiStar key={i} size={12} className={i < Math.floor(product.rating) ? 'text-champagne-gold' : 'text-dark-brown/20'} />
        ))}
        <span className="text-xs text-dark-brown/50 ml-1">({product.reviews.length})</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-heading text-lg text-dark-brown">${product.price}</span>
        {product.originalPrice && (
          <span className="text-sm text-dark-brown/40 line-through">${product.originalPrice}</span>
        )}
      </div>
    </motion.div>
  );
}
