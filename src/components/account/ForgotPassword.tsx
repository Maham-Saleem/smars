import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Props {
  onBack: () => void;
}

export default function ForgotPassword({ onBack }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success('Reset link sent to your email');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {sent ? (
        <div className="text-center">
          <p className="text-dark-brown/70">Check your email for a password reset link.</p>
          <button onClick={onBack} className="mt-6 text-sm text-champagne-gold hover:underline">
            Back to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-sm text-dark-brown/60">Enter your email and we'll send you a reset link.</p>
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
          <button type="submit" className="w-full py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
            Send Reset Link
          </button>
          <button type="button" onClick={onBack} className="w-full text-center text-xs text-dark-brown/50 hover:text-champagne-gold transition-colors">
            Back to Sign In
          </button>
        </form>
      )}
    </motion.div>
  );
}
