import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TheAtelier() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-warm-beige overflow-hidden" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body">The Atelier</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div className="lg:col-span-7 relative" style={{ scale }}>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
              <motion.img
                style={{ y: imgParallax }}
                src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="SMAR'S Atelier"
                className="w-full h-[120%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/20 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 bg-cream/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl max-w-[240px]"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-champagne-gold font-body mb-2">Artisans</p>
              <p className="font-heading text-xl lg:text-2xl text-dark-brown">15+</p>
              <p className="text-xs text-dark-brown/50 mt-1">Master perfumers crafting each drop</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-8"
          >
            <div className="space-y-8">
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-dark-brown leading-tight">
                Where Craft
                <span className="block text-champagne-gold">Meets Art</span>
              </h2>
              <div className="w-16 h-[1px] bg-champagne-gold" />
              <div className="space-y-5 text-dark-brown/60 leading-relaxed text-base lg:text-lg font-light">
                <p>
                  In our atelier, time moves differently. A single fragrance can take years to perfect — from the first harvest of a rare ingredient to the final moment of blending.
                </p>
                <p>
                  We source our precious materials from the most revered regions: jasmine from Grasse, oud from Cambodia, iris from Tuscany. Each note tells a story of terroir and tradition.
                </p>
                <p>
                  Every bottle is hand-filled and sealed with wax in our studio, ensuring that what you receive is not just a fragrance, but a piece of our devotion.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { number: '200+', label: 'Ingredients Sourced' },
                  { number: '50+', label: 'Years Heritage' },
                  { number: '15K', label: 'Bottles Crafted' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl lg:text-3xl text-dark-brown">{stat.number}</p>
                    <p className="text-[10px] text-dark-brown/40 tracking-wider uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
