import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const signature = products.filter((p) => p.collection === 'Signature').slice(0, 3);

export default function EditorialSignature() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

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
          <span className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body">Collection 01</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div className="lg:col-span-7 relative" style={{ x, rotate }}>
            <div className="relative aspect-[4/5] rounded-full overflow-hidden">
              <img
                src={signature[0]?.images[0] || '/perfume-placeholder.svg'}
                alt="Signature Collection"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/30 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 lg:-bottom-12 lg:-right-12 w-40 h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-cream shadow-2xl"
            >
              <img
                src={signature[1]?.images[0] || '/perfume-placeholder.svg'}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-8"
          >
            <div className="space-y-8">
              <div>
                <span className="text-[5rem] lg:text-[7rem] font-heading text-dark-brown/5 leading-none block -mb-8 select-none">S</span>
                <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-dark-brown leading-tight">
                  Signature
                  <span className="block text-champagne-gold">Collection</span>
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-champagne-gold" />
              <p className="text-dark-brown/60 leading-relaxed text-base lg:text-lg font-light">
                Timeless compositions that define the essence of SMAR'S. Each fragrance is a masterful balance of rare ingredients, crafted for those who seek distinction without compromise.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Bergamot', 'Saffron', 'Oud', 'Amber'].map((note) => (
                  <span key={note} className="px-5 py-2 border border-dark-brown/10 rounded-full text-xs text-dark-brown/50 tracking-wider uppercase font-body hover:border-champagne-gold hover:text-champagne-gold transition-all duration-500 cursor-default">
                    {note}
                  </span>
                ))}
              </div>
              <div className="flex gap-6 pt-2">
                {signature.slice(0, 2).map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group">
                    <p className="font-heading text-lg text-dark-brown group-hover:text-champagne-gold transition-colors">{p.name}</p>
                    <p className="text-sm text-dark-brown/40">${p.price}</p>
                  </Link>
                ))}
              </div>
              <Link to="/shop?collection=Signature" className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-dark-brown font-body">
                <span>Explore Collection</span>
                <span className="w-8 h-[1px] bg-dark-brown/30 group-hover:w-12 transition-all duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-dark-brown/5 pointer-events-none"
      />
    </section>
  );
}
