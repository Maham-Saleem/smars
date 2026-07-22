import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2E1F14 0%, #1a130f 100%)' }}>
      {/* Main footer content */}
      <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <img src="/logo.svg" alt="SMAR'S" className="h-16 sm:h-20 mb-8" />
            <p className="text-sm text-cream/40 leading-relaxed font-light max-w-sm mb-8">
              Crafting exceptional fragrances since 2024. Every bottle tells 
              a story of passion, artistry, and timeless elegance.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaPinterestP].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-cream/30 hover:text-champagne hover:bg-cream/5 transition-all duration-500"
                  style={{ border: '1px solid rgba(199, 163, 107, 0.15)' }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-[10px] tracking-editorial uppercase text-champagne/40 font-body mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Collections', path: '/shop' },
                { name: 'About', path: '/#about' },
                { name: 'Account', path: '/account' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-cream/30 hover:text-champagne/70 transition-colors duration-500 font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-editorial uppercase text-champagne/40 font-body mb-6">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {['Shipping & Returns', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-cream/30 hover:text-champagne/70 transition-colors duration-500 font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 lg:col-start-1">
            <h4 className="text-[10px] tracking-editorial uppercase text-champagne/40 font-body mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-0.5 text-champagne/30 shrink-0" size={16} />
                <span className="text-sm text-cream/30 font-light">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-champagne/30 shrink-0" size={16} />
                <span className="text-sm text-cream/30 font-light">+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-champagne/30 shrink-0" size={16} />
                <span className="text-sm text-cream/30 font-light">hello@smars.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/[0.06]">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-cream/20 font-body">
            © 2026 SMAR'S. All rights reserved.
          </p>
          <p className="text-[10px] text-cream/20 font-body italic">
            Scents that defines you.
          </p>
        </div>
      </div>
    </footer>
  );
}
