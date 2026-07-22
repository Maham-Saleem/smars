import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheck, HiOutlineCreditCard, HiOutlineCash, HiOutlineGlobe } from 'react-icons/hi';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const steps = ['Shipping', 'Payment', 'Review', 'Confirmation'];

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', icon: HiOutlineCash },
  { id: 'card', name: 'Credit / Debit Card', icon: HiOutlineCreditCard },
  { id: 'jazzcash', name: 'JazzCash', icon: HiOutlineGlobe },
  { id: 'easypaisa', name: 'EasyPaisa', icon: HiOutlineGlobe },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  if (!isAuthenticated && step > 0) {
    return (
      <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="font-heading text-3xl text-dark-brown mb-4">Authentication Required</h1>
          <p className="text-dark-brown/60 mb-8">Please sign in to continue with your checkout.</p>
          <a href="/account" className="inline-block px-8 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee transition-all rounded-lg">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step < 3) {
    return (
      <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-dark-brown/50 text-lg">Your cart is empty</p>
          <button onClick={() => navigate('/shop')} className="mt-4 px-8 py-3 bg-dark-brown text-cream text-sm tracking-wider uppercase hover:bg-champagne-gold transition-all">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setStep(3);
    clearCart();
    toast.success('Order placed successfully!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const discount = totalPrice() * 0.1;
  const shippingCost = totalPrice() > 300 ? 0 : 15;

  return (
    <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl lg:text-5xl text-dark-brown">Checkout</h1>

          <div className="flex items-center gap-2 mt-8 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i <= step ? 'bg-dark-brown text-cream' : 'bg-dark-brown/10 text-dark-brown/40'
                }`}>
                  {i < step ? <HiOutlineCheck size={16} /> : i + 1}
                </div>
                <span className={`text-xs tracking-wider uppercase hidden sm:block ${i <= step ? 'text-dark-brown' : 'text-dark-brown/30'}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-8 h-[1px] ${i < step ? 'bg-dark-brown' : 'bg-dark-brown/10'}`} />}
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-dark-brown mb-6">Shipping Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', key: 'firstName', type: 'text' },
                    { label: 'Last Name', key: 'lastName', type: 'text' },
                    { label: 'Email', key: 'email', type: 'email' },
                    { label: 'Phone', key: 'phone', type: 'tel' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        value={(shipping as any)[field.key]}
                        onChange={(e) => setShipping({ ...shipping, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Address</label>
                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {[
                    { label: 'City', key: 'city' },
                    { label: 'State', key: 'state' },
                    { label: 'ZIP Code', key: 'zip' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">{field.label}</label>
                      <input
                        type="text"
                        required
                        value={(shipping as any)[field.key]}
                        onChange={(e) => setShipping({ ...shipping, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="mt-8 w-full py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee transition-all duration-300 rounded-lg">
                  Continue to Payment
                </button>
              </form>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-dark-brown mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id ? 'border-dark-brown bg-dark-brown/5' : 'border-dark-brown/10 hover:border-dark-brown/30'
                      }`}
                    >
                      <method.icon size={24} className={paymentMethod === method.id ? 'text-dark-brown' : 'text-dark-brown/40'} />
                      <span className={`font-medium ${paymentMethod === method.id ? 'text-dark-brown' : 'text-dark-brown/60'}`}>
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg">
                    Back
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee transition-all duration-300 rounded-lg">
                    Review Order
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-dark-brown mb-6">Review Your Order</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-dark-brown/10">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-heading text-dark-brown">{item.product.name}</h3>
                        <p className="text-sm text-dark-brown/50">Qty: {item.quantity}</p>
                        <p className="font-heading text-dark-brown mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-warm-beige rounded-xl">
                  <h3 className="font-heading text-dark-brown mb-2">Shipping to</h3>
                  <p className="text-sm text-dark-brown/70">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-sm text-dark-brown/70">{shipping.address}</p>
                  <p className="text-sm text-dark-brown/70">{shipping.city}, {shipping.state} {shipping.zip}</p>
                </div>

                <div className="mt-4 p-4 bg-warm-beige rounded-xl">
                  <h3 className="font-heading text-dark-brown mb-2">Payment</h3>
                  <p className="text-sm text-dark-brown/70">{paymentMethods.find((m) => m.id === paymentMethod)?.name}</p>
                </div>

                <div className="mt-6 space-y-2 text-sm border-t border-dark-brown/10 pt-6">
                  <div className="flex justify-between text-dark-brown/70"><span>Subtotal</span><span>${totalPrice().toFixed(2)}</span></div>
                  <div className="flex justify-between text-dark-brown/70"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-dark-brown/70"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
                  <div className="flex justify-between font-heading text-xl text-dark-brown pt-2 border-t border-dark-brown/10 mt-2">
                    <span>Total</span>
                    <span>${(totalPrice() - discount + shippingCost).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee transition-all duration-300 rounded-lg">
                    Place Order
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <HiOutlineCheck size={36} className="text-green-600" />
                </div>
                <h2 className="font-heading text-3xl text-dark-brown mt-6 mb-3">Order Confirmed!</h2>
                <p className="text-dark-brown/60">Thank you for your order. You'll receive a confirmation email shortly.</p>
                <p className="text-dark-brown/50 text-sm mt-4">Order #SMARS-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                <button onClick={() => navigate('/')} className="mt-8 px-8 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase hover:bg-champagne-gold hover:text-deep-coffee transition-all rounded-lg">
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
