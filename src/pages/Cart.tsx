import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowLeft, HiOutlineShoppingBag, HiX } from 'react-icons/hi';
import { useCartStore } from '../store/cartStore';
import { useCouponStore } from '../store/couponStore';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { appliedCode, activeCoupon, applyCoupon, removeCoupon, calculateDiscount } = useCouponStore();
  const [couponInput, setCouponInput] = useState('');

  const discount = calculateDiscount(totalPrice());
  const shipping = totalPrice() > 300 ? 0 : 15;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) { toast.error('Please enter a coupon code.'); return; }
    const result = applyCoupon(couponInput);
    if (result.success) {
      toast.success(result.message);
      setCouponInput('');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="pt-20 lg:pt-28 pb-20 lg:pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-10"
        >
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-dark-brown">Shopping Bag</h1>
          <p className="text-dark-brown/50 mt-2 text-sm">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-espresso/[0.03] flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingBag size={24} className="text-espresso/15" />
            </div>
            <p className="text-espresso/40 text-sm font-light">Your shopping bag is empty</p>
            <p className="text-espresso/20 text-xs font-light mt-2">Discover fragrances that speak to you.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 sm:py-3 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm">
              <HiOutlineArrowLeft size={14} />
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm"
                >
                  <Link to={`/product/${item.product.id}`} className="w-20 h-24 sm:w-24 sm:h-28 lg:w-28 lg:h-32 shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} loading="lazy" className="w-full h-full object-cover rounded-lg sm:rounded-xl" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-heading text-base sm:text-lg text-dark-brown hover:text-champagne-gold transition-colors">{item.product.name}</h3>
                      </Link>
                      <button onClick={() => removeItem(item.product.id)} aria-label="Remove item" className="text-dark-brown/30 hover:text-red-500 transition-colors shrink-0 touch-target flex items-center justify-center">
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-dark-brown/50 mt-1">{item.product.shortDescription}</p>
                    <p className="font-heading text-lg sm:text-xl text-dark-brown mt-2 sm:mt-3">${item.product.price}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-dark-brown/20 rounded-lg">
                        <button onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity" className="touch-target px-4 py-2 sm:px-3 sm:py-2 flex items-center justify-center hover:bg-dark-brown/5 transition-colors">
                          <HiOutlineMinus size={14} />
                        </button>
                        <span className="px-4 py-2 sm:px-3 sm:py-2 text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity" className="touch-target px-4 py-2 sm:px-3 sm:py-2 flex items-center justify-center hover:bg-dark-brown/5 transition-colors">
                          <HiOutlinePlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-28">
                <h2 className="font-heading text-lg sm:text-xl text-dark-brown mb-5 sm:mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-dark-brown/70">
                    <span>Subtotal</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  {discount > 0 && activeCoupon && (
                    <div className="flex justify-between text-emerald-600">
                      <span className="flex items-center gap-1.5">
                        Discount ({activeCoupon.code})
                        <button onClick={() => { removeCoupon(); toast.success('Coupon removed'); }} aria-label="Remove coupon" className="text-emerald-400 hover:text-emerald-600 transition-colors">
                          <HiX size={14} />
                        </button>
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-dark-brown/70">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-dark-brown/10 pt-4 flex justify-between font-heading text-lg text-dark-brown">
                    <span>Total</span>
                    <span>${(totalPrice() - discount + shipping).toFixed(2)}</span>
                  </div>
                </div>

                  <div className="mt-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-3 sm:py-2 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold placeholder-dark-brown/30 font-light"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-5 sm:px-4 py-3 sm:py-2 bg-dark-brown text-cream text-xs tracking-wider uppercase rounded-lg hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all touch-target"
                    >
                      Apply
                    </button>
                  </div>
                  {!appliedCode && (
                    <p className="text-[9px] text-dark-brown/30 mt-2 font-light">Try: WELCOME10, SMARS20, VIP50</p>
                  )}
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-3.5 sm:py-3 mt-5 sm:mt-6 bg-dark-brown text-cream text-center text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg"
                >
                  Checkout
                </Link>
                <Link to="/shop" className="block text-center text-sm text-dark-brown/50 hover:text-champagne-gold mt-3 sm:mt-4 transition-colors py-2">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
