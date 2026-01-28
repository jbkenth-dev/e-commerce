export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: string;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}
