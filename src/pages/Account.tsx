import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineUser, HiOutlineHeart, HiOutlineLocationMarker, HiOutlineLogout,
  HiOutlineClipboardList, HiOutlineShieldCheck, HiOutlineAdjustments,
  HiOutlineMail, HiOutlinePencil, HiOutlineTrash,
  HiOutlinePlus, HiOutlineStar, HiOutlineShoppingBag, HiOutlineEye,
  HiOutlineChevronRight, HiOutlineClock, HiOutlineLockClosed, HiOutlineGlobe,
  HiOutlineBell,   HiOutlineCalendar, HiOutlineCheck, HiOutlineRefresh,
} from 'react-icons/hi';
import { useAuthStore } from '../store/authStore';
import { products } from '../data/products';
import { Link, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/account/LoginForm';
import RegisterForm from '../components/account/RegisterForm';
import ForgotPassword from '../components/account/ForgotPassword';
import { useOrderStore } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

type Tab = 'profile' | 'addresses' | 'orders' | 'wishlist' | 'security' | 'notifications' | 'preferences';

const sectionMeta: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'profile', label: 'Profile', icon: <HiOutlineUser size={14} /> },
  { key: 'addresses', label: 'Addresses', icon: <HiOutlineLocationMarker size={14} /> },
  { key: 'orders', label: 'Orders', icon: <HiOutlineClipboardList size={14} /> },
  { key: 'wishlist', label: 'Wishlist', icon: <HiOutlineHeart size={14} /> },
  { key: 'security', label: 'Security', icon: <HiOutlineShieldCheck size={14} /> },
  { key: 'notifications', label: 'Notifications', icon: <HiOutlineBell size={14} /> },
  { key: 'preferences', label: 'Preferences', icon: <HiOutlineAdjustments size={14} /> },
];

