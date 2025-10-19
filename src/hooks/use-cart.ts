import { useCallback } from 'react';
import { cartManager } from '@/lib/cart';
import { storage } from '@/lib/storage';
import type { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AddToCartOptions {
  silent?: boolean;
  title?: string;
  description?: string;
}

export const useCartActions = () => {
  const ensureUser = useCallback(() => {
    const user = storage.getUser();
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to login to add items to your cart',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  }, []);

  const addToCart = useCallback(
    (product: Product, options: AddToCartOptions = {}): boolean => {
      if (!ensureUser()) {
        return false;
      }
      cartManager.addItem(product);
      if (!options.silent) {
        toast({
          title: options.title ?? 'Added to cart',
          description:
            options.description ?? `${product.title} has been added to your cart`,
        });
      }
      return true;
    },
    [ensureUser]
  );

  const updateQuantity = useCallback((id: number, quantity: number): void => {
    cartManager.updateQuantity(id, quantity);
  }, []);

  const removeFromCart = useCallback((id: number): void => {
    cartManager.removeItem(id);
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
    });
  }, []);

  const clearCart = useCallback((): void => {
    cartManager.clear();
  }, []);

  const openCart = useCallback((): void => {
    cartManager.openCart();
  }, []);

  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
  };
};
