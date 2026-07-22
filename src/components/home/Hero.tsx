import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Luxury Perfume"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-coffee/80 via-deep-coffee/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/40 via-transparent to-deep-coffee/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-champagne-gold text-sm lg:text-base tracking-[0.3em] uppercase font-body mb-6"
          >
            Established 2024
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-5xl sm:text-6xl lg:text-8xl text-white leading-[1.1] font-bold"
          >
            Luxury Beyond
            <span className="block text-champagne-gold">Fragrance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed font-light"
          >
            Discover handcrafted fragrances designed to leave an unforgettable impression.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="group relative px-8 py-4 bg-champagne-gold text-deep-coffee text-sm tracking-[0.2em] uppercase font-body font-medium overflow-hidden transition-all duration-300 hover:bg-white"
            >
              <span className="relative z-10">Shop Collection</span>
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            <Link
              to="/shop"
              className="px-8 py-4 border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-body font-medium hover:bg-white/10 transition-all duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
