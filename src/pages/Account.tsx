import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUser, HiOutlineHeart, HiOutlineLocationMarker, HiOutlineLogout, HiOutlineClipboardList, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { useAuthStore } from '../store/authStore';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import LoginForm from '../components/account/LoginForm';
import RegisterForm from '../components/account/RegisterForm';
import ForgotPassword from '../components/account/ForgotPassword';
import { useOrderStore } from '../store/orderStore';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses';

export default function Account() {
  const { isAuthenticated, user, logout, wishlist, savedAddress, updateProfile, saveAddress: persistAddress } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddr, setEditingAddr] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [addressForm, setAddressForm] = useState({
    fullName: savedAddress?.fullName || user?.name || '',
    phone: savedAddress?.phone || user?.phone || '',
    address: savedAddress?.address || '',
    apartment: savedAddress?.apartment || '',
    city: savedAddress?.city || '',
    state: savedAddress?.state || '',
    zip: savedAddress?.zip || '',
    country: savedAddress?.country || 'United States',
  });

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (!isAuthenticated) {
    return (
      <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen">
        <div className="max-w-md mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-dark-brown/5 flex items-center justify-center mx-auto">
                <HiOutlineUser size={28} className="text-dark-brown/60" />
              </div>
              <h1 className="font-heading text-3xl text-dark-brown mt-4">
                {authView === 'login' ? 'Welcome Back' : authView === 'register' ? 'Create Account' : 'Reset Password'}
              </h1>
            </div>

            <AnimatePresence mode="wait">
              {authView === 'login' && (
                <LoginForm
                  key="login"
                  onRegister={() => setAuthView('register')}
                  onForgot={() => setAuthView('forgot')}
                />
              )}
              {authView === 'register' && (
                <RegisterForm
                  key="register"
                  onLogin={() => setAuthView('login')}
                  onSuccess={() => setAuthView('login')}
                />
              )}
              {authView === 'forgot' && (
                <ForgotPassword
                  key="forgot"
                  onBack={() => setAuthView('login')}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: 'Profile', icon: <HiOutlineUser size={18} /> },
    { key: 'orders', label: 'My Orders', icon: <HiOutlineClipboardList size={18} /> },
    { key: 'wishlist', label: 'Wishlist', icon: <HiOutlineHeart size={18} /> },
    { key: 'addresses', label: 'Addresses', icon: <HiOutlineLocationMarker size={18} /> },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="font-heading text-4xl text-dark-brown">My Account</h1>
          <p className="text-dark-brown/50 text-sm mt-2">Welcome back, {user?.name}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-28">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      activeTab === tab.key
                        ? 'bg-dark-brown text-cream'
                        : 'text-dark-brown/60 hover:bg-dark-brown/5'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-50 transition-all"
                >
                  <HiOutlineLogout size={18} />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm"
                >
                  <h2 className="font-heading text-2xl text-dark-brown mb-6">Profile Settings</h2>
                  <div className="space-y-4 max-w-md">
                    <div className="flex items-center gap-4 p-4 bg-warm-beige rounded-xl">
                      <HiOutlineUser size={20} className="text-dark-brown/40 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-dark-brown/50 uppercase tracking-wider">Full Name</p>
                        {editingProfile ? (
                          <input
                            type="text" value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full bg-transparent border-b border-dark-brown/20 text-dark-brown outline-none py-0.5"
                          />
                        ) : (
                          <p className="text-dark-brown">{user?.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-warm-beige rounded-xl">
                      <HiOutlineMail size={20} className="text-dark-brown/40 shrink-0" />
                      <div>
                        <p className="text-xs text-dark-brown/50 uppercase tracking-wider">Email</p>
                        <p className="text-dark-brown">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-warm-beige rounded-xl">
                      <HiOutlinePhone size={20} className="text-dark-brown/40 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-dark-brown/50 uppercase tracking-wider">Phone</p>
                        {editingProfile ? (
                          <input
                            type="tel" value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full bg-transparent border-b border-dark-brown/20 text-dark-brown outline-none py-0.5"
                          />
                        ) : (
                          <p className="text-dark-brown">{user?.phone || 'Not set'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {editingProfile ? (
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => { setEditingProfile(false); setProfileForm({ name: user?.name || '', phone: user?.phone || '' }); }} className="px-6 py-2 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase rounded-lg hover:border-dark-brown hover:text-dark-brown transition-all">
                        Cancel
                      </button>
                      <button onClick={() => { updateProfile(profileForm); setEditingProfile(false); }} className="px-6 py-2 bg-dark-brown text-cream text-sm tracking-wider uppercase rounded-lg hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all">
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => { setEditingProfile(true); setProfileForm({ name: user?.name || '', phone: user?.phone || '' }); }} className="mt-6 px-6 py-2 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase rounded-lg hover:border-dark-brown hover:text-dark-brown transition-all">
                      Edit Profile
                    </button>
                  )}
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="font-heading text-2xl text-dark-brown mb-6">My Orders</h2>
                  {orders.length === 0 ? (
                    <p className="text-dark-brown/50">No orders yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-heading text-dark-brown">{order.id}</p>
                              <p className="text-xs text-dark-brown/50 mt-1">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} · {order.items.reduce((sum, i) => sum + i.quantity, 0)} {order.items.reduce((sum, i) => sum + i.quantity, 0) === 1 ? 'item' : 'items'}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-heading text-lg text-dark-brown">${order.total.toFixed(2)}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-champagne-gold/20 text-champagne-gold'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="font-heading text-2xl text-dark-brown mb-6">My Wishlist ({wishlistProducts.length})</h2>
                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl">
                      <HiOutlineHeart size={40} className="mx-auto text-dark-brown/20" />
                      <p className="text-dark-brown/50 mt-4">Your wishlist is empty.</p>
                      <Link to="/shop" className="inline-block mt-4 px-6 py-2 bg-dark-brown text-cream text-sm tracking-wider uppercase rounded-lg hover:bg-champagne-gold active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all">
                        Browse Fragrances
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistProducts.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-2xl p-4 shadow-sm group">
                          <div className="aspect-square rounded-xl overflow-hidden bg-warm-beige mb-3">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <h3 className="font-heading text-dark-brown group-hover:text-champagne-gold transition-colors">{product.name}</h3>
                          <p className="font-heading text-dark-brown mt-1">${product.price}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="font-heading text-2xl text-dark-brown mb-6">Saved Addresses</h2>
                  {editingAddr ? (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Full Name</label>
                          <input type="text" value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Phone</label>
                          <input type="tel" value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Street Address</label>
                          <input type="text" value={addressForm.address} onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Apartment (optional)</label>
                          <input type="text" value={addressForm.apartment} onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">City</label>
                          <input type="text" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">State</label>
                          <input type="text" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Postal Code</label>
                          <input type="text" value={addressForm.zip} onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider uppercase text-dark-brown/50 mb-2">Country</label>
                          <input type="text" value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })} className="w-full px-4 py-3 border border-dark-brown/10 rounded-lg text-sm outline-none focus:border-champagne-gold transition-colors" />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => { setEditingAddr(false); }} className="flex-1 py-3 border border-dark-brown/20 text-dark-brown/60 text-sm tracking-wider uppercase rounded-lg hover:border-dark-brown hover:text-dark-brown transition-all">
                          Cancel
                        </button>
                        <button onClick={() => { persistAddress(addressForm); setEditingAddr(false); }} className="flex-1 py-3 bg-dark-brown text-cream text-sm tracking-widest uppercase font-medium hover:bg-champagne-gold hover:text-deep-coffee active:bg-dark-brown/90 focus:outline-none focus:ring-2 focus:ring-dark-brown/20 transition-all duration-300 rounded-lg">
                          Save Address
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {savedAddress ? (
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-heading text-dark-brown">{savedAddress.fullName}</p>
                              <p className="text-sm text-dark-brown/60 mt-1">{savedAddress.address}{savedAddress.apartment ? `, ${savedAddress.apartment}` : ''}<br />{savedAddress.city}, {savedAddress.state} {savedAddress.zip}<br />{savedAddress.country}</p>
                              <p className="text-sm text-dark-brown/40 mt-2">{savedAddress.phone}</p>
                            </div>
                            <button onClick={() => { setAddressForm({ ...savedAddress }); setEditingAddr(true); }} className="text-xs text-dark-brown/50 hover:text-champagne-gold transition-colors">Edit</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-dark-brown/50 bg-white rounded-2xl p-6 shadow-sm">No saved address yet.</p>
                      )}
                      <button onClick={() => setEditingAddr(true)} className="mt-4 px-6 py-3 border border-dashed border-dark-brown/20 rounded-2xl text-sm text-dark-brown/50 hover:border-dark-brown hover:text-dark-brown transition-all w-full">
                        + Add New Address
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
