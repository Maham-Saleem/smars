import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';

export default function CartSidebar() {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

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
              <button onClick={closeCart} className="text-dark-brown/50 hover:text-dark-brown transition-colors">
                <HiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-dark-brown/50">Your bag is empty</p>
                  <Link to="/shop" onClick={closeCart} className="inline-block mt-4 px-6 py-2 bg-dark-brown text-cream text-sm tracking-widest uppercase hover:bg-champagne-gold transition-colors">
                    Shop Now
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-dark-brown/10">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-heading text-dark-brown">{item.product.name}</h3>
                        <button onClick={() => removeItem(item.product.id)} className="text-dark-brown/30 hover:text-red-500 transition-colors">
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-dark-brown/50 mt-1">{item.product.shortDescription}</p>
                      <p className="font-body text-sm text-dark-brown mt-2">${item.product.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 border border-dark-brown/20 rounded flex items-center justify-center hover:border-dark-brown transition-colors"
                        >
                          <HiOutlineMinus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
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
                  className="block w-full py-3 bg-dark-brown text-cream text-center text-sm tracking-widest uppercase hover:bg-champagne-gold transition-colors"
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
