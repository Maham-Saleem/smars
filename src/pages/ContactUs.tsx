import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const contactInfo = [
  {
    title: 'Visit Our Atelier',
    lines: ['Beverly Hills, CA 90210', '555 Luxury Lane', 'United States'],
    icon: '📍',
  },
  {
    title: 'Reach Us',
    lines: ['+1 (555) 123-4567', 'hello@smars.com'],
    icon: '📞',
  },
  {
    title: 'Atelier Hours',
    lines: ['Mon – Fri: 10am – 7pm', 'Sat: 11am – 6pm', 'Sun: By appointment'],
    icon: '🕯',
  },
];

export default function ContactUs() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent! We will be in touch shortly.');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/16722501/pexels-photo-16722501.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="SMAR'S Atelier"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/20 to-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-champagne-gold text-xs tracking-[0.35em] uppercase font-body mb-4">Get in Touch</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-cream leading-[0.95]">
              Contact
              <span className="block text-champagne-gold">Us</span>
            </h1>
            <div className="w-16 h-[1px] bg-champagne-gold mt-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 sm:py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <p className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body mb-6">
                Our Atelier
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-[1.05] mb-8">
                We would love to
                <span className="block italic text-bronze">hear from you</span>
              </h2>
              <p className="text-espresso/50 text-sm leading-relaxed font-light mb-12">
                Whether you have a question about our collections, need fragrance advice, or
                wish to schedule a private consultation at our Beverly Hills atelier — our
                team is here to help.
              </p>

              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-heading text-espresso text-sm mb-1">{item.title}</p>
                      {item.lines.map((line) => (
                        <p key={line} className="text-espresso/50 text-sm font-light">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm">
                <h3 className="font-heading text-2xl text-espresso mb-8">Send a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-espresso/50 mb-2">Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-espresso/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors bg-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-espresso/50 mb-2">Email</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-espresso/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors bg-cream"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-xs tracking-wider uppercase text-espresso/50 mb-2">Subject</label>
                  <input
                    type="text" required value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-espresso/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors bg-cream"
                  />
                </div>

                <div className="mt-5">
                  <label className="block text-xs tracking-wider uppercase text-espresso/50 mb-2">Message</label>
                  <textarea
                    required value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-espresso/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors bg-cream resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-8 w-full py-3 bg-espresso text-cream text-sm tracking-widest uppercase font-medium hover:bg-bronze transition-colors duration-500 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-warm-beige">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-champagne-gold text-[10px] tracking-[0.3em] uppercase font-body mb-6">
              Prefer to browse first?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-tight mb-8">
              Explore our
              <span className="italic text-bronze"> collection</span>
            </h2>
            <div className="w-12 h-[1px] bg-bronze/30 mx-auto mb-8" />
            <p className="text-espresso/50 leading-relaxed font-light mb-10 max-w-xl mx-auto">
              Discover the fragrances that define SMAR'S. From timeless signatures to
              limited editions — each bottle tells a story.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-4 px-10 py-4 bg-espresso text-cream text-[10px] tracking-[0.3em] uppercase font-body hover:bg-bronze transition-colors duration-500"
            >
              <span>Discover Collections</span>
              <span className="w-6 h-[1px] bg-cream/30 group-hover:w-10 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
