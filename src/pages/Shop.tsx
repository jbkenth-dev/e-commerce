import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductCardSkeleton } from '../components/ui/ProductCardSkeleton';
import { Button } from '../components/ui/Button';
import productsData from '../data/products.json';
import { Product } from '../types';
import { Filter, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, SearchX } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'Alle');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    // Load products
    setProducts(productsData as Product[]);
  }, []);

  useEffect(() => {
    // Update selected category if URL param changes
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('Alle');
    }
  }, [categoryParam]);

  useEffect(() => {
    // Show loading state when filters change
    setIsLoading(true);

    const timer = setTimeout(() => {
      // Filter products
      let result = products;

      if (selectedCategory !== 'Alle') {
        if (selectedCategory === 'Sale') {
          // Mock Sale logic: Products with price < 50 or random logic
          result = result.filter(p => p.price < 50 || p.id % 3 === 0);
        } else if (selectedCategory === 'Neuheiten') {
          // Mock New logic: Latest IDs
          result = result.sort((a, b) => b.id - a.id).slice(0, 10);
        } else {
          result = result.filter(p => p.category === selectedCategory);
        }
      }

      result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      setFilteredProducts(result);
      setCurrentPage(1); // Reset to first page on filter change
      setIsLoading(false);
    }, 600); // 600ms simulated delay

    return () => clearTimeout(timer);
  }, [products, selectedCategory, priceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const categories = [
    { id: 'Alle', label: 'Alle Produkte' },
    { id: 'Neuheiten', label: 'Neuheiten' },
    { id: 'Herren', label: 'Herren' },
    { id: 'Damen', label: 'Damen' },
    { id: 'Accessoires', label: 'Accessoires' },
    { id: 'Schuhe', label: 'Schuhe' },
    { id: 'Sale', label: 'Sale %' },
  ];

  const resetFilters = () => {
    setSelectedCategory('Alle');
    setPriceRange([0, 200]);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-lg text-primary">Filter</h3>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold mb-4 text-xs text-gray-500 uppercase tracking-wider">Kategorie</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <label
                      key={cat.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 group ${
                        selectedCategory === cat.id
                          ? 'bg-primary/5 text-primary font-medium'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          className="hidden"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                        />
                        <span>{cat.label}</span>
                      </div>
                      {selectedCategory === cat.id && (
                        <motion.div
                          layoutId="active-category"
                          className="w-1.5 h-1.5 rounded-full bg-accent"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm text-gray-700 uppercase tracking-wider">
                  Preis: {priceRange[0]} € - {priceRange[1]} €
                </h4>
                <div className="relative h-2 bg-gray-200 rounded-lg mt-6 mb-2">
                  <div
                    className="absolute h-full bg-accent rounded-lg"
                    style={{
                      left: `${(priceRange[0] / 200) * 100}%`,
                      right: `${100 - (priceRange[1] / 200) * 100}%`
                    }}
                  />

                  {/* Min Slider */}
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Math.min(parseInt(e.target.value), priceRange[1] - 10);
                      setPriceRange([val, priceRange[1]]);
                    }}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm z-20"
                  />

                  {/* Max Slider */}
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Math.max(parseInt(e.target.value), priceRange[0] + 10);
                      setPriceRange([priceRange[0], val]);
                    }}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm z-20"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0 €</span>
                  <span>200 €</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary">
                {selectedCategory} <span className="text-gray-400 text-lg font-normal">({filteredProducts.length} Artikel)</span>
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                Sortieren nach: <span className="font-medium text-primary ml-1 flex items-center cursor-pointer">Beliebtheit <ChevronDown className="w-4 h-4 ml-1" /></span>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <SearchX className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Keine Produkte gefunden</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  Leider konnten wir für deine Filtereinstellungen keine passenden Produkte finden.
                  Versuche es mit anderen Kriterien oder setze die Filter zurück.
                </p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="border-gray-200 hover:border-primary hover:text-primary"
                >
                  Alle Filter zurücksetzen
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <div className="w-10 h-10 flex items-center justify-center text-gray-400">
                        <MoreHorizontal className="w-5 h-5" />
                      </div>
                    ) : (
                      <button
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200
                          ${currentPage === page
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-primary border border-gray-200'}`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
