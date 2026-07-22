import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
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
    <div className="pt-24 lg:pt-28 pb-20 lg:pb-28 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-champagne-gold text-sm tracking-[0.3em] uppercase font-body mb-2">Our Collection</p>
          <h1 className="font-heading text-4xl lg:text-5xl text-dark-brown">Shop Fragrances</h1>
          <p className="text-dark-brown/50 mt-3 text-sm">{filtered.length} fragrances found</p>
        </motion.div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <Sidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <div className="hidden lg:flex items-center gap-2">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="px-4 py-2 bg-white border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold text-dark-brown"
                >
                  <option value="">Default Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-dark-brown/20 rounded-lg text-sm text-dark-brown/60 hover:border-dark-brown transition-colors"
              >
                <HiOutlineAdjustments size={18} />
                Filters
              </button>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-dark-brown/50 text-lg">No fragrances match your criteria.</p>
                <button
                  onClick={() => setFilters({ collection: '', category: '', minPrice: '', maxPrice: '', search: '', sort: '' })}
                  className="mt-4 px-6 py-2 border border-dark-brown text-dark-brown text-sm tracking-wider uppercase hover:bg-dark-brown hover:text-cream transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product, i) => (
                  <div key={product.id} onDoubleClick={() => setQuickView(product.id)} className="cursor-pointer">
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </div>
            )}

            <Pagination current={page} total={totalPages} onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
          </div>
        </div>
      </div>

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
              <h2 className="font-heading text-xl text-dark-brown">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-dark-brown/50 hover:text-dark-brown">
                <HiX size={24} />
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
