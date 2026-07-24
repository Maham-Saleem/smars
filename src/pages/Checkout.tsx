import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheck, HiOutlineCreditCard, HiOutlineCash, HiOutlineGlobe, HiOutlineTruck, HiOutlineCube, HiOutlineLocationMarker } from 'react-icons/hi';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore, generateOrderId, estimateDeliveryDate } from '../store/orderStore';
import { useUIStore } from '../store/uiStore';
import toast from 'react-hot-toast';

const steps = ['Shipping', 'Delivery', 'Payment', 'Review'];

const deliveryMethods = [
  { id: 'standard', name: 'Standard Delivery', description: '5–8 business days', cost: 10, icon: HiOutlineTruck },
  { id: 'express', name: 'Express Delivery', description: '2–3 business days', cost: 25, icon: HiOutlineCube },
  { id: 'pickup', name: 'Store Pickup', description: 'Free · Beverly Hills atelier', cost: 0, icon: HiOutlineLocationMarker },
];

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', icon: HiOutlineCash },
  { id: 'card', name: 'Credit / Debit Card', icon: HiOutlineCreditCard },
  { id: 'jazzcash', name: 'JazzCash', icon: HiOutlineGlobe },
  { id: 'easypaisa', name: 'EasyPaisa', icon: HiOutlineGlobe },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user, savedAddress, saveAddress: persistAddress } = useAuthStore();
  const { openAuth } = useUIStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [editingAddress, setEditingAddress] = useState(!savedAddress);
  const [shipping, setShipping] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: savedAddress?.address || '',
    apartment: savedAddress?.apartment || '',
    city: savedAddress?.city || '',
    state: savedAddress?.state || '',
    zip: savedAddress?.zip || '',
    country: savedAddress?.country || 'United States',
    saveAddress: false,
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [jazzcashPhone, setJazzcashPhone] = useState('');
  const [easypaisaPhone, setEasypaisaPhone] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-dark-brown/5 flex items-center justify-center mx-auto mb-6">
            <HiOutlineLocationMarker size={28} className="text-dark-brown/60" />
          </div>
          <h1 className="font-heading text-3xl text-dark-brown mb-4">Authentication Required</h1>
          <p className="text-dark-brown/60 mb-8 text-sm">Please sign in to your account to proceed with checkout.</p>
          <button onClick={openAuth} className="px-8 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step < 4) {
    return (
      <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-dark-brown/50 text-lg">Your cart is empty</p>
          <button onClick={() => navigate('/shop')} className="mt-4 px-8 py-3 bg-dark-brown text-cream text-sm tracking-wider uppercase hover:bg-champagne-gold active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const selectedDelivery = deliveryMethods.find((d) => d.id === deliveryMethod)!;
  const selectedPayment = paymentMethods.find((m) => m.id === paymentMethod)!;
  const discount = totalPrice() * 0.1;
  const shippingCost = deliveryMethod === 'pickup' ? 0 : selectedDelivery.cost;
  const finalTotal = totalPrice() - discount + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shipping.saveAddress) {
      persistAddress({
        fullName: shipping.fullName,
        phone: shipping.phone,
        address: shipping.address,
        apartment: shipping.apartment,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        country: shipping.country,
      });
    }
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    if (submitting) return;
    if (!acceptedTerms) {
      toast.error('Please accept the terms & conditions.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = generateOrderId();
    addOrder({
      id: orderId,
      items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
      subtotal: totalPrice(),
      shipping: shippingCost,
      discount,
      total: finalTotal,
      deliveryMethod: selectedDelivery.name,
      paymentMethod: selectedPayment.name,
      shippingDetails: { ...shipping },
      status: 'Confirmed',
      date: new Date().toISOString(),
      estimatedDelivery: estimateDeliveryDate(),
    });
    clearCart();
    setSubmitting(false);
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl lg:text-5xl text-dark-brown">Checkout</h1>

          <div className="flex items-center gap-2 mt-8 mb-10 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 shrink-0">
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
              {savedAddress && !editingAddress ? (
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                  <h2 className="font-heading text-2xl text-dark-brown mb-6">Shipping Details</h2>
                  <div className="p-4 bg-warm-beige rounded-xl">
                    <p className="font-heading text-dark-brown">{savedAddress.fullName}</p>
                    <p className="text-sm text-dark-brown/70 mt-1">{savedAddress.address}{savedAddress.apartment ? `, ${savedAddress.apartment}` : ''}</p>
                    <p className="text-sm text-dark-brown/70">{savedAddress.city}, {savedAddress.state} {savedAddress.zip}</p>
                    <p className="text-sm text-dark-brown/70">{savedAddress.country}</p>
                    <p className="text-sm text-dark-brown/70 mt-2">{savedAddress.phone}</p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setEditingAddress(true)} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg">
                      Change Address
                    </button>
                    <button type="button" onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
                      Continue to Delivery
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                  <h2 className="font-heading text-2xl text-dark-brown mb-6">Shipping Details</h2>
                  {savedAddress && (
                    <p className="text-xs text-dark-brown/50 mb-4">Update your saved address below, or <button type="button" onClick={() => setEditingAddress(false)} className="text-champagne-gold underline">use current</button>.</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Full Name</label>
                      <input
                        type="text" required value={shipping.fullName}
                        onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Phone</label>
                      <input
                        type="tel" required value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Email</label>
                      <input
                        type="email" required value={shipping.email}
                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Street Address</label>
                    <input
                      type="text" required value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Apartment (optional)</label>
                    <input
                      type="text" value={shipping.apartment}
                      onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
                      className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">City</label>
                      <input
                        type="text" required value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">State</label>
                      <input
                        type="text" required value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Postal Code</label>
                      <input
                        type="text" required value={shipping.zip}
                        onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox" checked={shipping.saveAddress}
                        onChange={(e) => setShipping({ ...shipping, saveAddress: e.target.checked })}
                        className="w-4 h-4 accent-dark-brown"
                      />
                      <span className="text-sm text-dark-brown/60">Save this address for future orders</span>
                    </label>
                  </div>

                  <button type="submit" className="mt-8 w-full py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
                    Continue to Delivery
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-dark-brown mb-6">Delivery Method</h2>
                <div className="space-y-3">
                  {deliveryMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setDeliveryMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        deliveryMethod === method.id ? 'border-dark-brown bg-dark-brown/5' : 'border-dark-brown/10 hover:border-dark-brown/30'
                      }`}
                    >
                      <method.icon size={24} className={deliveryMethod === method.id ? 'text-dark-brown' : 'text-dark-brown/40'} />
                      <div className="text-left flex-1">
                        <p className={`font-medium ${deliveryMethod === method.id ? 'text-dark-brown' : 'text-dark-brown/60'}`}>{method.name}</p>
                        <p className={`text-xs mt-0.5 ${deliveryMethod === method.id ? 'text-dark-brown/50' : 'text-dark-brown/40'}`}>{method.description}</p>
                      </div>
                      <span className={`text-sm font-medium ${deliveryMethod === method.id ? 'text-dark-brown' : 'text-dark-brown/40'}`}>
                        {method.cost === 0 ? 'Free' : `$${method.cost}`}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg">
                    Back
                  </button>
                  <button onClick={() => { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
                    Continue to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-dark-brown mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
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

                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-4 border-t border-dark-brown/10 pt-6"
                  >
                    <h3 className="text-xs tracking-wider uppercase text-dark-brown/50 font-medium">Card Details</h3>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Card Number</label>
                      <input
                        type="text" required value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Name on Card</label>
                      <input
                        type="text" required value={cardDetails.cardName}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Expiry</label>
                        <input
                          type="text" required value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">CVV</label>
                        <input
                          type="text" required value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'jazzcash' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-4 border-t border-dark-brown/10 pt-6"
                  >
                    <h3 className="text-xs tracking-wider uppercase text-dark-brown/50 font-medium">JazzCash Details</h3>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">JazzCash Phone Number</label>
                      <input
                        type="tel" required value={jazzcashPhone}
                        onChange={(e) => setJazzcashPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'easypaisa' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-4 border-t border-dark-brown/10 pt-6"
                  >
                    <h3 className="text-xs tracking-wider uppercase text-dark-brown/50 font-medium">EasyPaisa Details</h3>
                    <div>
                      <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">EasyPaisa Phone Number</label>
                      <input
                        type="tel" required value={easypaisaPhone}
                        onChange={(e) => setEasypaisaPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'cod' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 border-t border-dark-brown/10 pt-6"
                  >
                    <p className="text-sm text-dark-brown/60">Pay with cash upon delivery. No additional fees.</p>
                  </motion.div>
                )}

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg">
                    Back
                  </button>
                  <button onClick={() => { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
                    Review Order
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-dark-brown mb-6">Review Your Order</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-dark-brown/10">
                      <img src={item.product.images[0]} alt={item.product.name} loading="lazy" className="w-16 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-heading text-dark-brown">{item.product.name}</h3>
                        <p className="text-sm text-dark-brown/50">Qty: {item.quantity}</p>
                        <p className="font-heading text-dark-brown mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-warm-beige rounded-xl">
                    <h3 className="font-heading text-dark-brown text-sm mb-2">Shipping to</h3>
                    <p className="text-sm text-dark-brown/70">{shipping.fullName}</p>
                    <p className="text-sm text-dark-brown/70">{shipping.address}{shipping.apartment ? `, ${shipping.apartment}` : ''}</p>
                    <p className="text-sm text-dark-brown/70">{shipping.city}, {shipping.state} {shipping.zip}</p>
                    <p className="text-sm text-dark-brown/70">{shipping.phone} · {shipping.email}</p>
                  </div>
                  <div className="p-4 bg-warm-beige rounded-xl">
                    <h3 className="font-heading text-dark-brown text-sm mb-2">Delivery</h3>
                    <p className="text-sm text-dark-brown/70">{selectedDelivery.name}</p>
                    <p className="text-sm text-dark-brown/50">{selectedDelivery.description}</p>
                    <h3 className="font-heading text-dark-brown text-sm mt-4 mb-1">Payment</h3>
                    <p className="text-sm text-dark-brown/70">{selectedPayment.name}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-sm border-t border-dark-brown/10 pt-6">
                  <div className="flex justify-between text-dark-brown/70"><span>Subtotal</span><span>${totalPrice().toFixed(2)}</span></div>
                  <div className="flex justify-between text-dark-brown/70"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-dark-brown/70"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
                  <div className="flex justify-between font-heading text-xl text-dark-brown pt-2 border-t border-dark-brown/10 mt-2">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox" checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 accent-dark-brown mt-0.5"
                  />
                  <span className="text-sm text-dark-brown/60">
                    I agree to the <span className="text-champagne-gold hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-champagne-gold hover:underline cursor-pointer">Privacy Policy</span>.
                  </span>
                </label>

                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase hover:border-dark-brown hover:text-dark-brown transition-all rounded-lg">
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Processing...
                      </>
                    ) : 'Place Order'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
