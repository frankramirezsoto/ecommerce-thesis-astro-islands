import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useCartActions } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';

export const HomeFeatured = () => {
  const { addToCart } = useCartActions();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await api.getAllProducts();
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleViewAll = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/products';
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="ghost" onClick={handleViewAll}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-secondary/30 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
