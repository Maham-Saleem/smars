import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SceneCraftsmanship() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.6], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      {/* Full-bleed background image */}
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="absolute inset-0"
      >
        <img
          src="https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="The Atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E1F14]/80 via-[#2E1F14]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F14]/60 via-transparent to-[#2E1F14]/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20 w-full py-24 sm:py-32 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left text */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="lg:col-span-6"
            >
              <p className="text-[10px] tracking-editorial uppercase text-champagne/50 font-body mb-8">
                The Atelier
              </p>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-cream leading-[0.95] mb-10">
                Where time
                <span className="block italic text-champagne">stands still</span>
              </h2>

              <div className="w-12 h-[1px] bg-champagne/30 mb-10" />

              <p className="text-sm sm:text-base text-cream/70 leading-relaxed max-w-lg mb-6">
                In our atelier in Grasse, the world capital of perfumery, 
                our maîtres parfumeurs work in quiet contemplation. Each 
                composition begins with a single note — an emotion — and 
                unfolds over months or years into its final form.
              </p>

              <p className="text-sm sm:text-base text-cream/70 leading-relaxed max-w-lg">
                We do not follow trends. We do not rush. We wait for nature 
                to offer its finest expression, then we compose with patience 
                and precision that only comes from decades of mastery.
              </p>
            </motion.div>

            {/* Right — stats & details */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
            >
              <div className="space-y-12">
                {[
                  {
                    number: '200+',
                    label: 'Rare ingredients sourced from 40 countries',
                  },
                  {
                    number: '15',
                    label: 'Master perfumers with 50+ years combined experience',
                  },
                  {
                    number: '2,000+',
                    label: 'Hours of composition per signature fragrance',
                  },
                  {
                    number: '100%',
                    label: 'Hand-filled and sealed with wax in our studio',
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-6"
                  >
                    <span className="font-display text-3xl sm:text-4xl text-champagne/70 leading-none shrink-0 mt-1">
                      {stat.number}
                    </span>
                    <p className="text-xs sm:text-sm text-cream/60 leading-relaxed">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16"
              >
                <a
                  href="/#atelier"
                  className="group inline-flex items-center gap-4 text-[10px] sm:text-xs tracking-editorial uppercase text-champagne/80 hover:text-champagne transition-colors duration-700 font-body"
                >
                  <span>Our Story</span>
                  <span className="w-6 h-[1px] bg-champagne/30 group-hover:w-10 transition-all duration-700" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/2 right-20 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-champagne/[0.05] pointer-events-none" />
      <div className="absolute top-1/2 right-32 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-champagne/[0.03] pointer-events-none" />
    </section>
  );
}
