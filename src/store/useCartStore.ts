import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
  isCartOpen: boolean;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  addItem: (product) => set((state) => {
    const existing = state.items.find(item => item.id === product.id);
    if (existing) {
      return {
        items: state.items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isCartOpen: true // Open cart when adding item
      };
    }
    return {
      items: [...state.items, { ...product, quantity: 1 }],
      isCartOpen: true // Open cart when adding item
    };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0)
  })),
  clearCart: () => set({ items: [] }),
  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  itemCount: () => {
    const items = get().items;
    return items.length;
  },
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen })
}));
