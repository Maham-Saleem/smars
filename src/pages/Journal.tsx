import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'The Art of Olfactory Storytelling',
    excerpt: 'Every fragrance tells a story. Learn how our master perfumers compose scents that evoke emotion, memory, and desire.',
    category: 'Craft',
    date: 'June 2026',
    image: 'https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Oud: The Liquid Gold of Perfumery',
    excerpt: 'From the forests of Cambodia to the still rooms of Grasse, discover why oud is the most precious ingredient in our collection.',
    category: 'Ingredients',
    date: 'May 2026',
    image: 'https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Why Niche Perfumery Matters',
    excerpt: 'In a world of mass production, we choose craft over compromise. Here is why niche fragrances are worth the investment.',
    category: 'Philosophy',
    date: 'April 2026',
    image: 'https://images.pexels.com/photos/8624586/pexels-photo-8624586.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 min read',
  },
  {
    id: 4,
    title: 'Rose de Mai: A Harvest Like No Other',
    excerpt: 'Every May, the fields of Grasse transform into a sea of pink. Follow the journey from petal to perfume.',
    category: 'Ingredients',
    date: 'March 2026',
    image: 'https://images.pexels.com/photos/31188628/pexels-photo-31188628.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Layering Scents: A Complete Guide',
    excerpt: 'Master the art of fragrance layering to create a signature that is uniquely yours. Our expert tips inside.',
    category: 'Rituals',
    date: 'February 2026',
    image: 'https://images.pexels.com/photos/13284500/pexels-photo-13284500.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min read',
  },
  {
    id: 6,
    title: 'The SMAR\'S Atelier: Where Time Stands Still',
    excerpt: 'Step inside our studio in Grasse, where master perfumers work in quiet contemplation to compose our most iconic fragrances.',
    category: 'Behind the Scenes',
    date: 'January 2026',
    image: 'https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '8 min read',
  },
];

const categories = ['All', 'Craft', 'Ingredients', 'Philosophy', 'Rituals', 'Behind the Scenes'];

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/32817141/pexels-photo-32817141.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Journal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-coffee/80 via-deep-coffee/50 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body mb-4">The Journal</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-cream leading-[0.95]">
              Stories of
              <span className="block text-champagne-gold">Scent & Craft</span>
            </h1>
            <div className="w-16 h-[1px] bg-champagne-gold mt-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase font-body border transition-all duration-500 rounded-full ${
                activeCategory === cat
                  ? 'border-champagne-gold text-champagne-gold bg-champagne-gold/10'
                  : 'border-dark-brown/10 text-dark-brown/50 hover:border-champagne-gold hover:text-champagne-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured article */}
      {activeCategory === 'All' && (
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/40 via-transparent to-transparent" />
          </div>
          <div className="space-y-6">
            <span className="text-champagne-gold text-xs tracking-[0.3em] uppercase font-body">{articles[0].category}</span>
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl text-dark-brown leading-tight">
              {articles[0].title}
            </h2>
            <div className="w-12 h-[1px] bg-champagne-gold" />
            <p className="text-dark-brown/60 leading-relaxed text-base lg:text-lg font-light">
              {articles[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-dark-brown/40 font-body">
              <span>{articles[0].date}</span>
              <span className="w-1 h-1 rounded-full bg-champagne-gold/40" />
              <span>{articles[0].readTime}</span>
            </div>
            <Link
              to="#"
              className="group inline-flex items-center gap-3 text-sm tracking-[0.25em] uppercase text-dark-brown font-body"
            >
              <span>Read Article</span>
              <span className="w-8 h-[1px] bg-dark-brown/30 group-hover:w-12 transition-all duration-500" />
            </Link>
          </div>
        </motion.div>
      </section>
      )}

      {/* Article grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {(activeCategory === 'All' ? filteredArticles.slice(1) : filteredArticles).map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body">{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-champagne-gold/40" />
                  <span className="text-dark-brown/30 text-[10px] tracking-wider uppercase font-body">{article.date}</span>
                </div>
                <h3 className="font-heading text-xl lg:text-2xl text-dark-brown group-hover:text-champagne-gold transition-colors duration-500 leading-tight">
                  {article.title}
                </h3>
                <p className="text-dark-brown/50 text-sm leading-relaxed font-light line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="text-[10px] text-dark-brown/30 tracking-wider uppercase font-body">{article.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto"
          >
            <p className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body mb-4">Stay Inspired</p>
            <h2 className="font-heading text-3xl lg:text-4xl text-dark-brown mb-6">Join Our Journal</h2>
            <p className="text-dark-brown/50 text-sm leading-relaxed font-light mb-10">
              Receive stories of craft, ingredient spotlights, and exclusive previews of new collections.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-6 py-3 bg-transparent border border-dark-brown/15 text-dark-brown text-sm font-body placeholder:text-dark-brown/30 focus:outline-none focus:border-champagne-gold transition-colors duration-500"
              />
              <button className="px-8 py-3 bg-dark-brown text-cream text-[10px] tracking-[0.25em] uppercase font-body hover:bg-champagne-gold transition-colors duration-500">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
