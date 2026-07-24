import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '../../data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturedCollections() {
  return (
    <section className="py-20 lg:py-28 bg-cream" style={{ contentVisibility: 'auto', contain: 'content' as const }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-4">Curated For You</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-dark-brown">Featured Collections</h2>
          <div className="w-16 h-[1px] bg-champagne-gold mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/4]"
            >
              <Link to={`/shop?collection=${collection.id}`}>
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/80 via-transparent to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-champagne-gold/50 rounded-2xl transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase mb-2">
                    {collection.count} Fragrances
                  </p>
                  <h3 className="font-heading text-xl lg:text-2xl text-white">{collection.name}</h3>
                  <p className="text-white/60 text-sm mt-2">{collection.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
