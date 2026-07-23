import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles, categories } from '../data/articles';

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
            src="https://images.pexels.com/photos/28486682/pexels-photo-28486682.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Journal"
            className="w-full h-full object-cover"
          />
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
            <Link to={`/journal/${articles[0].id}`} className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/40 via-transparent to-transparent" />
            </Link>
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
                to={`/journal/${articles[0].id}`}
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
            >
              <Link to={`/journal/${article.id}`} className="group block">
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
              </Link>
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
              <button className="px-8 py-3 bg-espresso text-cream text-[10px] tracking-[0.25em] uppercase font-body hover:bg-bronze transition-colors duration-500">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
