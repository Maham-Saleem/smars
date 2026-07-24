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

const pricePresets = [
  { label: 'Under $200', min: '', max: '200' },
  { label: '$200 – $350', min: '200', max: '350' },
  { label: '$350 – $500', min: '350', max: '500' },
  { label: '$500+', min: '500', max: '' },
];

export default function Sidebar({ filters, setFilters }: Props) {
  const update = (key: keyof Filters, value: string) => setFilters({ ...filters, [key]: value });
  const hasActivePrice = filters.minPrice || filters.maxPrice;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* Search */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase font-body text-espresso/40 mb-5">Search</h3>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          placeholder="Search fragrances..."
          className="w-full pb-2 bg-transparent border-b border-espresso/10 text-sm text-espresso outline-none focus:border-bronze transition-colors placeholder:text-espresso/20 font-light"
        />
      </div>

      <div className="h-[1px] bg-espresso/5" />

      {/* Collections */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase font-body text-espresso/40 mb-5">Collections</h3>
        <div className="space-y-1">
          {[
            { label: 'All Collections', value: '' },
            ...collections.map((c) => ({ label: c.name, value: c.id })),
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => update('collection', item.value)}
              className={`block w-full text-left py-2 text-sm border-b border-transparent transition-all duration-500 ${
                filters.collection === item.value
                  ? 'text-espresso border-bronze/40'
                  : 'text-espresso/40 hover:text-espresso/70'
              }`}
            >
              {item.label}
              {filters.collection === item.value && (
                <span className="float-right text-[8px] text-bronze/60">●</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-espresso/5" />

      {/* Category */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase font-body text-espresso/40 mb-5">Category</h3>
        <div className="space-y-1">
          {[
            { label: 'All Categories', value: '' },
            ...categories.map((c) => ({ label: c, value: c })),
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => update('category', item.value)}
              className={`block w-full text-left py-2 text-sm border-b border-transparent transition-all duration-500 ${
                filters.category === item.value
                  ? 'text-espresso border-bronze/40'
                  : 'text-espresso/40 hover:text-espresso/70'
              }`}
            >
              {item.label}
              {filters.category === item.value && (
                <span className="float-right text-[8px] text-bronze/60">●</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-espresso/5" />

      {/* Price Range */}
      <div>
        <h3 className="text-[10px] tracking-[0.3em] uppercase font-body text-espresso/40 mb-5">Price Range</h3>
        <div className="flex flex-wrap gap-2">
          {pricePresets.map((preset) => {
            const isActive =
              filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  update('minPrice', preset.min);
                  update('maxPrice', preset.max);
                }}
                className={`px-4 py-2 text-xs border transition-all duration-500 ${
                  isActive
                    ? 'border-espresso text-espresso bg-espresso/5'
                    : 'border-espresso/10 text-espresso/40 hover:border-espresso/30 hover:text-espresso/70'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
          {hasActivePrice && !pricePresets.some(
            (p) => filters.minPrice === p.min && filters.maxPrice === p.max
          ) && (
            <span className="text-[10px] text-bronze italic w-full mt-1">
              ${filters.minPrice || '0'} – ${filters.maxPrice || '∞'}
            </span>
          )}
        </div>
      </div>

      <div className="h-[1px] bg-espresso/5" />

      {/* Sort (mobile) */}
      <div className="lg:hidden">
        <h3 className="text-[10px] tracking-[0.3em] uppercase font-body text-espresso/40 mb-5">Sort By</h3>
        <div className="space-y-1">
          {[
            { label: 'Default', value: '' },
            { label: 'Price — Low to High', value: 'price-asc' },
            { label: 'Price — High to Low', value: 'price-desc' },
            { label: 'Highest Rated', value: 'rating' },
            { label: 'Newest', value: 'newest' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => update('sort', item.value)}
              className={`block w-full text-left py-2 text-sm border-b border-transparent transition-all duration-500 ${
                filters.sort === item.value
                  ? 'text-espresso border-bronze/40'
                  : 'text-espresso/40 hover:text-espresso/70'
              }`}
            >
              {item.label}
              {filters.sort === item.value && (
                <span className="float-right text-[8px] text-bronze/60">●</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={() =>
          setFilters({
            collection: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            search: '',
            sort: '',
          })
        }
        className="w-full py-3 text-[10px] tracking-[0.3em] uppercase font-body text-espresso/30 hover:text-espresso border border-espresso/10 hover:border-espresso/30 transition-all duration-500"
      >
        Clear All Filters
      </button>
    </motion.aside>
  );
}
