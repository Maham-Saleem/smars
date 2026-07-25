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
  { name: 'Craftmanship', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { openCart, openSearch, openAuth, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
                src={'/logo.svg'}
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
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bronze/60 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-3 lg:gap-5 relative z-10">
              <button
                onClick={openSearch}
                aria-label="Search"
                className={`touch-target flex items-center justify-center transition-colors duration-500 ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                <HiOutlineSearch size={20} className="sm:size-5 size-[18px]" />
              </button>
              {isAuthenticated ? (
                <Link
                  to="/account"
                  aria-label="Account"
                  className={`hidden sm:flex touch-target items-center justify-center transition-colors duration-500 ${
                    isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  <HiOutlineUser size={20} className="sm:size-5 size-[18px]" />
                </Link>
              ) : (
                <button
                  onClick={openAuth}
                  aria-label="Sign in"
                  className={`hidden sm:flex touch-target items-center justify-center transition-colors duration-500 ${
                    isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  <HiOutlineUser size={20} className="sm:size-5 size-[18px]" />
                </button>
              )}
              <Link
                to="/account?tab=wishlist"
                aria-label="Wishlist"
                className={`touch-target flex items-center justify-center transition-colors duration-500 relative ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                <HiOutlineHeart size={20} className="sm:size-5 size-[18px]" />
              </Link>
              <button
                onClick={openCart}
                aria-label="Shopping bag"
                className={`touch-target flex items-center justify-center transition-colors duration-500 relative ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                <HiOutlineShoppingBag size={20} className="sm:size-5 size-[18px]" />
                {totalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1.5 sm:-right-1.5 bg-bronze text-cream text-[9px] font-body w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={`lg:hidden touch-target flex items-center justify-center transition-colors duration-500 ${
                  isDark ? 'text-espresso/80 hover:text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                {isMobileMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-espresso/60 backdrop-blur-md" onClick={closeMobileMenu} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-ivory shadow-2xl safe-bottom"
            >
              <div className="flex flex-col h-full px-8 py-24 safe-top">
                {/* Logo in menu */}
                <div className="mb-12">
                  <img src={'/logo.svg'} alt="SMAR'S" className="h-10" />
                </div>

                <nav className="flex-1 flex flex-col gap-4">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06 }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMobileMenu}
                        className="block py-3 font-display text-2xl text-espresso hover:text-bronze transition-colors duration-500"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 pt-6 border-t border-espresso/[0.06]"
                >
                  {!isAuthenticated ? (
                    <button
                      onClick={() => { closeMobileMenu(); openAuth(); }}
                      className="block w-full py-4 text-center text-[10px] tracking-editorial uppercase font-body border border-espresso/20 text-espresso/60 hover:border-bronze hover:text-bronze transition-all duration-500"
                    >
                      Sign In
                    </button>
                  ) : (
                    <Link
                      to="/account"
                      onClick={closeMobileMenu}
                      className="block w-full py-4 text-center text-[10px] tracking-editorial uppercase font-body border border-espresso/20 text-espresso/60 hover:border-bronze hover:text-bronze transition-all duration-500"
                    >
                      My Account
                    </Link>
                  )}
                  <Link
                    to="/account?tab=wishlist"
                    onClick={closeMobileMenu}
                    className="block w-full py-4 text-center text-[10px] tracking-editorial uppercase font-body text-espresso/40 hover:text-espresso/70 transition-colors duration-500"
                  >
                    Wishlist
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
