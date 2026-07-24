import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const oud = products.filter((p) => p.collection === 'Oud');

export default function EditorialOud() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [80, 0]);

  return (
    <section ref={ref} className="relative h-[120vh] min-h-[800px] flex items-center overflow-hidden bg-deep-coffee" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Oud Collection"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-coffee/90 via-deep-coffee/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/80 via-transparent to-deep-coffee/30" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div style={{ opacity, y: textY }} className="space-y-8">
            <span className="text-champagne-gold/60 text-xs tracking-[0.35em] uppercase font-body">Collection 03</span>
            <h2 className="font-heading text-5xl lg:text-7xl text-cream leading-tight">
              Oud
              <span className="block text-champagne-gold">Collection</span>
            </h2>
            <div className="w-16 h-[1px] bg-champagne-gold/50" />
            <p className="text-cream/50 leading-relaxed text-base lg:text-lg font-light max-w-md">
              The rarest of woods, aged for decades, transformed into olfactory masterpieces. Our Oud Collection pays homage to the ancient art of agarwood distillation.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Cambodian Oud', 'Birch', 'Labdanum', 'Incense'].map((note) => (
                <span key={note} className="px-5 py-2 border border-cream/10 rounded-full text-xs text-cream/40 tracking-wider uppercase font-body hover:border-champagne-gold hover:text-champagne-gold transition-all duration-500 cursor-default">
                  {note}
                </span>
              ))}
            </div>
            <div className="flex gap-8 pt-2">
              {oud.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <p className="font-heading text-lg text-cream/80 group-hover:text-champagne-gold transition-colors">{p.name}</p>
                  <p className="text-sm text-cream/30">${p.price}</p>
                </Link>
              ))}
            </div>
            <Link to="/shop?collection=Oud" className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-champagne-gold/80 font-body">
              <span>Explore Collection</span>
              <span className="w-8 h-[1px] bg-champagne-gold/30 group-hover:w-12 transition-all duration-500" />
            </Link>
          </motion.div>

          <motion.div style={{ opacity }} className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-champagne-gold/20 flex items-center justify-center">
                <div className="w-48 h-48 lg:w-60 lg:h-60 rounded-full border border-champagne-gold/10 flex items-center justify-center">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-champagne-gold/5 flex items-center justify-center">
                    <span className="font-heading text-cream/20 text-6xl lg:text-7xl">O</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.7, 1], [1, 0]) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-champagne-gold/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
