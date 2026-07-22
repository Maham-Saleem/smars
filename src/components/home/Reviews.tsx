import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const reviews = [
  {
    id: 1,
    name: 'Victoria Ashford',
    location: 'New York, USA',
    rating: 5,
    text: 'Noir Élégance is the most sophisticated fragrance I have ever owned. It evolves beautifully throughout the day and draws endless compliments. Truly a masterpiece.',
    avatar: 'VA',
  },
  {
    id: 2,
    name: 'James Harrington',
    location: 'London, UK',
    rating: 5,
    text: 'The Oud Royale is absolutely transcendent. The quality of ingredients is immediately apparent. This is what luxury smells like.',
    avatar: 'JH',
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    location: 'Paris, France',
    rating: 5,
    text: 'Fleur de Nuit captures the essence of a midnight garden in full bloom. It is poetic, elegant, and utterly feminine. I have found my signature scent.',
    avatar: 'SM',
  },
  {
    id: 4,
    name: 'Alexander Kim',
    location: 'Seoul, Korea',
    rating: 4.5,
    text: 'The attention to detail in both the fragrance and packaging is remarkable. SMAR\'S has earned a lifelong customer. Golden Tuberose is divine.',
    avatar: 'AK',
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  return (
    <section className="py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-4">Testimonials</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-dark-brown">The Verdict</h2>
          <div className="w-16 h-[1px] bg-champagne-gold mx-auto mt-6" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-dark-brown text-cream flex items-center justify-center mx-auto font-heading text-xl">
                {reviews[current].avatar}
              </div>
              <div className="flex justify-center gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    size={20}
                    className={i < Math.floor(reviews[current].rating) ? 'text-champagne-gold' : 'text-dark-brown/20'}
                  />
                ))}
              </div>
              <p className="text-dark-brown/80 text-lg lg:text-xl leading-relaxed mt-8 font-light italic">
                "{reviews[current].text}"
              </p>
              <p className="font-heading text-xl text-dark-brown mt-8">{reviews[current].name}</p>
              <p className="text-sm text-dark-brown/50 mt-1">{reviews[current].location}</p>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-dark-brown/20 flex items-center justify-center text-dark-brown/50 hover:border-dark-brown hover:text-dark-brown transition-all"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-champagne-gold w-6' : 'bg-dark-brown/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-dark-brown/20 flex items-center justify-center text-dark-brown/50 hover:border-dark-brown hover:text-dark-brown transition-all"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
