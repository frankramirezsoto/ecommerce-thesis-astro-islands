import { useEffect, useState } from 'react';
import type { CartItem } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cartManager } from '@/lib/cart';
import { useCartActions } from '@/hooks/use-cart';

export const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const { updateQuantity, removeFromCart } = useCartActions();

  useEffect(() => {
    const unsubscribeCart = cartManager.onCartUpdated((cartItems) => {
      setItems(cartItems);
    });
    const unsubscribeOpen = cartManager.onCartOpen(() => setOpen(true));

    return () => {
      unsubscribeCart?.();
      unsubscribeOpen?.();
    };
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/checkout';
    }
  };

  const handleContinueShopping = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/products';
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" className="mt-4" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2 mb-2">{item.title}</h4>
                    <p className="font-semibold text-primary">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
