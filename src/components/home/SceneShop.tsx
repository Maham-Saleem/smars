import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { products } from '../../data/products';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import toast from 'react-hot-toast';

export default function SceneShop() {
  const ref = useRef(null);
  const [filter, setFilter] = useState<string>('all');
  const { toggleWishlist, isInWishlist, isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const { openAuth, setPendingProduct } = useUIStore();

  const handleAddToCart = (product: (typeof products)[0]) => {
    if (isAuthenticated) {
      addItem(product);
      toast.success(`${product.name} added to your bag.`);
    } else {
      setPendingProduct(product);
      openAuth();
    }
  };

  const filtered = filter === 'all'
    ? products.slice(0, 8)
    : products.filter((p) => p.collection === filter).slice(0, 8);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'Signature', label: 'Signature' },
    { id: 'Floral', label: 'Floral' },
    { id: 'Oud', label: 'Oud' },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ contentVisibility: 'auto', contain: 'content' as const, background: 'linear-gradient(180deg, #FEFCF9 0%, #F5EFE6 100%)' }}
    >
      {/* Header */}
      <div className="px-8 sm:px-12 lg:px-20 mb-16 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-4"
            >
              Shop
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-[0.95]"
            >
              Find your <span className="italic text-bronze">signature</span>
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-1"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 text-[10px] sm:text-xs tracking-editorial uppercase font-body transition-all duration-500 rounded-full ${
                  filter === f.id
                    ? 'bg-espresso text-cream'
                    : 'text-espresso/40 hover:text-espresso/70 hover:bg-espresso/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Products */}
      <div className="px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:gap-x-8 lg:gap-y-16">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group"
            >
              {/* Image */}
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden relative bg-warm-beige">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                      toast.success(
                        isInWishlist(product.id)
                          ? 'Removed from wishlist'
                          : 'Added to wishlist'
                      );
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isInWishlist(product.id)
                        ? 'bg-bronze text-cream'
                        : 'bg-cream/80 text-espresso/40 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <HiOutlineHeart size={14} />
                  </button>
                  {/* Sale badge */}
                  {product.originalPrice && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-bronze/90 text-cream text-[9px] tracking-wider uppercase font-body">
                      Sale
                    </span>
                  )}
                </div>
              </Link>

              {/* Text */}
              <div className="mt-4">
                <p className="text-[9px] tracking-editorial uppercase text-bronze/40 font-body mb-1">
                  {product.collection}
                </p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display text-sm sm:text-base text-espresso group-hover:text-bronze transition-colors duration-500 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-display text-base sm:text-lg text-espresso">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-espresso/30 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 w-full py-2.5 bg-espresso text-cream text-[9px] tracking-widest uppercase font-body rounded-full hover:bg-bronze active:bg-espresso/90 focus:outline-none focus:ring-2 focus:ring-espresso/20 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  <HiOutlineShoppingBag size={14} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-4 text-xs tracking-editorial uppercase text-espresso/50 hover:text-bronze transition-colors duration-500 font-body"
          >
            <span className="w-8 h-[1px] bg-espresso/20 group-hover:w-12 group-hover:bg-bronze transition-all duration-500" />
            <span>Browse Full Collection</span>
            <span className="w-8 h-[1px] bg-espresso/20 group-hover:w-12 group-hover:bg-bronze transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
