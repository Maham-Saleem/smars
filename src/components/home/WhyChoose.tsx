import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineClock, HiOutlineGlobe, HiOutlineGift } from 'react-icons/hi';

const reasons = [
  {
    icon: HiOutlineSparkles,
    title: 'Premium Ingredients',
    description: 'Only the finest natural essences and rare absolutes sourced from the best regions worldwide.',
  },
  {
    icon: HiOutlineClock,
    title: 'Long Lasting',
    description: 'Our high concentration of perfume oils ensures your scent lingers elegantly throughout the day.',
  },
  {
    icon: HiOutlineGlobe,
    title: 'Imported Oils',
    description: 'We source rare ingredients from Grasse, Cambodia, and beyond for unparalleled quality.',
  },
  {
    icon: HiOutlineGift,
    title: 'Luxury Packaging',
    description: 'Each fragrance arrives in a hand-crafted box with satin lining, ready to be treasured.',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 lg:py-28 bg-warm-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-4">Why SMAR'S</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-dark-brown">The Art of Perfumery</h2>
          <div className="w-16 h-[1px] bg-champagne-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-dark-brown/5 flex items-center justify-center group-hover:bg-champagne-gold/20 transition-colors duration-500">
                <reason.icon className="text-2xl text-dark-brown/60 group-hover:text-champagne-gold transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-xl text-dark-brown mt-6 mb-3">{reason.title}</h3>
              <p className="text-sm text-dark-brown/60 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
