import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import CartSidebar from './components/cart/CartSidebar';
import SearchModal from './components/layout/SearchModal';
import AuthModal from './components/layout/AuthModal';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import About from './pages/About';
import ShippingReturns from './pages/ShippingReturns';
import OrderConfirmation from './pages/OrderConfirmation';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-cream">
        <Navbar />
        <CartSidebar />
        <SearchModal />
        <AuthModal />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<JournalDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#4A3428',
            color: '#FFF9F2',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
          },
          success: {
            iconTheme: { primary: '#C7A36B', secondary: '#FFF9F2' },
          },
        }}
      />
    </BrowserRouter>
  );
}
