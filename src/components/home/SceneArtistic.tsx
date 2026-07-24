import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const featured = products.slice(0, 4);

export default function SceneArtistic() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallax1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ contentVisibility: 'auto', contain: 'content' as const, background: 'linear-gradient(180deg, #FEFCF9 0%, #F5EFE6 50%, #FEFCF9 100%)', willChange: 'transform' }}
    >
      {/* Section label */}
      <div className="px-8 sm:px-12 lg:px-20 mb-16 sm:mb-20 lg:mb-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-4"
        >
          The Collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl text-espresso leading-[0.95]"
        >
          Objects of
          <span className="block italic text-bronze">desire</span>
        </motion.h2>
      </div>

      {/* Artistic composition — broken grid */}
      <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">

          {/* Product 1 — large, left */}
          <motion.div
            style={{ y: parallax1, willChange: 'transform' }}
            className="col-span-12 sm:col-span-7 lg:col-span-5 relative group"
          >
            <Link to={`/product/${featured[0].id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={featured[0].images[0]}
                  alt={featured[0].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="mt-6">
                <p className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-2">
                  {featured[0].category}
                </p>
                <h3 className="font-display text-xl sm:text-2xl text-espresso group-hover:text-bronze transition-colors duration-500">
                  {featured[0].name}
                </h3>
                <p className="font-display text-lg text-espresso/40 mt-1">
                  ${featured[0].price}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Product 2 — tall, offset right */}
          <motion.div
            style={{ y: parallax2, willChange: 'transform' }}
            className="col-span-12 sm:col-span-5 lg:col-span-4 lg:col-start-7 relative group sm:mt-24"
          >
            <Link to={`/product/${featured[1].id}`} className="block">
              <div className="aspect-[2/3] overflow-hidden relative">
                <img
                  src={featured[1].images[0]}
                  alt={featured[1].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="mt-6">
                <p className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-2">
                  {featured[1].category}
                </p>
                <h3 className="font-display text-xl sm:text-2xl text-espresso group-hover:text-bronze transition-colors duration-500">
                  {featured[1].name}
                </h3>
                <p className="font-display text-lg text-espresso/40 mt-1">
                  ${featured[1].price}
                </p>
              </div>
            </Link>

            {/* Floating note card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-8 -left-4 sm:-left-8 p-5 z-10"
              style={{ background: 'rgba(254, 252, 249, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(199, 163, 107, 0.15)' }}
            >
              <p className="text-[9px] tracking-editorial uppercase text-bronze/60 font-body mb-1">
                Heart Notes
              </p>
              <p className="font-display text-sm text-espresso/70">
                {featured[1].fragranceNotes.slice(0, 2).join(' · ')}
              </p>
            </motion.div>
          </motion.div>

          {/* Product 3 — small, far right, stacked */}
          <motion.div
            style={{ y: parallax1, willChange: 'transform' }}
            className="col-span-12 sm:col-span-6 lg:col-span-3 relative group lg:mt-48"
          >
            <Link to={`/product/${featured[2].id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={featured[2].images[0]}
                  alt={featured[2].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <p className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-2">
                  {featured[2].category}
                </p>
                <h3 className="font-display text-xl text-espresso group-hover:text-bronze transition-colors duration-500">
                  {featured[2].name}
                </h3>
                <p className="font-display text-base text-espresso/40 mt-1">
                  ${featured[2].price}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Product 4 — bottom, spanning */}
          <motion.div
            style={{ y: parallax2, willChange: 'transform' }}
            className="col-span-12 sm:col-span-6 lg:col-span-3 relative group lg:col-start-10 lg:-mt-16"
          >
            <Link to={`/product/${featured[3].id}`} className="block">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={featured[3].images[0]}
                  alt={featured[3].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <p className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-2">
                  {featured[3].category}
                </p>
                <h3 className="font-display text-xl text-espresso group-hover:text-bronze transition-colors duration-500">
                  {featured[3].name}
                </h3>
                <p className="font-display text-base text-espresso/40 mt-1">
                  ${featured[3].price}
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 sm:mt-24 lg:mt-32 text-center"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-4 text-xs tracking-editorial uppercase text-espresso/50 hover:text-bronze transition-colors duration-500 font-body"
          >
            <span className="w-8 h-[1px] bg-espresso/20 group-hover:w-12 group-hover:bg-bronze transition-all duration-500" />
            <span>View All Fragrances</span>
            <span className="w-8 h-[1px] bg-espresso/20 group-hover:w-12 group-hover:bg-bronze transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
