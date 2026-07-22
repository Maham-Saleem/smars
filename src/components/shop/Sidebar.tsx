import { motion } from 'framer-motion';
import { collections, categories } from '../../data/products';

interface Filters {
  collection: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  sort: string;
}

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

export default function Sidebar({ filters, setFilters }: Props) {
  const update = (key: keyof Filters, value: string) => setFilters({ ...filters, [key]: value });

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h3 className="font-heading text-lg text-dark-brown mb-4">Search</h3>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          placeholder="Search fragrances..."
          className="w-full px-4 py-3 bg-white border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors placeholder-dark-brown/30"
        />
      </div>

      <div>
        <h3 className="font-heading text-lg text-dark-brown mb-4">Collections</h3>
        <div className="space-y-2">
          <button
            onClick={() => update('collection', '')}
            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
              !filters.collection ? 'bg-dark-brown text-cream' : 'text-dark-brown/60 hover:bg-dark-brown/5'
            }`}
          >
            All Collections
          </button>
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => update('collection', c.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                filters.collection === c.id ? 'bg-dark-brown text-cream' : 'text-dark-brown/60 hover:bg-dark-brown/5'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg text-dark-brown mb-4">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => update('category', '')}
            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
              !filters.category ? 'bg-dark-brown text-cream' : 'text-dark-brown/60 hover:bg-dark-brown/5'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => update('category', cat)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                filters.category === cat ? 'bg-dark-brown text-cream' : 'text-dark-brown/60 hover:bg-dark-brown/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg text-dark-brown mb-4">Price Range</h3>
        <div className="flex gap-3">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
            placeholder="Min"
            className="w-full px-3 py-2 bg-white border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors placeholder-dark-brown/30"
          />
          <span className="self-center text-dark-brown/30">—</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
            placeholder="Max"
            className="w-full px-3 py-2 bg-white border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors placeholder-dark-brown/30"
          />
        </div>
      </div>

      {/* Sort (shown in sidebar on desktop too) */}
      <div className="lg:hidden">
        <h3 className="font-heading text-lg text-dark-brown mb-4">Sort By</h3>
        <select
          value={filters.sort}
          onChange={(e) => update('sort', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors text-dark-brown"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <button
        onClick={() => setFilters({ collection: '', category: '', minPrice: '', maxPrice: '', search: '', sort: '' })}
        className="w-full py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg"
      >
        Clear Filters
      </button>
    </motion.aside>
  );
}
