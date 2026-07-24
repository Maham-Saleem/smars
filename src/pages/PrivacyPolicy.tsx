import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
          <p className="text-champagne/60 text-xs tracking-[0.35em] uppercase font-body mb-4">Policies</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-cream leading-[0.95]">
            Privacy Policy
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
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Information We Collect</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                When you make a purchase or attempt to make a purchase through our site, we collect
                certain information from you, including your name, billing address, shipping address,
                payment information, email address, and phone number. We refer to this information
                as "Order Information."
              </p>
              <p>
                When you browse our site, we also automatically receive your computer's internet
                protocol (IP) address to provide us with information that helps us learn about
                your browser and operating system.
              </p>
              <p>
                Email marketing (if applicable): With your permission, we may send you emails
                about our collections, new arrivals, and other updates.
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
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">How We Use Your Information</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>We use the Order Information that we collect generally to:</p>
              <ul className="space-y-2 list-disc pl-5">
                {[
                  'Process and fulfill your orders, including shipping and delivery confirmations.',
                  'Communicate with you about your order, our products, and services.',
                  'Screen our orders for potential risk or fraud.',
                  'Provide you with information or advertising relating to our products or services.',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                We use the Device Information that we collect to help us screen for potential
                risk and fraud, and more generally to improve and optimize our site.
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
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Data Protection</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                We implement a variety of security measures to maintain the safety of your
                personal information when you place an order or enter, submit, or access your
                personal information. All sensitive information is transmitted via Secure
                Socket Layer (SSL) technology and encrypted in our database.
              </p>
              <p>
                We do not store your credit or debit card information on our servers. All
                payment transactions are processed through secure, PCI-compliant payment
                gateways.
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
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Third-Party Services</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                In general, the third-party providers used by us will only collect, use, and
                disclose your information to the extent necessary to allow them to perform the
                services they provide to us. However, certain third-party service providers,
                such as payment gateways, have their own privacy policies in respect to the
                information we are required to provide to them for your purchase-related transactions.
              </p>
              <p>
                Once you leave our website or are redirected to a third-party website or
                application, you are no longer governed by this Privacy Policy.
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
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Contact</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                For more information about our privacy practices, if you have questions, or
                if you would like to make a complaint, please contact us by email at
                privacy@smars.com or by mail at:
              </p>
              <p className="text-espresso/70">
                SMAR'S<br />
                555 Luxury Lane<br />
                Beverly Hills, CA 90210<br />
                United States
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-espresso mb-4">Still have questions?</h2>
            <p className="text-espresso/50 text-sm font-light mb-8">
              Our team is happy to answer any privacy-related inquiries.
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
