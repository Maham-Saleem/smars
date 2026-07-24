import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface Props {
  onSuccess?: () => void;
  onLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onLogin }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const register = useAuthStore((s) => s.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(name, email, password);
    setLoading(false);
    toast.success('Account created! Welcome to SMAR\'S.');
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
        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
          placeholder="Min. 6 characters"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
      <p className="text-center text-xs text-dark-brown/50">
        Already have an account?{' '}
        <button type="button" onClick={onLogin} className="text-champagne-gold hover:underline">
          Sign In
        </button>
      </p>
    </motion.form>
  );
}
