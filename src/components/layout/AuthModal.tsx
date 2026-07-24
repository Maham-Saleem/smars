import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import toast from 'react-hot-toast';

type AuthView = 'login' | 'register';

export default function AuthModal() {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthOpen, closeAuth, pendingProduct, setPendingProduct } = useUIStore();
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const addItem = useCartStore((s) => s.addItem);

  const handleSuccess = () => {
    if (pendingProduct) {
      addItem(pendingProduct);
      toast.success('Added to your shopping bag.');
      setPendingProduct(null);
    }
    closeAuth();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    toast.success('Welcome back!');
    handleSuccess();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(name, email, password);
    setLoading(false);
    toast.success('Account created! Welcome to SMAR\'S.');
    handleSuccess();
  };

  const handleClose = () => {
    setPendingProduct(null);
    setEmail('');
    setPassword('');
    setName('');
    closeAuth();
  };

  const switchView = (v: AuthView) => {
    setView(v);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-cream p-8 sm:p-10 shadow-2xl"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 text-espresso/30 hover:text-espresso transition-colors"
            >
              <HiX size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-espresso/5 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7 text-espresso/50">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl text-espresso">
                {view === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              {pendingProduct && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-espresso/40 text-xs mt-3 font-light leading-relaxed"
                >
                  Sign in to add <span className="text-espresso/70 font-medium italic">{pendingProduct.name}</span> to your shopping bag.
                </motion.p>
              )}
              {!pendingProduct && (
                <p className="text-espresso/30 text-xs mt-3 font-light">
                  {view === 'login' ? 'Sign in to your account to continue.' : 'Register to start your fragrance journey.'}
                </p>
              )}
            </div>

            <div className="flex mb-8 border-b border-espresso/5">
              {(['login', 'register'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className={`flex-1 pb-3 text-[10px] tracking-[0.3em] uppercase font-body transition-all duration-500 ${
                    view === v
                      ? 'text-espresso border-b border-bronze/60'
                      : 'text-espresso/30 hover:text-espresso/60'
                  }`}
                >
                  {v === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {view === 'login' && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-espresso/40 mb-2 font-body">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full pb-2 bg-transparent border-b border-espresso/10 text-sm text-espresso outline-none focus:border-bronze transition-colors placeholder:text-espresso/20 font-light"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-espresso/40 mb-2 font-body">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full pb-2 bg-transparent border-b border-espresso/10 text-sm text-espresso outline-none focus:border-bronze transition-colors placeholder:text-espresso/20 font-light"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-espresso text-cream text-[10px] tracking-[0.3em] uppercase font-body hover:bg-bronze transition-all duration-500 disabled:opacity-40"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </motion.form>
              )}
              {view === 'register' && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRegister}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-espresso/40 mb-2 font-body">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="w-full pb-2 bg-transparent border-b border-espresso/10 text-sm text-espresso outline-none focus:border-bronze transition-colors placeholder:text-espresso/20 font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-espresso/40 mb-2 font-body">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full pb-2 bg-transparent border-b border-espresso/10 text-sm text-espresso outline-none focus:border-bronze transition-colors placeholder:text-espresso/20 font-light"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-espresso/40 mb-2 font-body">Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="w-full pb-2 bg-transparent border-b border-espresso/10 text-sm text-espresso outline-none focus:border-bronze transition-colors placeholder:text-espresso/20 font-light"
                      placeholder="Min. 6 characters"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-espresso text-cream text-[10px] tracking-[0.3em] uppercase font-body hover:bg-bronze transition-all duration-500 disabled:opacity-40"
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="text-center text-[10px] text-espresso/30 mt-6 font-body">
              {view === 'login' ? (
                <>Don't have an account? <button onClick={() => switchView('register')} className="text-bronze hover:underline">Register</button></>
              ) : (
                <>Already have an account? <button onClick={() => switchView('login')} className="text-bronze hover:underline">Sign In</button></>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
