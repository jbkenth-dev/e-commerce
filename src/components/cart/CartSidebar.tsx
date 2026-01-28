import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Lock, Check, Loader2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../ui/Button';

export const CartSidebar: React.FC = () => {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem, total, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartTotal = total();
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const finalTotal = cartTotal + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsCheckingOut(false);
    setIsSuccess(true);

    // Clear cart and close after delay
    setTimeout(() => {
      clearCart();
      setIsSuccess(false);
      setCartOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-primary flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Warenkorb ({items.length})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Ihr Warenkorb ist leer</p>
                  <p className="text-sm mb-6">Entdecken Sie unsere Kollektion und finden Sie Ihre Favoriten.</p>
                  <Button onClick={() => setCartOpen(false)}>
                    Weiter einkaufen
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl">
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-primary text-sm line-clamp-2 pr-2">{item.name}</h3>
                          <span className="font-bold text-accent text-sm whitespace-nowrap">
                            {(item.price * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white rounded-lg border border-gray-200 h-8">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Zwischensumme</span>
                    <span>{cartTotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Versand</span>
                    <span>{shipping === 0 ? 'Kostenlos' : `${shipping.toFixed(2)} €`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-primary pt-2 border-t border-gray-100">
                    <span>Gesamtsumme</span>
                    <span>{finalTotal.toFixed(2)} €</span>
                  </div>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || isSuccess}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                    isSuccess
                      ? 'bg-green-500 shadow-green-500/30'
                      : 'bg-gradient-to-r from-primary to-slate-800 shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isCheckingOut ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verarbeite...
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center"
                      >
                        <Check className="w-6 h-6 mr-2" />
                        Bestellung bestätigt!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        SICHER ZUR KASSE
                        <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shine Effect */}
                  {!isCheckingOut && !isSuccess && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
