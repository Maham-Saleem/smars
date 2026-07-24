import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'Artistry',
    description:
      'Every composition is a canvas. Our perfumers blend tradition with intuition, creating fragrances that are felt before they are understood.',
    image: 'https://images.pexels.com/photos/672051/pexels-photo-672051.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Heritage',
    description:
      'We draw from centuries of olfactory knowledge — the rose fields of Grasse, the agarwood forests of Cambodia, the bergamot groves of Calabria.',
    image: 'https://images.pexels.com/photos/29837792/pexels-photo-29837792.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Purity',
    description:
      'No shortcuts. No synthetic compromises. Every ingredient is sourced at its peak, distilled with care, and blended with reverence for the raw material.',
    image: 'https://images.pexels.com/photos/6694202/pexels-photo-6694202.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const storyRef = useRef(null);
  const { scrollYProgress: storyScroll } = useScroll({ target: storyRef, offset: ['start end', 'end start'] });
  const storyImageY = useTransform(storyScroll, [0, 1], ['8%', '-8%']);

  const craftRef = useRef(null);
  const { scrollYProgress: craftScroll } = useScroll({ target: craftRef, offset: ['start end', 'end start'] });
  const craftY = useTransform(craftScroll, [0, 1], [0, 80]);
  const craftOpacity = useTransform(craftScroll, [0, 0.4], [1, 0]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[480px] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, willChange: 'transform' }} className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="SMAR'S Atelier"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/20 to-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, willChange: 'transform' }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body mb-4">The House</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl text-cream leading-[0.95]">
              Our
              <span className="block text-champagne-gold">Story</span>
            </h1>
            <div className="w-16 h-[1px] bg-champagne-gold mt-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section ref={storyRef} className="py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  style={{ y: storyImageY, willChange: 'transform' }}
                  src="https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="SMAR'S Fragrance"
                  className="w-full h-[115%] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-champagne-gold/10 rounded-full hidden lg:block" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <p className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body mb-6">
                Est. 2024
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-[1.05] mb-8">
                Born from a devotion
                <span className="block italic text-bronze">to the invisible</span>
              </h2>
              <div className="space-y-5 text-espresso/50 leading-relaxed font-light">
                <p>
                  SMAR'S was founded on a single conviction: that the right fragrance can alter
                  the way the world perceives you — and the way you perceive yourself. We set
                  out to create a house where every ingredient is chosen not for trend, but for
                  truth.
                </p>
                <p>
                  Our atelier operates at the intersection of old-world craft and modern
                  sensibility. We work directly with farmers and distillers who share our
                  uncompromising standards — from the family-run bergamot groves of Calabria
                  to the sustainably managed agarwood forests of Cambodia.
                </p>
                <p>
                  Each bottle that leaves our hands is the result of months, sometimes years,
                  of patient refinement. We do not rush. We do not settle. We wait for the
                  moment when a composition reveals its full character — and only then do we
                  share it with the world.
                </p>
              </div>
              <div className="mt-10 flex gap-10">
                {[
                  { number: '50+', label: 'Years Heritage' },
                  { number: '200+', label: 'Unique Notes' },
                  { number: '15K+', label: 'Happy Clients' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl lg:text-3xl text-espresso">{stat.number}</p>
                    <p className="text-[10px] text-espresso/40 tracking-[0.2em] uppercase mt-1 font-body">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 sm:py-32 bg-warm-beige">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <p className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body mb-4">
              Our Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso">
              Three pillars of
              <span className="italic text-bronze"> excellence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-champagne-gold font-body mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl text-espresso mb-3">{pillar.title}</h3>
                <div className="w-8 h-[1px] bg-bronze/30 mb-4" />
                <p className="text-sm text-espresso/50 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship — full bleed */}
      <section ref={craftRef} className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden">
        <motion.div style={{ y: craftY, willChange: 'transform' }} className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Craftsmanship"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/60 to-espresso/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
        </motion.div>

        {/* Decorative gold line - left */}
        <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-champagne-gold/20 to-transparent" />

        <motion.div style={{ opacity: craftOpacity, willChange: 'transform' }} className="relative z-10 w-full">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-6 lg:col-start-2"
              >
                <p className="text-champagne-gold text-[10px] tracking-[0.35em] uppercase font-body mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-champagne-gold/60" />
                  The Art of Perfumery
                </p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-cream leading-[0.95] mb-8">
                  Mastery in
                  <span className="block italic text-champagne-gold">every drop</span>
                </h2>
                <div className="w-16 h-[1px] bg-champagne-gold/60 mb-8" />
                <div className="space-y-5 text-cream/50 leading-relaxed font-light text-sm lg:text-base max-w-lg">
                  <p>
                    Each bottle is the culmination of months, often years, of patient refinement.
                    Our master perfumers work in small batches, aging compositions in
                    climate-controlled cellars where time becomes an ingredient unto itself.
                  </p>
                  <p>
                    We source from the world's most revered ingredient houses — the bergamot
                    groves of Calabria, the rose fields of Grasse, the Agarwood forests of
                    Assam — building relationships that span generations, not transactions.
                  </p>
                  <p>
                    Every bottle is hand-filled, hand-labeled, and hand-numbered. The foil seal
                    is pressed with a brass die cut by an artisan who has been crafting them
                    for over four decades. This is not efficiency. It is devotion.
                  </p>
                </div>
              </motion.div>

              {/* Right stat cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-4 flex flex-col gap-6"
              >
                {[
                  { number: '30+', label: 'Iterations per composition', sub: 'Before final approval' },
                  { number: '12', label: 'Months minimum aging', sub: 'In oak and glass cellars' },
                  { number: '100%', label: 'Hand-filled & hand-sealed', sub: 'At our Beverly Hills atelier' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                    className="backdrop-blur-sm bg-cream/5 border border-cream/10 rounded-xl p-5 lg:p-6"
                  >
                    <p className="font-display text-2xl lg:text-3xl text-champagne-gold">{stat.number}</p>
                    <p className="text-cream/70 text-sm font-medium mt-1">{stat.label}</p>
                    <p className="text-cream/30 text-xs mt-0.5 font-light">{stat.sub}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body mb-6">
              Begin Your Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-tight mb-8">
              Discover the collection
            </h2>
            <div className="w-12 h-[1px] bg-bronze/30 mx-auto mb-8" />
            <p className="text-espresso/50 leading-relaxed font-light mb-10 max-w-xl mx-auto">
              Every fragrance begins with a single note. Explore our compositions and find the
              one that speaks to you.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-4 px-10 py-4 bg-espresso text-cream text-[10px] tracking-[0.3em] uppercase font-body hover:bg-bronze transition-colors duration-500"
            >
              <span>Explore Collections</span>
              <span className="w-6 h-[1px] bg-cream/30 group-hover:w-10 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
