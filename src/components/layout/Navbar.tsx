import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { SearchOverlay } from '../search/SearchOverlay';
import { LoginModal, RegisterModal } from '../auth/AuthModals';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const itemCount = useCartStore(state => state.itemCount());
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', exact: true },
    { name: 'Shop', path: '/shop', exact: true },
    { name: 'Neuheiten', path: '/shop?category=Neuheiten' },
    { name: 'Herren', path: '/shop?category=Herren' },
    { name: 'Damen', path: '/shop?category=Damen' },
    { name: 'Accessoires', path: '/shop?category=Accessoires' },
    { name: 'Schuhe', path: '/shop?category=Schuhe' },
    { name: 'Sale', path: '/shop?category=Sale', isSale: true },
  ];

  const isActiveLink = (path: string, exact: boolean = false) => {
    if (exact) {
      if (path === '/') return location.pathname === '/' && location.search === '';
      if (path === '/shop') return location.pathname === '/shop' && location.search === '';
    }
    return location.pathname + location.search === path;
  };

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
      />

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-2xl font-bold tracking-tight ${!isTransparent ? 'text-primary' : 'text-white'}`}>
                FASHION<span className="text-accent">SHOP</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.path, link.exact);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-colors rounded-md group
                      ${isActive
                        ? (!isTransparent ? 'text-primary' : 'text-white')
                        : (!isTransparent ? 'text-gray-600 hover:text-primary' : 'text-white/80 hover:text-white')
                      }
                      ${link.isSale ? 'text-red-500 hover:text-red-400 font-bold' : ''}
                    `}
                  >
                    {link.name}
                    {link.name === 'Neuheiten' && !isActive && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${!isTransparent ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 ${!isTransparent ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                  onClick={() => isAuthenticated ? setIsUserMenuOpen(!isUserMenuOpen) : setIsLoginOpen(true)}
                >
                  <User className={`w-5 h-5 ${isAuthenticated ? 'text-accent' : ''}`} />
                </Button>

                <AnimatePresence>
                  {isUserMenuOpen && isAuthenticated && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-2"
                      >
                        <div className="px-4 py-2 border-b border-gray-100 mb-2">
                          <p className="text-sm font-bold text-primary truncate">{user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" /> Mein Konto
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Abmelden
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className={`relative p-2 ${!isTransparent ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => useCartStore.getState().toggleCart()}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`mr-2 p-2 ${!isTransparent ? 'text-gray-700' : 'text-white'}`}
              >
                <Search className="w-6 h-6" />
              </button>

              <button
                onClick={() => isAuthenticated ? navigate('/account') : setIsLoginOpen(true)}
                className={`mr-2 p-2 ${!isTransparent ? 'text-gray-700' : 'text-white'}`}
              >
                <User className={`w-6 h-6 ${isAuthenticated ? 'text-accent' : ''}`} />
              </button>

              <button
                onClick={() => useCartStore.getState().toggleCart()}
                className={`mr-4 relative p-2 ${!isTransparent ? 'text-gray-700' : 'text-white'}`}
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className={!isTransparent ? 'text-gray-700' : 'text-white'}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link.path, link.exact);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block px-3 py-2 text-base font-medium rounded-md
                        ${isActive ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-50'}
                        ${link.isSale ? 'text-red-600' : ''}
                      `}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                {isAuthenticated && (
                   <button
                     onClick={handleLogout}
                     className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                   >
                     Abmelden
                   </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
