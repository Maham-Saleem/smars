import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineClock } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { useRecentStore } from '../../store/recentStore';

export default function CartSidebar() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { getRecentProducts } = useRecentStore();
  const recentProducts = getRecentProducts();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[70]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-[80] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-dark-brown/10">
              <h2 className="font-heading text-xl text-dark-brown">Shopping Bag ({items.length})</h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-dark-brown/50 hover:text-dark-brown transition-colors">
                <HiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-dark-brown/50 text-sm">Your bag is empty</p>
                  <Link to="/shop" onClick={closeCart} className="inline-block mt-3 px-5 py-2 bg-dark-brown text-cream text-[10px] tracking-widest uppercase hover:bg-champagne-gold active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-colors rounded">
                    Shop Now
                  </Link>
                  {recentProducts.length > 0 && (
                    <div className="mt-8 text-left">
                      <div className="flex items-center gap-1.5 mb-3 px-1">
                        <HiOutlineClock size={12} className="text-dark-brown/30" />
                        <p className="text-dark-brown/40 text-[10px] tracking-widest uppercase">Recently Viewed</p>
                      </div>
                      <div className="space-y-2">
                        {recentProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            onClick={closeCart}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-brown/5 transition-colors group"
                          >
                            <img src={p.images[0]} alt={p.name} loading="lazy" className="w-12 h-16 object-cover rounded shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-dark-brown text-xs font-heading truncate group-hover:text-champagne-gold transition-colors">{p.name}</p>
                              <p className="text-dark-brown/40 text-[10px]">${p.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-dark-brown/10">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      loading="lazy"
                      className="w-20 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-heading text-dark-brown">{item.product.name}</h3>
                        <button onClick={() => removeItem(item.product.id)} aria-label="Remove item" className="text-dark-brown/30 hover:text-red-500 transition-colors">
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-dark-brown/50 mt-1">{item.product.shortDescription}</p>
                      <p className="font-body text-sm text-dark-brown mt-2">${item.product.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 border border-dark-brown/20 rounded flex items-center justify-center hover:border-dark-brown transition-colors"
                        >
                          <HiOutlineMinus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 border border-dark-brown/20 rounded flex items-center justify-center hover:border-dark-brown transition-colors"
                        >
                          <HiOutlinePlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-dark-brown/10 p-6 space-y-4">
                <div className="flex justify-between text-dark-brown">
                  <span>Subtotal</span>
                  <span className="font-heading text-lg">${totalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-dark-brown/50">Shipping calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3 bg-dark-brown text-cream text-center text-sm tracking-widest uppercase hover:bg-champagne-gold active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="block w-full py-3 border border-dark-brown text-dark-brown text-center text-sm tracking-widest uppercase hover:bg-dark-brown hover:text-cream transition-colors"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
