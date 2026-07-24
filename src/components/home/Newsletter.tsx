import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Welcome to the SMAR\'S community!');
      setEmail('');
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-warm-beige relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-champagne-gold blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-dark-brown blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-full bg-champagne-gold/10 flex items-center justify-center mx-auto">
            <HiOutlineMail className="text-2xl text-champagne-gold" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl text-dark-brown mt-6 mb-4">
            Join the World of SMAR'S
          </h2>
          <p className="text-dark-brown/60 text-base lg:text-lg leading-relaxed">
            Subscribe to receive exclusive access to limited editions, early previews, and perfumery insights from our master artisans.
          </p>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              autoComplete="email"
              className="flex-1 px-6 py-4 bg-white border border-dark-brown/10 rounded-lg text-dark-brown placeholder-dark-brown/30 outline-none focus:border-champagne-gold transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-dark-brown text-cream text-sm tracking-[0.2em] uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-dark-brown/40 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  );
}
