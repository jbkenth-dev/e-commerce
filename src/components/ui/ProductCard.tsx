import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={handleCardClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg bg-white text-primary hover:bg-primary hover:text-white border-none"
          variant="secondary"
        >
          <ShoppingCart className="w-4 h-4 mr-2 inline" />
          In den Warenkorb
        </Button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors duration-200 line-clamp-1" title={product.name}>{product.name}</h3>
          <span className="text-lg font-bold text-accent whitespace-nowrap ml-2">{product.price} €</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <span className="capitalize">{product.category}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-gray-600">{product.rating} ({product.reviews})</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="ml-auto p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-accent hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group/cart"
            title="In den Warenkorb"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