export default function Account() {
  const { isAuthenticated, user, logout, wishlist, savedAddress, updateProfile, saveAddress: persistAddress } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);
  const addItem = useCartStore((s) => s.addItem);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'profile');
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddr, setEditingAddr] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [newsletter, setNewsletter] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [preferredFamily, setPreferredFamily] = useState('floral');
  const [twoFA, setTwoFA] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD ($)');
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

  const monogram = user?.name?.charAt(0).toUpperCase() || 'S';

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

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-24 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-beige via-cream to-cream" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne-gold/[0.03] to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-champagne-gold/[0.02] blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-10"
          >
            <div className="relative">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-champagne-gold via-bronze to-champagne-gold/80 flex items-center justify-center shadow-xl shadow-champagne-gold/10 shrink-0">
                <span className="font-heading text-4xl lg:text-5xl text-cream tracking-tight">{monogram}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-cream flex items-center justify-center">
                <HiOutlineCheck size={12} className="text-cream" />
              </div>
            </div>
            <div className="text-center lg:text-left flex-1">
              <p className="text-champagne-gold text-[9px] tracking-[0.35em] uppercase font-body mb-3">Client Lounge</p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-6xl text-espresso leading-[1.05] tracking-tight">
                Welcome back, <br className="hidden sm:hidden lg:block" />
                <span className="text-champagne-gold">{user?.name?.split(' ')[0] || 'Maham'}</span>
                <span className="text-espresso">.</span>
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-4">
                <span className="text-xs text-espresso/45 font-light flex items-center gap-1.5">
                  <HiOutlineMail size={12} className="text-champagne-gold/60" />
                  {user?.email}
                </span>
                <span className="text-espresso/20 hidden sm:inline">·</span>
                <span className="text-xs text-espresso/45 font-light flex items-center gap-1.5">
                  <HiOutlineCalendar size={12} className="text-champagne-gold/60" />
                  Member since July 2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section Navigation ─── */}
      <div className="sticky top-20 lg:top-24 z-30 bg-cream/95 backdrop-blur-xl border-b border-espresso/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 overflow-x-auto scrollbar-none">
          <nav className="flex gap-1.5 py-4 min-w-max">
            {sectionMeta.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-body whitespace-nowrap transition-all duration-500 ${
                  activeTab === s.key
                    ? 'bg-espresso text-cream shadow-lg shadow-espresso/10'
                    : 'text-espresso/40 hover:text-espresso/70 hover:bg-espresso/[0.04]'
                }`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
            <span className="w-[1px] h-6 bg-espresso/8 self-center mx-1" />
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-body text-red-400/50 hover:text-red-500 hover:bg-red-50/50 transition-all duration-500 whitespace-nowrap"
            >
              <HiOutlineLogout size={14} />
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* ─── Section Content ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">Personal Information</h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">Manage your profile details</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-espresso/[0.03] shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14">
                  <div className="lg:col-span-2">
                    <div className="flex flex-col items-center lg:items-start gap-5">
                      <div className="relative group">
                        <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-champagne-gold/15 via-champagne-gold/5 to-bronze/10 flex items-center justify-center border border-champagne-gold/10 group-hover:border-champagne-gold/30 transition-all duration-500">
                          <span className="font-heading text-5xl lg:text-6xl text-champagne-gold/50">{monogram}</span>
                        </div>
                        <button className="absolute inset-0 rounded-full bg-espresso/0 hover:bg-espresso/40 flex items-center justify-center transition-all duration-500 opacity-0 hover:opacity-100 cursor-pointer">
                          <HiOutlinePencil size={18} className="text-cream" />
                        </button>
                      </div>
                      <button className="text-[9px] tracking-[0.3em] uppercase text-champagne-gold hover:text-bronze transition-colors duration-300 font-body flex items-center gap-1.5">
                        <HiOutlineRefresh size={11} />
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-3 space-y-7">
                    <div className="space-y-6">
                      <div className="group">
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Full Name</label>
                        {editingProfile ? (
                          <input
                            type="text" value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            autoComplete="name"
                            className="w-full px-0 pb-2 bg-transparent border-b border-espresso/15 text-espresso text-sm outline-none focus:border-champagne-gold transition-colors font-light"
                          />
                        ) : (
                          <p className="text-espresso text-sm font-light border-b border-transparent group-hover:border-espresso/5 pb-2 transition-colors">{user?.name}</p>
                        )}
                      </div>
                      <div className="group">
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Email Address</label>
                        <p className="text-espresso text-sm font-light border-b border-transparent pb-2">{user?.email}</p>
                      </div>
                      <div className="group">
                        <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Phone Number</label>
                        {editingProfile ? (
                          <input
                            type="tel" value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            autoComplete="tel"
                            className="w-full px-0 pb-2 bg-transparent border-b border-espresso/15 text-espresso text-sm outline-none focus:border-champagne-gold transition-colors font-light"
                          />
                        ) : (
                          <p className="text-espresso text-sm font-light border-b border-transparent group-hover:border-espresso/5 pb-2 transition-colors">{user?.phone || <span className="text-espresso/25 italic">Not set</span>}</p>
                        )}
                      </div>
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-espresso/[0.04] via-espresso/[0.06] to-espresso/[0.01]" />

                    <div className="flex flex-wrap gap-3">
                      {editingProfile ? (
                        <>
                          <button
                            onClick={() => { updateProfile(profileForm); setEditingProfile(false); toast.success('Profile updated'); }}
                            className="px-6 py-2.5 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 flex items-center gap-2 shadow-sm"
                          >
                            <HiOutlineCheck size={13} />
                            Save Changes
                          </button>
                          <button
                            onClick={() => { setEditingProfile(false); setProfileForm({ name: user?.name || '', phone: user?.phone || '' }); }}
                            className="px-6 py-2.5 border border-espresso/10 text-espresso/45 text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:border-espresso/25 hover:text-espresso/70 transition-all duration-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingProfile(true)}
                          className="px-6 py-2.5 bg-espresso/5 text-espresso/60 text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-espresso/10 hover:text-espresso transition-all duration-500 flex items-center gap-2"
                        >
                          <HiOutlinePencil size={13} />
                          Edit Information
                        </button>
                      )}
                      <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="px-6 py-2.5 border border-espresso/8 text-espresso/45 text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:border-espresso/20 hover:text-espresso/70 transition-all duration-500 flex items-center gap-2"
                      >
                        <HiOutlineLockClosed size={13} />
                        Change Password
                      </button>
                    </div>

                    <AnimatePresence>
                      {showPasswordForm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 space-y-5 border-t border-espresso/[0.04]">
                            <div>
                              <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Current Password</label>
                              <input type="password" value={passwordForm.current}
                                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                autoComplete="current-password"
                                className="w-full px-5 py-3 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Enter current password" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">New Password</label>
                                <input type="password" value={passwordForm.newPass}
                                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                                  autoComplete="new-password"
                                  className="w-full px-5 py-3 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Enter new password" />
                              </div>
                              <div>
                                <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Confirm Password</label>
                                <input type="password" value={passwordForm.confirm}
                                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                  autoComplete="new-password"
                                  className="w-full px-5 py-3 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Confirm new password" />
                              </div>
                            </div>
                            <button
                              onClick={() => { toast.success('Password updated successfully'); setShowPasswordForm(false); setPasswordForm({ current: '', newPass: '', confirm: '' }); }}
                              className="px-6 py-2.5 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm"
                            >
                              Update Password
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">Order History</h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">Your fragrance journey</p>
                </div>
              </div>

              {orders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-espresso/[0.03] shadow-sm py-20 px-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-espresso/[0.03] flex items-center justify-center mx-auto">
                    <HiOutlineClipboardList size={28} className="text-espresso/15" />
                  </div>
                  <p className="text-espresso/35 text-sm font-light mt-5">No orders yet — the perfect scent awaits.</p>
                  <Link to="/shop" className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm">
                    Discover Fragrances
                    <HiOutlineChevronRight size={12} />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-5">
                          <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0 group-hover:bg-espresso/[0.06] transition-colors">
                            <HiOutlineShoppingBag size={16} className="text-espresso/30" />
                          </div>
                          <div>
                            <p className="font-heading text-espresso text-sm tracking-tight">{order.id}</p>
                            <p className="text-xs text-espresso/35 mt-1.5 font-light flex items-center gap-2">
                              <HiOutlineClock size={11} className="text-espresso/20" />
                              {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              <span className="text-espresso/15">·</span>
                              {order.items.reduce((sum, i) => sum + i.quantity, 0)} {order.items.reduce((sum, i) => sum + i.quantity, 0) === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-5 sm:text-right">
                          <div>
                            <p className="font-heading text-xl text-espresso tracking-tight">${order.total.toFixed(2)}</p>
                            <span className={`inline-block mt-1.5 text-[9px] px-3 py-1 rounded-full tracking-[0.2em] uppercase font-body ${
                              order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-champagne-gold/10 text-champagne-gold'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-espresso/5 flex items-center justify-center group-hover:border-espresso/15 group-hover:bg-espresso/[0.02] transition-all duration-500">
                            <HiOutlineChevronRight size={14} className="text-espresso/20 group-hover:text-espresso/40 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileHover={{ height: 'auto', opacity: 1 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-5 border-t border-espresso/[0.04]">
                          <div className="flex flex-wrap gap-3">
                            {order.items.slice(0, 3).map((item) => (
                              <div key={item.product.id} className="flex items-center gap-3 bg-espresso/[0.02] rounded-xl px-4 py-2">
                                <div className="w-8 h-8 rounded-lg bg-espresso/[0.04] overflow-hidden">
                                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <span className="text-xs text-espresso/60 font-light">{item.product.name} <span className="text-espresso/30">×{item.quantity}</span></span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="flex items-center px-4 py-2 text-xs text-espresso/30 font-light">+{order.items.length - 3} more</div>
                            )}
                          </div>
                          <div className="flex gap-3 mt-4">
                            <button className="text-[9px] tracking-[0.2em] uppercase text-espresso/35 hover:text-espresso transition-colors font-body">View Details</button>
                            <span className="text-espresso/10">|</span>
                            <button className="text-[9px] tracking-[0.2em] uppercase text-espresso/35 hover:text-espresso transition-colors font-body">Reorder</button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">
                    Your Wishlist
                  </h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">{wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'fragrance' : 'fragrances'}</p>
                </div>
              </div>

              {wishlistProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-espresso/[0.03] shadow-sm py-20 px-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-espresso/[0.03] flex items-center justify-center mx-auto">
                    <HiOutlineHeart size={28} className="text-espresso/15" />
                  </div>
                  <p className="text-espresso/35 text-sm font-light mt-5">Your wishlist is waiting to be filled.</p>
                  <Link to="/shop" className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm">
                    Browse Fragrances
                    <HiOutlineChevronRight size={12} />
                  </Link>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlistProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                    >
                      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-warm-beige">
                        <img src={product.images[0]} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </Link>
                      <div className="p-5 lg:p-6">
                        <p className="text-champagne-gold text-[9px] tracking-[0.25em] uppercase font-body mb-1.5">{product.category}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-heading text-lg text-espresso group-hover:text-champagne-gold transition-colors duration-500 tracking-tight">{product.name}</h3>
                        </Link>
                        <p className="font-heading text-xl text-espresso mt-1 tracking-tight">${product.price}</p>
                        <div className="flex gap-2.5 mt-5">
                          <button
                            onClick={() => { addItem(product); toast.success(`${product.name} added to bag`); }}
                            className="flex-1 py-2.5 bg-espresso text-cream text-[9px] tracking-[0.25em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <HiOutlineShoppingBag size={11} />
                            Add to Cart
                          </button>
                          <Link
                            to={`/product/${product.id}`}
                            className="w-10 h-10 border border-espresso/8 rounded-full flex items-center justify-center text-espresso/30 hover:text-champagne-gold hover:border-champagne-gold/30 transition-all duration-500"
                            aria-label="Quick view"
                          >
                            <HiOutlineEye size={13} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">Saved Addresses</h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">Your delivery destinations</p>
                </div>
              </div>

              {editingAddr ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-espresso/[0.03] shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Full Name</label>
                      <input type="text" value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        autoComplete="name"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Full name" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Phone Number</label>
                      <input type="tel" value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        autoComplete="tel"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Phone number" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Street Address</label>
                      <input type="text" value={addressForm.address}
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        autoComplete="street-address"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Street address" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Apartment (optional)</label>
                      <input type="text" value={addressForm.apartment}
                        onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                        autoComplete="address-line2"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Apartment, suite, etc." />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">City</label>
                      <input type="text" value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        autoComplete="address-level2"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">State</label>
                      <input type="text" value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        autoComplete="address-level1"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Postal Code</label>
                      <input type="text" value={addressForm.zip}
                        onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        autoComplete="postal-code"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Postal code" />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Country</label>
                      <input type="text" value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                        autoComplete="country-name"
                        className="w-full px-5 py-3.5 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 font-light placeholder:text-espresso/20" placeholder="Country" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8 pt-6 border-t border-espresso/[0.04]">
                    <button
                      onClick={() => { persistAddress(addressForm); setEditingAddr(false); toast.success('Address saved'); }}
                      className="px-8 py-3 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 flex items-center gap-2 shadow-sm"
                    >
                      <HiOutlineCheck size={13} />
                      Save Address
                    </button>
                    <button
                      onClick={() => setEditingAddr(false)}
                      className="px-8 py-3 border border-espresso/10 text-espresso/45 text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:border-espresso/25 hover:text-espresso/70 transition-all duration-500"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {savedAddress ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-champagne-gold/60 to-champagne-gold/10 rounded-r" />
                      <div className="pl-5">
                        <div className="flex items-start justify-between">
                          <p className="font-heading text-espresso">{savedAddress.fullName}</p>
                          <span className="text-[8px] px-2.5 py-1 bg-champagne-gold/10 text-champagne-gold rounded-full tracking-[0.25em] uppercase font-body">Default</span>
                        </div>
                        <p className="text-sm text-espresso/45 mt-3 font-light leading-relaxed">
                          {savedAddress.address}{savedAddress.apartment ? `, ${savedAddress.apartment}` : ''}<br />
                          {savedAddress.city}, {savedAddress.state} {savedAddress.zip}<br />
                          {savedAddress.country}
                        </p>
                        <p className="text-sm text-espresso/35 mt-2 font-light">{savedAddress.phone}</p>
                        <div className="flex gap-4 mt-5 pt-4 border-t border-espresso/[0.04]">
                          <button onClick={() => { setAddressForm({ ...savedAddress }); setEditingAddr(true); }}
                            className="text-[9px] tracking-[0.25em] uppercase text-espresso/35 hover:text-champagne-gold transition-colors font-body flex items-center gap-1.5"
                          >
                            <HiOutlinePencil size={11} />
                            Edit
                          </button>
                          <button className="text-[9px] tracking-[0.25em] uppercase text-espresso/35 hover:text-red-400 transition-colors font-body flex items-center gap-1.5">
                            <HiOutlineTrash size={11} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 border border-dashed border-espresso/8 text-center hover:border-espresso/15 transition-all duration-500"
                    >
                      <HiOutlineLocationMarker size={28} className="mx-auto text-espresso/12" />
                      <p className="text-espresso/35 text-sm mt-3 font-light">No saved address yet</p>
                    </motion.div>
                  )}
                  <button
                    onClick={() => setEditingAddr(true)}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 border border-dashed border-espresso/8 hover:border-champagne-gold/30 hover:shadow-sm transition-all duration-500 flex flex-col items-center justify-center gap-2.5 text-espresso/25 hover:text-champagne-gold group"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-espresso/15 group-hover:border-champagne-gold/30 flex items-center justify-center transition-all duration-500">
                      <HiOutlinePlus size={20} className="group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="text-[9px] tracking-[0.3em] uppercase font-body">Add New Address</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">Security</h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">Protect your account</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                        <HiOutlineShieldCheck size={18} className="text-espresso/35" />
                      </div>
                      <div>
                        <p className="font-heading text-espresso text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-espresso/35 mt-1.5 font-light leading-relaxed max-w-xs">Add an extra layer of security to prevent unauthorised access.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFA(!twoFA)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-500 ${
                        twoFA ? 'bg-espresso' : 'bg-espresso/10'
                      }`}
                      aria-label={twoFA ? 'Disable two-factor authentication' : 'Enable two-factor authentication'}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-cream transition-all duration-500 shadow-sm ${
                        twoFA ? 'translate-x-5' : ''
                      }`} />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                      <HiOutlineClock size={18} className="text-espresso/35" />
                    </div>
                    <div>
                      <p className="font-heading text-espresso text-sm">Active Sessions</p>
                      <p className="text-xs text-espresso/35 mt-1.5 font-light">You are signed in on this device.</p>
                      <button className="mt-4 text-[9px] tracking-[0.25em] uppercase text-espresso/30 hover:text-red-400 transition-colors font-body">
                        Sign out all devices
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">Notifications</h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">Manage your communication preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                        <HiOutlineMail size={18} className="text-espresso/35" />
                      </div>
                      <div>
                        <p className="font-heading text-espresso text-sm">Newsletter</p>
                        <p className="text-xs text-espresso/35 mt-1.5 font-light leading-relaxed">Receive exclusive previews, limited editions, and perfumery insights.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNewsletter(!newsletter)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-500 shrink-0 ${
                        newsletter ? 'bg-espresso' : 'bg-espresso/10'
                      }`}
                      aria-label={newsletter ? 'Unsubscribe from newsletter' : 'Subscribe to newsletter'}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-cream transition-all duration-500 shadow-sm ${
                        newsletter ? 'translate-x-5' : ''
                      }`} />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                        <HiOutlineShoppingBag size={18} className="text-espresso/35" />
                      </div>
                      <div>
                        <p className="font-heading text-espresso text-sm">Order Updates</p>
                        <p className="text-xs text-espresso/35 mt-1.5 font-light leading-relaxed">Get notified about your order status, shipping, and delivery.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setOrderUpdates(!orderUpdates)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-500 shrink-0 ${
                        orderUpdates ? 'bg-espresso' : 'bg-espresso/10'
                      }`}
                      aria-label={orderUpdates ? 'Disable order updates' : 'Enable order updates'}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-cream transition-all duration-500 shadow-sm ${
                        orderUpdates ? 'translate-x-5' : ''
                      }`} />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                        <HiOutlineStar size={18} className="text-espresso/35" />
                      </div>
                      <div>
                        <p className="font-heading text-espresso text-sm">Promotions & Offers</p>
                        <p className="text-xs text-espresso/35 mt-1.5 font-light leading-relaxed">Be the first to know about exclusive sales, new launches, and events.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPromotions(!promotions)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-500 shrink-0 ${
                        promotions ? 'bg-espresso' : 'bg-espresso/10'
                      }`}
                      aria-label={promotions ? 'Disable promotions' : 'Enable promotions'}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-cream transition-all duration-500 shadow-sm ${
                        promotions ? 'translate-x-5' : ''
                      }`} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[1px] bg-champagne-gold/40" />
                <div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-espresso tracking-tight">Preferences</h2>
                  <p className="text-xs text-espresso/35 font-light mt-1">Tailor your experience</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                      <HiOutlineStar size={18} className="text-espresso/35" />
                    </div>
                    <div>
                      <p className="font-heading text-espresso text-sm">Preferred Fragrance Family</p>
                      <p className="text-xs text-espresso/35 mt-0.5 font-light">We'll recommend scents you'll love.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setPreferredFamily(f.toLowerCase())}
                        className={`px-4 py-2 rounded-full text-[9px] tracking-[0.25em] uppercase font-body transition-all duration-500 ${
                          preferredFamily === f.toLowerCase()
                            ? 'bg-espresso text-cream shadow-sm'
                            : 'bg-espresso/[0.04] text-espresso/45 hover:bg-espresso/10 hover:text-espresso/70'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 lg:p-8 border border-espresso/[0.03] hover:border-espresso/[0.06] hover:shadow-sm transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-espresso/[0.03] flex items-center justify-center shrink-0">
                      <HiOutlineGlobe size={18} className="text-espresso/35" />
                    </div>
                    <div>
                      <p className="font-heading text-espresso text-sm">Language & Currency</p>
                      <p className="text-xs text-espresso/35 mt-0.5 font-light">Regional preferences</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Language</label>
                      <select value={language} onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 appearance-none font-light">
                        <option>English</option>
                        <option>French</option>
                        <option>Arabic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-espresso/35 font-body mb-2.5">Currency</label>
                      <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-4 py-3 bg-cream border border-espresso/8 rounded-xl text-sm text-espresso outline-none focus:border-champagne-gold/50 transition-all duration-300 appearance-none font-light">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
