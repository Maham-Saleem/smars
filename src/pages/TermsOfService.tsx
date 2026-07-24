import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center overflow-hidden bg-espresso">
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 w-full text-center"
        >
          <p className="text-champagne/60 text-xs tracking-[0.35em] uppercase font-body mb-4">Agreement</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-cream leading-[0.95]">
            Terms of Service
          </h1>
          <div className="w-16 h-[1px] bg-champagne/40 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-espresso/40 text-xs tracking-[0.2em] uppercase font-body mb-6">Last updated: July 2026</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">General Terms</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                By accessing and placing an order with SMAR'S, you confirm that you are in
                agreement with and bound by the terms and conditions contained below. These
                terms apply to all visitors, users, and customers of our website.
              </p>
              <p>
                If you do not agree to these terms and conditions, please do not use our
                website or place an order. We reserve the right to update, change, or replace
                any part of these terms at any time. It is your responsibility to check this
                page periodically for changes.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Products & Pricing</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                All prices are listed in US Dollars and are subject to change without notice.
                We reserve the right at any time to modify or discontinue any product without
                notice at any time.
              </p>
              <p>
                We have made every effort to display as accurately as possible the colors and
                images of our products that appear at the store. We cannot guarantee that your
                computer monitor's display of any color will be accurate.
              </p>
              <p>
                We reserve the right to limit the sales of our products to any person,
                geographic region, or jurisdiction. We may exercise this right on a
                case-by-case basis.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Account Responsibility</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                If you create an account on our website, you are responsible for maintaining
                the security of your account and for all activities that occur under the
                account. You must immediately notify us of any unauthorized use of your
                account.
              </p>
              <p>
                We reserve the right to refuse service, terminate accounts, remove or edit
                content, or cancel orders at our sole discretion.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Intellectual Property</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                All content on this website, including but not limited to text, images,
                graphics, logos, and fragrance compositions, is the property of SMAR'S and
                is protected by applicable intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, or create derivative works from any part
                of this website without our express written permission.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Limitation of Liability</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                SMAR'S shall not be liable for any direct, indirect, incidental, punitive, or
                consequential damages arising from your use of our website or purchase of our
                products. Our total liability to you shall not exceed the amount paid by you
                for the product giving rise to the claim.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain warranties or the
                limitation of liability, so the above limitations may not apply to you.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Contact</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                For questions about these terms, please contact us:
              </p>
              <p className="text-espresso/70">
                SMAR'S<br />
                555 Luxury Lane<br />
                Beverly Hills, CA 90210<br />
                United States<br />
                legal@smars.com
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-espresso mb-4">Have a question?</h2>
            <p className="text-espresso/50 text-sm font-light mb-8">
              Reach out to our team for clarification on any terms.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 border border-espresso/20 text-espresso/60 text-[10px] tracking-[0.3em] uppercase font-body hover:bg-espresso hover:text-cream transition-all duration-500"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
