import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const cartTotal = total();
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const finalTotal = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Ihr Warenkorb ist leer</h2>
          <p className="text-gray-500 mb-8">Sieht aus, als hätten Sie noch keine Produkte hinzugefügt.</p>
          <Link to="/shop">
            <Button size="lg" className="w-full">Jetzt einkaufen</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Warenkorb ({items.length} Artikel)</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center"
              >
                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-primary text-lg truncate pr-4">{item.name}</h3>
                    <p className="font-bold text-accent whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Entfernen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <button 
              onClick={clearCart}
              className="text-gray-500 hover:text-primary text-sm font-medium underline mt-4"
            >
              Warenkorb leeren
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Zusammenfassung</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Zwischensumme</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Versandkosten</span>
                  <span>{shipping === 0 ? 'Kostenlos' : `${shipping.toFixed(2)} €`}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                    Kostenloser Versand aktiviert!
                  </p>
                )}
                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-primary">
                  <span>Gesamtsumme</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-4">
                Zur Kasse gehen
              </Button>
              
              <Link to="/shop" className="flex items-center justify-center text-sm text-gray-500 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Weiter einkaufen
              </Link>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400">
                  Wir akzeptieren alle gängigen Zahlungsmethoden.
                  Sichere SSL-Verschlüsselung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
