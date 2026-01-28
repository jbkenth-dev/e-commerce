import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartSidebar } from './components/cart/CartSidebar';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Shop = lazy(() => import('./pages/Shop').then(module => ({ default: module.Shop })));
const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const Account = lazy(() => import('./pages/Account').then(module => ({ default: module.Account })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));

// Service pages
const Contact = lazy(() => import('./pages/ServicePages').then(module => ({ default: module.Contact })));
const Shipping = lazy(() => import('./pages/ServicePages').then(module => ({ default: module.Shipping })));
const FAQ = lazy(() => import('./pages/ServicePages').then(module => ({ default: module.FAQ })));
const SizeGuide = lazy(() => import('./pages/ServicePages').then(module => ({ default: module.SizeGuide })));
const Privacy = lazy(() => import('./pages/ServicePages').then(module => ({ default: module.Privacy })));

function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-accent animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <ErrorBoundary>
          <Navbar />
          <CartSidebar />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />

                {/* Service Routes */}
                <Route path="/service/contact" element={<Contact />} />
                <Route path="/service/shipping" element={<Shipping />} />
                <Route path="/service/faq" element={<FAQ />} />
                <Route path="/service/sizes" element={<SizeGuide />} />
                <Route path="/service/privacy" element={<Privacy />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
