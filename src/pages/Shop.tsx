import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { products, img } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import Sidebar from '../components/shop/Sidebar';
import QuickView from '../components/shop/QuickView';
import Pagination from '../components/shop/Pagination';
import { HiOutlineAdjustments, HiX } from 'react-icons/hi';

const ITEMS_PER_PAGE = 9;

interface Filters {
  collection: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  sort: string;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    collection: searchParams.get('collection') || '',
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: searchParams.get('sort') || '',
  });
  const [page, setPage] = useState(1);
  const [quickView, setQuickView] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const prevFiltersRef = useRef(filters);
  useEffect(() => {
    if (prevFiltersRef.current !== filters) {
      setPage(1);
      prevFiltersRef.current = filters;
    }
    gridTopRef.current?.scrollIntoView({ block: 'start' });
  }, [filters, page]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.collection) {
      result = result.filter((p) => p.collection === filters.collection);
    }
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (filters.sort === 'newest') result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const selectedProduct = quickView ? products.find((p) => p.id === quickView) ?? null : null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, willChange: 'transform' }} className="absolute inset-0">
          <img
            src={img.collection}
            alt="SMAR'S Collection"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/30 to-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, willChange: 'transform' }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-bronze text-xs tracking-[0.35em] uppercase font-body mb-4">Our Collection</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-espresso leading-[0.95]">
              Shop
              <span className="block text-bronze">Fragrances</span>
            </h1>
            <div className="w-16 h-[1px] bg-bronze mt-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-espresso/30 text-xs tracking-[0.2em] uppercase mb-10 font-body">{filtered.length} fragrances found</p>

        <div className="flex gap-8">
          <motion.div
            animate={{ width: filtersOpen ? 256 : 0, opacity: filtersOpen ? 1 : 0 }}
            className="hidden lg:block shrink-0 overflow-hidden"
          >
            <div className="sticky top-28 w-64">
              <Sidebar filters={filters} setFilters={setFilters} />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div ref={gridTopRef} className="flex items-center justify-between mb-8">
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] uppercase font-body transition-colors ${
                    filtersOpen ? 'text-espresso' : 'text-espresso/50 hover:text-espresso'
                  }`}
                >
                  <HiOutlineAdjustments size={16} />
                  {filtersOpen ? 'Hide Filters' : 'Filters'}
                </button>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="px-4 py-2 bg-transparent border border-espresso/10 text-xs tracking-[0.2em] uppercase font-body outline-none focus:border-bronze text-espresso/60 hover:text-espresso transition-colors"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] uppercase font-body text-espresso/50 hover:text-espresso transition-colors"
              >
                <HiOutlineAdjustments size={16} />
                Filters
              </button>
            </div>

            {paginated.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-espresso/[0.03] flex items-center justify-center mx-auto mb-6">
                  <HiOutlineAdjustments size={24} className="text-espresso/15" />
                </div>
                <p className="text-espresso/35 text-sm font-light">No fragrances match your criteria.</p>
                <p className="text-espresso/20 text-xs font-light mt-2">Try adjusting your filters to discover your perfect scent.</p>
                <button
                  onClick={() => setFilters({ collection: '', category: '', minPrice: '', maxPrice: '', search: '', sort: '' })}
                  className="mt-8 px-8 py-3 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product, i) => (
                  <div key={product.id} onDoubleClick={() => setQuickView(product.id)} className="cursor-pointer">
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </div>
            )}

            <Pagination current={page} total={totalPages} onPage={(p) => { setPage(p); }} />
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-cream p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-body text-espresso">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-espresso/30 hover:text-espresso transition-colors">
                <HiX size={20} />
              </button>
            </div>
            <Sidebar filters={filters} setFilters={setFilters} />
          </motion.div>
        </motion.div>
      )}

      <QuickView product={selectedProduct} onClose={() => setQuickView(null)} />
    </div>
  );
}
