import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface Props {
  onSuccess?: () => void;
  onRegister?: () => void;
  onForgot?: () => void;
}

export default function LoginForm({ onSuccess, onRegister, onForgot }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    toast.success('Welcome back!');
    onSuccess?.();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
          placeholder="••••••••"
        />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onForgot} className="text-xs text-dark-brown/50 hover:text-champagne-gold transition-colors">
          Forgot Password?
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      <p className="text-center text-xs text-dark-brown/50">
        Don't have an account?{' '}
        <button type="button" onClick={onRegister} className="text-champagne-gold hover:underline">
          Register
        </button>
      </p>
    </motion.form>
  );
}
