import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-cream" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="SMAR'S Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 lg:w-40 lg:h-40 bg-champagne-gold/10 rounded-full" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-dark-brown/5 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-4">Our Story</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-dark-brown leading-tight">
              Craftsmanship Meets
              <span className="block text-champagne-gold">Timeless Elegance</span>
            </h2>
            <div className="w-16 h-[1px] bg-champagne-gold mt-6 mb-8" />
            <div className="space-y-5 text-dark-brown/70 leading-relaxed">
              <p>
                At SMAR'S, we believe that a fragrance is more than a scent — it is a memory, an emotion, a statement of identity. Founded on the principles of artistry and excellence, we source the finest ingredients from around the world to create perfumes that transcend time.
              </p>
              <p>
                Our master perfumers work with centuries-old traditions, blending rare oud wood from Cambodia, hand-picked flowers from Grasse, and the purest essential oils to craft each bottle with unwavering dedication.
              </p>
              <p>
                Every creation is a journey — from the first spark of inspiration to the final drop in a hand-blown crystal bottle. We invite you to explore a world where luxury knows no compromise.
              </p>
            </div>
            <div className="mt-8 flex gap-8">
              {[
                { number: '50+', label: 'Years Heritage' },
                { number: '200+', label: 'Unique Notes' },
                { number: '15K+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl lg:text-3xl text-dark-brown">{stat.number}</p>
                  <p className="text-xs text-dark-brown/50 tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
