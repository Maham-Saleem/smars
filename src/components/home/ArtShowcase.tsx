import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';
import { products } from '../../data/products';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const showcase = products.slice(0, 6);

export default function ArtShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const { toggleWishlist, isInWishlist } = useAuthStore();

  return (
    <section ref={ref} className="relative py-20 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body">The Gallery</span>
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-dark-brown leading-tight mt-3">
            Objects of Desire
          </h2>
          <div className="w-16 h-[1px] bg-champagne-gold mt-6" />
        </motion.div>
      </div>

      <motion.div style={{ x }} className="overflow-visible px-6 lg:px-8">
        <div className="flex gap-6 lg:gap-8 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {showcase.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`snap-start shrink-0 ${i % 3 === 0 ? 'w-[280px] lg:w-[380px]' : i % 3 === 1 ? 'w-[240px] lg:w-[320px]' : 'w-[200px] lg:w-[280px]'}`}
            >
              <div className="group relative">
                <div className={`relative overflow-hidden mb-4 transition-all duration-700 ${
                  i % 3 === 0 ? 'rounded-[2rem]' : i % 3 === 1 ? 'rounded-full aspect-square' : 'rounded-[3rem]'
                }`}>
                  <div className={`${i % 3 === 1 ? 'aspect-square' : i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <button
                    onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      isInWishlist(product.id) ? 'bg-champagne-gold text-deep-coffee' : 'bg-white/80 text-dark-brown/60 hover:bg-white'
                    }`}
                  >
                    <HiOutlineHeart size={18} />
                  </button>
                </div>

                <Link to={`/product/${product.id}`} className="block text-center">
                  <h3 className="font-heading text-base lg:text-lg text-dark-brown group-hover:text-champagne-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-heading text-dark-brown/60 mt-1">${product.price}</p>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-dark-brown font-body"
        >
          <span>View All Fragrances</span>
          <span className="w-8 h-[1px] bg-dark-brown/30 group-hover:w-12 transition-all duration-500" />
        </Link>
      </motion.div>

      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-dark-brown/5 pointer-events-none"
      />
    </section>
  );
}
