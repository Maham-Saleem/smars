import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { useUIStore } from '../../store/uiStore';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSearchOpen, closeSearch]);

  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 z-[60] bg-deep-coffee/95 backdrop-blur-md flex flex-col items-center pt-24 lg:pt-32 px-4"
        >
          <button onClick={closeSearch} className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10">
            <HiX size={28} />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
            <div className="flex items-center border-b-2 border-champagne-gold/30 pb-3 transition-colors focus-within:border-champagne-gold">
              <HiOutlineSearch className="text-champagne-gold/60" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, collections..."
                className="flex-1 bg-transparent text-cream text-xl lg:text-2xl font-body placeholder-cream/50 outline-none ml-3"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-cream/30 hover:text-cream transition-colors p-1">
                  <HiX size={20} />
                </button>
              )}
            </div>
            <p className="text-cream/20 text-xs mt-3 text-center">Press <span className="text-cream/40">ESC</span> to close</p>
            {query && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-2 max-h-[55vh] overflow-y-auto scrollbar-thin"
              >
                {filtered.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-cream/30 text-lg font-heading">No results found</p>
                    <p className="text-cream/20 text-sm mt-2">Try a different search term</p>
                  </div>
                ) : (
                  <>
                    <p className="text-cream/30 text-xs tracking-wider uppercase mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
                    {filtered.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={closeSearch}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream/10 transition-all duration-300 group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-20 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-cream font-heading group-hover:text-champagne-gold transition-colors truncate">
                            {product.name}
                          </p>
                          <p className="text-cream/40 text-sm mt-0.5">{product.collection}</p>
                          <p className="text-champagne-gold/70 text-sm font-heading mt-1">${product.price}</p>
                        </div>
                        <span className="text-cream/20 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          View
                        </span>
                      </Link>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
