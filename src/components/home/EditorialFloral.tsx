import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const floral = products.filter((p) => p.collection === 'Floral');

export default function EditorialFloral() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-warm-beige overflow-hidden" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-right"
        >
          <span className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body">Collection 02</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pr-8 order-2 lg:order-1"
          >
            <div className="space-y-8">
              <div>
                <span className="text-[5rem] lg:text-[7rem] font-heading text-dark-brown/5 leading-none block -mb-8 select-none">F</span>
                <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-dark-brown leading-tight">
                  Floral
                  <span className="block text-champagne-gold">Collection</span>
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-champagne-gold" />
              <p className="text-dark-brown/60 leading-relaxed text-base lg:text-lg font-light">
                Nature's most precious blossoms, interpreted through the lens of haute perfumery. Delicate yet powerful, these fragrances capture the poetry of flowers in full bloom.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Jasmine', 'Tuberose', 'Gardenia', 'Rose'].map((note) => (
                  <span key={note} className="px-5 py-2 border border-dark-brown/10 rounded-full text-xs text-dark-brown/50 tracking-wider uppercase font-body hover:border-champagne-gold hover:text-champagne-gold transition-all duration-500 cursor-default">
                    {note}
                  </span>
                ))}
              </div>
              <div className="flex gap-6 pt-2">
                {floral.slice(0, 2).map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group">
                    <p className="font-heading text-lg text-dark-brown group-hover:text-champagne-gold transition-colors">{p.name}</p>
                    <p className="text-sm text-dark-brown/40">${p.price}</p>
                  </Link>
                ))}
              </div>
              <Link to="/shop?collection=Floral" className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-dark-brown font-body">
                <span>Explore Collection</span>
                <span className="w-8 h-[1px] bg-dark-brown/30 group-hover:w-12 transition-all duration-500" />
              </Link>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-7 relative order-1 lg:order-2" style={{ y }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-[2rem] overflow-hidden">
                  <img
                    src={floral[0]?.images[0] || '/perfume-placeholder.svg'}
                    alt="Floral Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden">
                  <img
                    src={floral[1]?.images[0] || '/perfume-placeholder.svg'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/8624586/pexels-photo-8624586.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
