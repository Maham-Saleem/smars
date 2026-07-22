import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SceneBottle() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-[100vh] min-h-[700px] overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #FEFCF9 0%, #F5EFE6 40%, #E8DDD0 100%)' }}
    >
      {/* Architectural lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4C5B2]/40 to-transparent" />
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4C5B2]/30 to-transparent" />
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4C5B2]/20 to-transparent" />
      </div>

      {/* Ambient texture */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E1F14' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Floating bottle */}
        <motion.div
          style={{ y: bottleY }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-espresso/5 rounded-full blur-xl" />

            {/* Bottle image */}
            <div className="relative w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] lg:w-[400px] lg:h-[560px]">
              <img
                src="https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="SMAR'S Signature Fragrance"
                className="w-full h-full object-cover"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
              />
              {/* Light reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating text — bottom left */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-8 sm:left-12 lg:left-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] sm:text-xs tracking-editorial uppercase text-bronze/60 font-body mb-3">
              Maison de Parfum
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-[1.1] max-w-xs">
              Amber
            </h1>
          </motion.div>
        </motion.div>

        {/* Floating price tag — bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 sm:bottom-20 lg:bottom-24 right-8 sm:right-12 lg:right-20 text-right"
        >
          <p className="text-[10px] sm:text-xs tracking-editorial uppercase text-espresso/40 font-body mb-1">
            Eau de Parfum — 100ml
          </p>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-espresso">
            $295
          </p>
        </motion.div>

        {/* Floating note indicators — top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="absolute top-24 sm:top-32 right-8 sm:right-12 lg:right-20 space-y-6"
        >
          {['Bergamot', 'Oud', 'Amber'].map((note, i) => (
            <motion.div
              key={note}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2 + i * 0.15 }}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-bronze/40" />
              <span className="text-[10px] tracking-editorial uppercase text-espresso/30 font-body">
                {note}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-bronze/30 to-transparent"
        />
      </motion.div>

      {/* CTA — floating minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-6 right-8 sm:right-12 lg:right-20"
      >
        <Link
          to="/product/1"
          className="group flex items-center gap-3 text-[10px] sm:text-xs tracking-editorial uppercase text-espresso/50 hover:text-bronze transition-colors duration-700 font-body"
        >
          <span>Discover</span>
          <span className="w-6 h-[1px] bg-espresso/20 group-hover:w-10 group-hover:bg-bronze transition-all duration-700" />
        </Link>
      </motion.div>
    </section>
  );
}
