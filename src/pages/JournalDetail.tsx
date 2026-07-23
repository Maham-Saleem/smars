import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { articles } from '../data/articles';

export default function JournalDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-dark-brown mb-4">Article Not Found</h1>
          <Link to="/journal" className="text-champagne-gold text-sm tracking-[0.2em] uppercase font-body">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-coffee/90 via-deep-coffee/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-cream/60 text-xs tracking-[0.2em] uppercase font-body mb-6 hover:text-cream transition-colors duration-500"
            >
              <HiArrowLeft size={14} />
              <span>Back to Journal</span>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body">{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-cream/30" />
              <span className="text-cream/40 text-[10px] tracking-wider uppercase font-body">{article.date}</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-dark-brown/40 font-body mb-12 pb-8 border-b border-dark-brown/10">
            <span>{article.author}</span>
            <span className="w-1 h-1 rounded-full bg-champagne-gold/40" />
            <span>{article.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-champagne-gold/40" />
            <span>{article.date}</span>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-dark-brown/70 leading-[1.8] text-base lg:text-lg font-light">
                {para}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-champagne-gold/30 my-16" />

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-champagne-gold font-body mb-8">More from {article.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <Link key={related.id} to={`/journal/${related.id}`} className="group">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-heading text-lg text-dark-brown group-hover:text-champagne-gold transition-colors duration-500">
                      {related.title}
                    </h4>
                    <p className="text-xs text-dark-brown/40 mt-1 font-body">{related.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
