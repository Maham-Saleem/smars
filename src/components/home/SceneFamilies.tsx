import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '../../data/products';

const familyImages: Record<string, string> = {
  Signature: '/perfume-placeholder.svg',
  Floral: '/perfume-placeholder.svg',
  Oud: '/perfume-placeholder.svg',
  'Limited Edition': '/perfume-placeholder.svg',
};

const familyNotes: Record<string, string[]> = {
  Signature: ['Bergamot', 'Oud', 'Amber', 'Vanilla'],
  Floral: ['Jasmine', 'Rose', 'Tuberose', 'Peony'],
  Oud: ['Cambodian Oud', 'Birch', 'Incense', 'Leather'],
  'Limited Edition': ['Champagne', 'Saffron', 'Iris', 'Musk'],
};

export default function SceneFamilies() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2E1F14 0%, #1a130f 100%)' }}
    >
      {/* Section header */}
      <div className="relative z-10 pt-24 sm:pt-32 lg:pt-40 px-8 sm:px-12 lg:px-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] tracking-editorial uppercase text-champagne/40 font-body mb-6"
        >
          The Collections
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl text-cream/90 leading-[0.95] max-w-2xl"
        >
          Four families.
          <span className="block italic text-champagne/70">Infinite stories.</span>
        </motion.h2>
      </div>

      {/* Families grid */}
      <div className="relative z-10 mt-16 sm:mt-20 lg:mt-24 px-8 sm:px-12 lg:px-20 pb-24 sm:pb-32 lg:pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {collections.map((col, i) => {
          const isActive = active === col.id;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onMouseEnter={() => setActive(col.id)}
                onMouseLeave={() => setActive(null)}
                className="group relative cursor-pointer"
              >
                {/* Image container — varying heights */}
                <div
                  className={`relative overflow-hidden transition-all duration-700 ${
                    i === 0 ? 'aspect-[3/5]' : i === 1 ? 'aspect-[3/4] mt-8' : i === 2 ? 'aspect-[3/5] mt-4' : 'aspect-[3/4] mt-12'
                  }`}
                >
                  <motion.img
                    src={familyImages[col.id]}
                    alt={col.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a130f]/80 via-[#1a130f]/20 to-transparent" />

                  {/* Hover reveal content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 p-6"
                      >
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(familyNotes[col.id] || []).slice(0, 3).map((note) => (
                            <span
                              key={note}
                              className="px-3 py-1 text-[9px] tracking-wide-editorial uppercase font-body rounded-full"
                              style={{
                                background: 'rgba(199, 163, 107, 0.15)',
                                color: 'rgba(199, 163, 107, 0.8)',
                                border: '1px solid rgba(199, 163, 107, 0.2)',
                              }}
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/shop?collection=${col.id}`}
                          className="inline-flex items-center gap-2 text-[10px] tracking-editorial uppercase text-champagne/70 font-body hover:text-champagne transition-colors"
                        >
                          <span>Explore</span>
                          <span className="w-4 h-[1px] bg-champagne/40" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Text below image */}
                <div className="mt-5">
                  <h3 className="font-display text-lg sm:text-xl text-cream/80 group-hover:text-champagne transition-colors duration-500">
                    {col.name}
                  </h3>
                  <p className="text-[11px] text-cream/30 font-body mt-1">
                    {col.count} {col.count === 1 ? 'fragrance' : 'fragrances'}
                  </p>
                </div>

                {/* Index number */}
                <span className="absolute -top-2 -left-2 text-[80px] sm:text-[100px] font-display text-cream/[0.03] leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-champagne/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-champagne/[0.03] pointer-events-none" />
    </section>
  );
}
