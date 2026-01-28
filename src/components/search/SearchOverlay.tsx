import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import { Product } from '../../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = (productsData as Product[]).filter(product => {
      const productText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return searchTerms.every(term => productText.includes(term));
    }).slice(0, 6); // Limit to 6 results

    setResults(filtered);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleProductClick = (productId: number) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to shop with search query if we implemented a full search page
      // navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
               <span className="text-2xl font-bold text-primary tracking-tight">FASHION<span className="text-accent">SHOP</span></span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <X className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
            </button>
          </div>

          {/* Search Input */}
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Wonach suchen Sie?"
                className="w-full text-4xl md:text-6xl font-bold text-primary placeholder-gray-300 bg-transparent border-none outline-none pb-4 border-b-2 border-gray-100 focus:border-accent transition-all"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-gray-400 hover:text-accent transition-colors"
              >
                <Search className="w-10 h-10" />
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto mt-12 px-4">
            <div className="max-w-7xl mx-auto w-full">
              {query && results.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-500 py-12"
                >
                  <p className="text-xl">Keine Ergebnisse für "{query}" gefunden.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                  <AnimatePresence>
                    {results.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        onClick={() => handleProductClick(product.id)}
                        className="group cursor-pointer flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0 shadow-sm">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="font-bold text-primary text-lg">{product.price} €</span>
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
                              <ArrowRight className="w-5 h-5 text-accent" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {!query && (
                <div className="text-center py-12">
                   <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Beliebte Kategorien</h3>
                   <div className="flex flex-wrap justify-center gap-4">
                     {['Herren T-Shirts', 'Damen Kleider', 'Accessoires', 'Sommer Kollektion'].map((tag) => (
                       <button
                         key={tag}
                         onClick={() => setQuery(tag)}
                         className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 font-medium transition-colors"
                       >
                         {tag}
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
