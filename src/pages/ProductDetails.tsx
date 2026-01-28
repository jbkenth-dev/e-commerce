import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, RefreshCw, Heart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PaymentMethods } from '../components/ui/PaymentMethods';
import { Skeleton } from '../components/ui/Skeleton';
import productsData from '../data/products.json';
import { Product } from '../types';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct as Product);
        window.scrollTo(0, 0);
      } else {
        navigate('/shop');
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="w-24 h-6 mb-8 rounded-lg" /> {/* Back button */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Skeleton */}
            <div className="aspect-[3/4] w-full max-w-[400px] mx-auto">
              <Skeleton className="w-full h-full rounded-2xl" />
            </div>

            {/* Details Skeleton */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <Skeleton className="w-32 h-6 rounded-full" />
                <Skeleton className="w-3/4 h-12 rounded-lg" />
              </div>

              <Skeleton className="w-40 h-10 rounded-lg" />

              <div className="space-y-3">
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-2/3 h-4 rounded" />
              </div>

              <div className="flex gap-4 pt-4">
                <Skeleton className="flex-1 h-16 rounded-xl" />
                <Skeleton className="w-40 h-16 rounded-xl" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zurück
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[3/4] w-full max-w-[400px] mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center space-x-2 text-sm text-gray-500 mb-4"
              >
                <span className="bg-primary/5 text-primary px-3 py-1 rounded-full uppercase tracking-wider font-bold text-xs">
                  {product.category}
                </span>
                <span>•</span>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-gray-600 font-medium">{product.rating} ({product.reviews} Bewertungen)</span>
                </div>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight"
              >
                {product.name}
              </motion.h1>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center mb-8"
              >
                <span className="text-4xl font-bold text-accent">{product.price} €</span>
                <span className="ml-4 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Auf Lager</span>
              </motion.div>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-gray-600 leading-relaxed mb-8 text-lg"
              >
                {product.description}
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addItem(product)}
                  className="flex-1 py-4 text-lg bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <ShoppingCart className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">In den Warenkorb</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-8 py-4 text-lg border-2 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <motion.div
                    animate={isWishlisted ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      className={`w-6 h-6 mr-2 transition-colors duration-300 ${
                        isWishlisted ? 'fill-current' : ''
                      }`}
                    />
                  </motion.div>
                  {isWishlisted ? 'Gemerkt' : 'Merken'}
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8"
              >
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center mb-3 text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Versand</span>
                  <span className="text-sm text-gray-600">Kostenlos ab 50€</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center mb-3 text-primary">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Rückgabe</span>
                  <span className="text-sm text-gray-600">30 Tage Zeit</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center mb-3 text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Sicherheit</span>
                  <span className="text-sm text-gray-600">Sichere Zahlung</span>
                </div>
              </motion.div>

              <PaymentMethods />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
