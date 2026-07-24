import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';
import { products } from '../../data/products';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const showcase = products.slice(0, 6);

export default function ArtShowcase() {
  const ref = useRef(null);
  const { toggleWishlist, isInWishlist } = useAuthStore();

  return (
    <section ref={ref} className="relative py-16 lg:py-24 bg-cream overflow-hidden" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body">The Gallery</span>
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-dark-brown leading-tight mt-3">
            Objects of Desire
          </h2>
          <div className="w-16 h-[1px] bg-champagne-gold mt-6" />
        </motion.div>
      </div>

      <div className="px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-[1200px] mx-auto">
          {showcase.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className={`group relative ${i === 3 ? 'lg:mt-12' : ''}`}>
                <div className="relative overflow-hidden mb-3 rounded-xl aspect-[3/4]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <button
                    onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      isInWishlist(product.id) ? 'bg-champagne-gold text-deep-coffee' : 'bg-white/80 text-dark-brown/60 hover:bg-white'
                    }`}
                  >
                    <HiOutlineHeart size={16} />
                  </button>
                </div>

                <Link to={`/product/${product.id}`} className="block text-center">
                  <h3 className="font-heading text-sm lg:text-base text-dark-brown group-hover:text-champagne-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-heading text-dark-brown/60 text-sm mt-0.5">${product.price}</p>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-dark-brown font-body"
        >
          <span>View All Fragrances</span>
          <span className="w-8 h-[1px] bg-dark-brown/30 group-hover:w-12 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
