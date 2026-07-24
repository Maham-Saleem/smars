import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineArrowLeft } from 'react-icons/hi';
import { useOrderStore } from '../store/orderStore';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const order = useOrderStore((s) => s.orders.find((o) => o.id === orderId));

  if (!order) {
    return (
      <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-dark-brown/50 text-lg">Order not found.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-dark-brown text-cream text-sm tracking-wider uppercase hover:bg-champagne-gold active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all">
            <HiOutlineArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto"
          >
            <HiOutlineCheck size={36} className="text-green-600" />
          </motion.div>

          <h1 className="font-heading text-3xl lg:text-4xl text-dark-brown mt-6 mb-3">
            Thank You, {order.shippingDetails.fullName.split(' ')[0]}!
          </h1>
          <p className="text-dark-brown/60">Your order has been confirmed and will be shipped shortly.</p>

          <div className="mt-8 p-6 bg-warm-beige rounded-xl">
            <p className="text-xs tracking-wider uppercase text-dark-brown/50 mb-1">Order Number</p>
            <p className="font-heading text-2xl text-dark-brown">{order.id}</p>

            <div className="h-[1px] bg-dark-brown/10 my-4" />

            <p className="text-xs tracking-wider uppercase text-dark-brown/50 mb-1">Estimated Delivery</p>
            <p className="font-heading text-lg text-dark-brown">{order.estimatedDelivery}</p>
          </div>

          <div className="mt-6 text-left space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-4 pb-3 border-b border-dark-brown/10">
                <img src={item.product.images[0]} alt={item.product.name} loading="lazy" className="w-14 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-heading text-dark-brown text-sm">{item.product.name}</h3>
                  <p className="text-xs text-dark-brown/50">Qty: {item.quantity}</p>
                  <p className="font-heading text-dark-brown text-sm mt-0.5">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between text-dark-brown/70"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-dark-brown/70"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-${order.discount.toFixed(2)}</span></div>}
            <div className="flex justify-between font-heading text-xl text-dark-brown pt-2 border-t border-dark-brown/10 mt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to="/shop"
              className="flex-1 py-3 bg-dark-brown text-cream text-center text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg"
            >
              Continue Shopping
            </Link>
            <Link
              to="/account"
              className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-center text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg"
            >
              View My Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
