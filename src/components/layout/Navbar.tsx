import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineShoppingBag, HiOutlineUser, HiMenu, HiX } from 'react-icons/hi';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

const navLinks = [
  { name: 'Collections', path: '/shop' },
  { name: 'Journal', path: '/#atelier' },
  { name: 'About', path: '/#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { openCart, openSearch, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location, closeMobileMenu]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-deep-coffee/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
              <img
                src={scrolled ? "/logo.svg" : "/logo-light.svg"}
                alt="SMAR'S Fragrance"
                className="h-14 lg:h-16 transition-all duration-500"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase font-body font-medium transition-colors relative group ${
                    scrolled ? 'text-cream/80 hover:text-champagne-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-champagne-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <button onClick={openSearch} className={`transition-colors ${scrolled ? 'text-cream/80 hover:text-champagne-gold' : 'text-white/80 hover:text-white'}`}>
                <HiOutlineSearch size={22} />
              </button>
              <Link to="/account" className={`hidden sm:block transition-colors ${scrolled ? 'text-cream/80 hover:text-champagne-gold' : 'text-white/80 hover:text-white'}`}>
                <HiOutlineUser size={22} />
              </Link>
              <Link to="/account" className={`transition-colors relative ${scrolled ? 'text-cream/80 hover:text-champagne-gold' : 'text-white/80 hover:text-white'}`}>
                <HiOutlineHeart size={22} />
              </Link>
              <button onClick={openCart} className={`transition-colors relative ${scrolled ? 'text-cream/80 hover:text-champagne-gold' : 'text-white/80 hover:text-white'}`}>
                <HiOutlineShoppingBag size={22} />
                {totalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-champagne-gold text-deep-coffee text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </button>
              <button onClick={toggleMobileMenu} className={`lg:hidden transition-colors ${scrolled ? 'text-cream' : 'text-white'}`}>
                {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep-coffee lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <img src="/logo-light.svg" alt="SMAR'S Fragrance" className="h-20 mb-8" />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className="text-cream text-2xl font-heading tracking-wider hover:text-champagne-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/account"
                    onClick={closeMobileMenu}
                    className="mt-4 px-8 py-3 border border-champagne-gold text-champagne-gold text-sm tracking-widest uppercase hover:bg-champagne-gold hover:text-deep-coffee transition-all"
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
