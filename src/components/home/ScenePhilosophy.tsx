import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScenePhilosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-0 overflow-hidden"
      style={{ contentVisibility: 'auto', contain: 'content' as const, background: 'linear-gradient(180deg, #E8DDD0 0%, #FEFCF9 100%)', willChange: 'transform' }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          {/* Left — oversized typography */}
          <motion.div
            style={{ y: textY, willChange: 'transform' }}
            className="lg:col-span-5 flex items-center px-8 sm:px-12 lg:px-16 py-24 lg:py-0 relative z-10"
          >
            <div className="max-w-lg">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mb-8"
              >
                Philosophy
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-espresso leading-[0.95] mb-8"
              >
                A
                <span className="block italic text-bronze">fragrance</span>
                <span className="block">is a</span>
                <span className="block italic text-bronze">memory</span>
              </motion.h2>

              <motion.div
                style={{ scaleX: lineScale, willChange: 'transform' }}
                className="w-16 h-[1px] bg-bronze/40 mb-8 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm sm:text-base text-espresso/50 leading-relaxed font-light max-w-sm"
              >
                We do not create perfumes. We compose olfactory narratives — 
                each note a word, each accord a sentence, each bottle a story 
                that unfolds on the skin over hours.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm sm:text-base text-espresso/50 leading-relaxed font-light max-w-sm mt-4"
              >
                Our perfumers spend years sourcing a single ingredient, 
                waiting for the perfect harvest, the exact moment when 
                nature offers its most precious expression.
              </motion.p>
            </div>
          </motion.div>

          {/* Right — layered images */}
          <div className="lg:col-span-7 relative min-h-[60vh] lg:min-h-screen">
            {/* Background image */}
            <motion.div
              style={{ y: imageY, willChange: 'transform' }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:right-12">
                <img
                  src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Perfume craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#E8DDD0]/60 via-transparent to-transparent lg:from-[#E8DDD0]/80" />
              </div>
            </motion.div>

            {/* Floating accent image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute bottom-12 right-8 sm:right-12 lg:right-16 w-40 h-52 sm:w-48 sm:h-60 lg:w-56 lg:h-72 overflow-hidden shadow-2xl z-10"
              style={{ border: '1px solid rgba(199, 163, 107, 0.2)', willChange: 'transform' }}
            >
              <img
                src="https://images.pexels.com/photos/13284500/pexels-photo-13284500.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Signature bottle"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Quote overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-1/2 -translate-y-1/2 left-8 sm:left-12 lg:left-16 max-w-xs z-10"
            >
              <div
                className="p-6 sm:p-8 backdrop-blur-sm"
                style={{ background: 'rgba(254, 252, 249, 0.7)',
                  border: '1px solid rgba(199, 163, 107, 0.15)' }}
              >
                <p className="font-display text-lg sm:text-xl italic text-espresso/80 leading-relaxed">
                  "The art of perfumery is the art of restraint — knowing what to leave out."
                </p>
                <p className="text-[10px] tracking-editorial uppercase text-bronze/50 font-body mt-4">
                  — Maître Parfumeur
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
