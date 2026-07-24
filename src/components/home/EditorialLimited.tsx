import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const limited = products.filter((p) => p.collection === 'Limited Edition');

export default function EditorialLimited() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const x2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-cream overflow-hidden" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body">Collection 04</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="space-y-8 lg:sticky lg:top-32">
              <div>
                <span className="text-[5rem] lg:text-[7rem] font-heading text-dark-brown/5 leading-none block -mb-8 select-none">L</span>
                <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-dark-brown leading-tight">
                  Limited
                  <span className="block text-champagne-gold">Edition</span>
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-champagne-gold" />
              <p className="text-dark-brown/60 leading-relaxed text-base lg:text-lg font-light">
                Exclusive creations crafted in small batches using the rarest ingredients. Once they are gone, they are gone forever.
              </p>
              <div className="pt-4 space-y-6">
                {limited.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-warm-beige transition-all duration-500">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                      <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-dark-brown group-hover:text-champagne-gold transition-colors">{p.name}</p>
                      <p className="text-xs text-dark-brown/40">{p.shortDescription}</p>
                    </div>
                    <p className="font-heading text-dark-brown">${p.price}</p>
                  </Link>
                ))}
              </div>
              <Link to="/shop?collection=Limited+Edition" className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-dark-brown font-body">
                <span>Discover Limited</span>
                <span className="w-8 h-[1px] bg-dark-brown/30 group-hover:w-12 transition-all duration-500" />
              </Link>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-7 relative" style={{ x: x1 }}>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 space-y-4">
                <motion.div style={{ x: x2 }} className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                  <img
                    src={limited[0]?.images[0] || '/perfume-placeholder.svg'}
                    alt="Limited Edition"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="aspect-[3/2] rounded-[2rem] overflow-hidden bg-warm-beige flex items-center justify-center p-8">
                  <p className="text-dark-brown/20 font-heading text-2xl text-center leading-relaxed">
                    "Rarity is the ultimate<br />luxury"
                  </p>
                </div>
              </div>
              <div className="col-span-2 space-y-4 pt-12">
                <div className="aspect-square rounded-[2rem] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div style={{ x: x2 }} className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-champagne-gold/10 flex items-center justify-center mx-auto">
                  <span className="font-heading text-champagne-gold text-sm tracking-widest">24</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-dark-brown/5 pointer-events-none"
      />
    </section>
  );
}
