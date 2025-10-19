import { useEffect, useState } from 'react';
import { ShoppingCart, User, LogOut, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { cartManager } from '@/lib/cart';

export const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    const unsubscribeCart = cartManager.onCartUpdated((items) => {
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemsCount(count);
    });

    const updateUser = () => setUser(storage.getUser());
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', updateUser);
      window.addEventListener('user-changed', updateUser);
    }

    return () => {
      unsubscribeCart?.();
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', updateUser);
        window.removeEventListener('user-changed', updateUser);
      }
    };
  }, []);

  const handleLogout = () => {
    storage.clearUser();
    cartManager.clear();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('user-changed'));
      window.location.href = '/auth';
    }
  };

  const goTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-semibold text-xl">
            <Store className="h-6 w-6 text-primary" />
            <span>ShopHub</span>
          </a>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goTo('/products')}
              className="hidden sm:inline-flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => goTo('/orders')}
                  className="hidden sm:inline-flex"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => cartManager.openCart()}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick={() => goTo('/auth')}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
