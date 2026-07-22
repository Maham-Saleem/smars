import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-deep-coffee text-cream/80" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <img src="/logo.svg" alt="SMAR'S Fragrance" className="h-16" />
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              Crafting exceptional fragrances since 2024. Every bottle tells a story of passion, artistry, and timeless elegance.
            </p>
            <div className="flex gap-4 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaPinterestP].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:border-champagne-gold hover:text-champagne-gold transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg text-cream mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Collections', 'Best Sellers', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-cream/60 hover:text-champagne-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-cream mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {['Shipping & Returns', 'FAQ', 'Size Guide', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-cream/60 hover:text-champagne-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-cream mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-0.5 text-champagne-gold shrink-0" size={18} />
                <span className="text-sm text-cream/60">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-champagne-gold shrink-0" size={18} />
                <span className="text-sm text-cream/60">+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-champagne-gold shrink-0" size={18} />
                <span className="text-sm text-cream/60">hello@smars.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">© 2026 SMAR'S. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-cream/40 hover:text-cream/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
