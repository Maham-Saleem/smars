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
          className="fixed inset-0 z-[60] bg-deep-coffee/95 backdrop-blur-md flex flex-col items-center pt-24 lg:pt-32 px-4"
        >
          <button onClick={closeSearch} className="absolute top-6 right-6 text-cream/60 hover:text-cream">
            <HiX size={28} />
          </button>
          <div className="w-full max-w-2xl">
            <div className="flex items-center border-b border-cream/20 pb-2">
              <HiOutlineSearch className="text-cream/40" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances..."
                className="flex-1 bg-transparent text-cream text-xl lg:text-2xl font-body placeholder-cream/30 outline-none ml-3"
              />
            </div>
            {query && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4 max-h-[50vh] overflow-y-auto"
              >
                {filtered.length === 0 ? (
                  <p className="text-cream/40 text-center text-sm">No results found</p>
                ) : (
                  filtered.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-cream/5 transition-colors group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="text-cream font-heading group-hover:text-champagne-gold transition-colors">
                          {product.name}
                        </p>
                        <p className="text-cream/40 text-sm">${product.price}</p>
                      </div>
                    </Link>
                  ))
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
