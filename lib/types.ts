export interface Profile {
  id: string;
  name: string;
  role: 'admin' | 'seller' | 'user';
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  description: string;
  image: string;
  images?: string[];
  stock: number;
  seller_id: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  seller?: Profile;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'cod' | 'easypaisa' | 'jazzcash';
  payment_status: 'pending' | 'paid' | 'failed';
  shipping_address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: Profile;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
