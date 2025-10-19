import { storage } from '@/lib/storage';
import type { CartItem, Product } from '@/types';

const CART_UPDATED_EVENT = 'cart:updated';
const CART_OPEN_EVENT = 'cart:open';

const isBrowser = typeof window !== 'undefined';

const dispatchEvent = (name: string, detail?: unknown) => {
  if (!isBrowser) return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
};

const getCart = (): CartItem[] => {
  return storage.getCart();
};

const saveCart = (items: CartItem[]) => {
  storage.saveCart(items);
  dispatchEvent(CART_UPDATED_EVENT, { items });
};

export const cartManager = {
  getItems: (): CartItem[] => getCart(),

  addItem: (product: Product) => {
    const current = getCart();
    const existing = current.find((item) => item.id === product.id);
    let updated: CartItem[];

    if (existing) {
      updated = current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...current, { ...product, quantity: 1 }];
    }

    saveCart(updated);
    return updated;
  },

  updateQuantity: (id: number, quantity: number) => {
    const current = getCart();
    const updated = current.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    saveCart(updated);
    return updated;
  },

  removeItem: (id: number) => {
    const current = getCart();
    const updated = current.filter((item) => item.id !== id);
    saveCart(updated);
    return updated;
  },

  clear: () => {
    storage.clearCart();
    dispatchEvent(CART_UPDATED_EVENT, { items: [] });
  },

  openCart: () => {
    dispatchEvent(CART_OPEN_EVENT);
  },

  onCartUpdated: (callback: (items: CartItem[]) => void) => {
    if (!isBrowser) return () => undefined;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ items: CartItem[] }>).detail;
      callback(detail?.items ?? getCart());
    };
    window.addEventListener(CART_UPDATED_EVENT, handler);
    // emit current state immediately
    callback(getCart());
    return () => window.removeEventListener(CART_UPDATED_EVENT, handler);
  },

  onCartOpen: (callback: () => void) => {
    if (!isBrowser) return () => undefined;
    const handler = () => callback();
    window.addEventListener(CART_OPEN_EVENT, handler);
    return () => window.removeEventListener(CART_OPEN_EVENT, handler);
  },
};
