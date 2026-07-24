import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiStar } from 'react-icons/hi';
import { products } from '../../data/products';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

export default function BestSellers() {
  const { toggleWishlist, isInWishlist } = useAuthStore();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="py-20 lg:py-28 bg-warm-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-4">Most Loved</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-dark-brown">Best Sellers</h2>
          <div className="w-16 h-[1px] bg-champagne-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/4] mb-5 shadow-sm">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <button
                  onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isInWishlist(product.id) ? 'bg-champagne-gold text-deep-coffee' : 'bg-white/80 text-dark-brown/60 hover:bg-white'
                  }`}
                >
                  <HiOutlineHeart size={18} />
                </button>
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-champagne-gold text-deep-coffee text-xs font-medium tracking-wider uppercase rounded-full">
                    Sale
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button
                    onClick={() => { addItem(product); toast.success(`${product.name} added to cart`); }}
                    className="w-full py-3 bg-dark-brown text-cream text-xs tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <Link to={`/product/${product.id}`}>
                <h3 className="font-heading text-lg text-dark-brown group-hover:text-champagne-gold transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-dark-brown/50 mt-1 line-clamp-1">{product.shortDescription}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'text-champagne-gold' : 'text-dark-brown/20'}
                  />
                ))}
                <span className="text-xs text-dark-brown/50 ml-1">({product.reviews.length})</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-heading text-xl text-dark-brown">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-dark-brown/40 line-through">${product.originalPrice}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/shop"
            className="inline-block px-10 py-3 border border-dark-brown text-dark-brown text-sm tracking-[0.2em] uppercase font-medium hover:bg-dark-brown hover:text-cream active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300"
          >
            View All
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
