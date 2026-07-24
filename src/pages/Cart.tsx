import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowLeft } from 'react-icons/hi';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const discount = couponApplied ? totalPrice() * 0.1 : 0;
  const shipping = totalPrice() > 300 ? 0 : 15;

  return (
    <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="font-heading text-4xl lg:text-5xl text-dark-brown">Shopping Bag</h1>
          <p className="text-dark-brown/50 mt-2 text-sm">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </motion.div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-brown/50 text-lg">Your shopping bag is empty</p>
            <Link to="/shop" className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-dark-brown text-cream text-sm tracking-wider uppercase hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all">
              <HiOutlineArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm"
                >
                  <Link to={`/product/${item.product.id}`} className="w-24 h-28 lg:w-28 lg:h-32 shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-heading text-lg text-dark-brown hover:text-champagne-gold transition-colors">{item.product.name}</h3>
                      </Link>
                      <button onClick={() => removeItem(item.product.id)} className="text-dark-brown/30 hover:text-red-500 transition-colors shrink-0">
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-dark-brown/50 mt-1">{item.product.shortDescription}</p>
                    <p className="font-heading text-xl text-dark-brown mt-3">${item.product.price}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-dark-brown/20 rounded-lg">
                        <button onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-2 hover:bg-dark-brown/5 transition-colors">
                          <HiOutlineMinus size={14} />
                        </button>
                        <span className="px-3 py-2 text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-2 hover:bg-dark-brown/5 transition-colors">
                          <HiOutlinePlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                <h2 className="font-heading text-xl text-dark-brown mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-dark-brown/70">
                    <span>Subtotal</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
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
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-2 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold placeholder-dark-brown/30"
                    />
                    <button
                      onClick={() => { if (coupon) setCouponApplied(true); }}
                      className="px-4 py-2 bg-dark-brown text-cream text-xs tracking-wider uppercase rounded-lg hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-3 mt-6 bg-dark-brown text-cream text-center text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg"
                >
                  Checkout
                </Link>
                <Link to="/shop" className="block text-center text-sm text-dark-brown/50 hover:text-champagne-gold mt-4 transition-colors">
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
