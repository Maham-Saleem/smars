import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineShoppingBag, HiOutlineUser, HiMenu, HiX } from 'react-icons/hi';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

const navLinks = [
  { name: 'Atelier', path: '/' },
  { name: 'Collections', path: '/shop' },
  { name: 'Journal', path: '/journal' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { openCart, openSearch, openAuth, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location, closeMobileMenu]);

  const isHome = location.pathname === '/';
  const isDark = isHome && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(212,197,178,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu} className="relative z-10">
              <img
                src={isDark ? '/logo.svg' : '/logo.svg'}
                alt="SMAR'S"
                className="h-10 sm:h-12 lg:h-14 transition-all duration-700"
              />
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] tracking-editorial uppercase font-body transition-colors duration-500 relative group ${
                    isDark
                      ? 'text-espresso/90 hover:text-espresso'
                      : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${
                    isDark ? 'bg-bronze/60' : 'bg-bronze/60'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 relative z-10">
              <button
                onClick={openSearch}
                aria-label="Search"
                className={`transition-colors duration-500 ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                <HiOutlineSearch size={20} />
              </button>
              {isAuthenticated ? (
                <Link
                  to="/account"
                  aria-label="Account"
                  className={`hidden sm:block transition-colors duration-500 ${
                    isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  <HiOutlineUser size={20} />
                </Link>
              ) : (
                <button
                  onClick={openAuth}
                  aria-label="Sign in"
                  className={`hidden sm:block transition-colors duration-500 ${
                    isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  <HiOutlineUser size={20} />
                </button>
              )}
              <Link
                to="/account?tab=wishlist"
                aria-label="Wishlist"
                className={`transition-colors duration-500 relative ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                <HiOutlineHeart size={20} />
              </Link>
              <button
                onClick={openCart}
                aria-label="Shopping bag"
                className={`transition-colors duration-500 relative ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                <HiOutlineShoppingBag size={20} />
                {totalItems() > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-bronze text-cream text-[9px] font-body w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={`lg:hidden transition-colors duration-500 ml-1 ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-espresso/40 backdrop-blur-sm" onClick={closeMobileMenu} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 bottom-0 w-[75%] max-w-sm bg-ivory shadow-2xl"
            >
              <div className="flex flex-col h-full px-8 py-20">
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="absolute top-6 right-6 text-espresso/40 hover:text-espresso transition-colors"
                >
                  <HiX size={24} />
                </button>

                <div className="flex-1 flex flex-col justify-center gap-8">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMobileMenu}
                        className="font-display text-2xl text-espresso hover:text-bronze transition-colors duration-500"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {!isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                  <button
                    onClick={() => { closeMobileMenu(); openAuth(); }}
                    className="block w-full py-3 text-center text-[10px] tracking-editorial uppercase font-body border border-espresso/20 text-espresso/60 hover:border-bronze hover:text-bronze transition-all duration-500"
                  >
                    Sign In
                  </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
