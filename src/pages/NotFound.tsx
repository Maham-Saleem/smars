import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center pt-24 lg:pt-28">
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-champagne-gold text-[10px] tracking-[0.35em] uppercase font-body mb-4">Error 404</p>
          <h1 className="font-heading text-7xl sm:text-8xl text-espresso leading-[0.85] mb-6">Lost in<br />the Scent</h1>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mb-6" />
          <p className="text-espresso/45 text-sm font-light leading-relaxed mb-10">
            This page seems to have drifted away like the top notes of a beautiful fragrance. Let us guide you back.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-espresso text-cream text-[10px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm"
          >
            <HiOutlineArrowLeft size={14} />
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
