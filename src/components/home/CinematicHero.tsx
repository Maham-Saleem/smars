import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CinematicHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.section ref={ref} style={{ opacity }} className="relative h-[110vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-deep-coffee">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4A3428_0%,_#2E221B_50%,_#1a130f_100%)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]" style={{ y }}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-champagne-gold/10 via-transparent to-dark-brown/20 blur-3xl" />
        </motion.div>
      </div>

      <motion.div style={{ scale }} className="relative z-10 text-center px-6">
        <motion.div className="overflow-hidden mb-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-champagne-gold/60 text-xs tracking-[0.4em] uppercase font-body"
          >
            Established MMXXIV
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/logo-light.svg"
            alt="SMAR'S Fragrance"
            className="w-[280px] sm:w-[360px] lg:w-[480px] xl:w-[560px] mx-auto drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link to="/shop" className="group relative px-10 py-4 overflow-hidden rounded-full">
            <span className="absolute inset-0 bg-cream/10 backdrop-blur-sm rounded-full border border-cream/20 group-hover:bg-cream/20 transition-all duration-500" />
            <span className="relative z-10 text-cream text-sm tracking-[0.25em] uppercase font-body font-medium">
              Enter the World
            </span>
          </Link>
          <Link to="/shop" className="group relative px-10 py-4 overflow-hidden rounded-full">
            <span className="absolute inset-0 bg-champagne-gold/10 backdrop-blur-sm rounded-full border border-champagne-gold/30 group-hover:bg-champagne-gold/20 transition-all duration-500" />
            <span className="relative z-10 text-champagne-gold text-sm tracking-[0.25em] uppercase font-body font-medium">
              Discover
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-champagne-gold/40 to-transparent"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[10%] w-32 h-32 rounded-full border border-champagne-gold/10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[25%] left-[8%] w-48 h-48 rounded-full border border-cream/5"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.08, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] left-[15%] w-24 h-24 rounded-full bg-champagne-gold/5 blur-xl"
      />
    </motion.section>
  );
}
