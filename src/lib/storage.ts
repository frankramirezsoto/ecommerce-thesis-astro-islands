import { CartItem, Order, User } from '@/types';

const CART_KEY = 'ecommerce_cart';
const ORDERS_KEY = 'ecommerce_orders';
const USER_KEY = 'ecommerce_user';

const isBrowser = typeof window !== 'undefined';

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Failed to parse storage value', error);
    return fallback;
  }
};

export const storage = {
  getCart: (): CartItem[] => {
    if (!isBrowser) return [];
    const cart = window.localStorage.getItem(CART_KEY);
    return safeParse(cart, []);
  },

  saveCart: (cart: CartItem[]): void => {
    if (!isBrowser) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  clearCart: (): void => {
    if (!isBrowser) return;
    window.localStorage.removeItem(CART_KEY);
  },

  getOrders: (): Order[] => {
    if (!isBrowser) return [];
    const orders = window.localStorage.getItem(ORDERS_KEY);
    return safeParse(orders, []);
  },

  saveOrder: (order: Order): void => {
    if (!isBrowser) return;
    const orders = storage.getOrders();
    orders.unshift(order);
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  getUser: (): User | null => {
    if (!isBrowser) return null;
    const user = window.localStorage.getItem(USER_KEY);
    return safeParse<User | null>(user, null);
  },

  saveUser: (user: User): void => {
    if (!isBrowser) return;
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser: (): void => {
    if (!isBrowser) return;
    window.localStorage.removeItem(USER_KEY);
  },
};
