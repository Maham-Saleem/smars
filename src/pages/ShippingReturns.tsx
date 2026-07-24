import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ShippingReturns() {
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
          <p className="text-champagne/60 text-xs tracking-[0.35em] uppercase font-body mb-4">Customer Care</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-cream leading-[0.95]">
            Shipping & Returns
          </h1>
          <div className="w-16 h-[1px] bg-champagne/40 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="space-y-16">
          {/* Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Shipping Policy</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                We offer complimentary standard shipping on all orders over $300. 
                Orders are processed within 1–2 business days after payment confirmation.
              </p>

              <div>
                <h3 className="font-heading text-xl text-espresso mb-3">Delivery Options</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Standard (5–8 business days)', cost: '$10', free: 'Free on orders $300+' },
                    { label: 'Express (2–3 business days)', cost: '$25' },
                    { label: 'Next-Day Delivery', cost: '$35' },
                  ].map((option) => (
                    <div key={option.label} className="flex items-center justify-between py-3 border-b border-espresso/5">
                      <span className="text-espresso/70">{option.label}</span>
                      <span className="text-espresso/40 text-xs">{option.free || option.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                All orders are shipped from our Beverly Hills atelier. Delivery times are 
                estimates and may vary due to carrier delays or customs processing for 
                international orders.
              </p>

              <p>
                Once your order dispatches, you will receive a confirmation email with 
                tracking information. We currently ship to all 50 US states and select 
                international destinations.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          {/* Returns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-espresso mb-8">Returns & Exchanges</h2>
            <div className="space-y-6 text-espresso/60 text-sm leading-relaxed font-light">
              <p>
                We want you to love your fragrance. If you are not completely satisfied, 
                we gladly accept returns within 30 days of delivery.
              </p>

              <div>
                <h3 className="font-heading text-xl text-espresso mb-3">Return Conditions</h3>
                <ul className="space-y-2 list-disc pl-5">
                  {[
                    'Items must be unused and in their original packaging.',
                    'Fragrances must be unopened with the seal intact.',
                    'Include all accessories and documentation.',
                    'A return authorization number is required — please contact us first.',
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl text-espresso mb-3">Process</h3>
                <ol className="space-y-2 list-decimal pl-5">
                  {[
                    'Email us at returns@smars.com to request a return authorization.',
                    'Pack the item securely in its original packaging.',
                    'Ship the package to our returns center using the provided label.',
                    'Refunds are processed within 5–7 business days of receipt.',
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-espresso/[0.03] p-6 rounded-sm">
                <p className="text-espresso/70 text-sm font-light">
                  <span className="font-medium text-espresso">Note:</span> Shipping costs are 
                  non-refundable. For international returns, the customer is responsible for 
                  return shipping costs and any applicable customs fees.
                </p>
              </div>

              <p>
                Exchanges for a different fragrance or size are processed as a return and 
                new purchase for faster fulfillment.
              </p>
            </div>
          </motion.div>

          <div className="h-[1px] bg-espresso/5" />

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-espresso mb-4">Still have questions?</h2>
            <p className="text-espresso/50 text-sm font-light mb-8">
              Our customer care team is here to help.
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
