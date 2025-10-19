import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCartActions } from '@/hooks/use-cart';

interface ProductDetailIslandProps {
  productId: string;
}

export const ProductDetailIsland = ({ productId }: ProductDetailIslandProps) => {
  const { addToCart } = useCartActions();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      try {
        const data = await api.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to load product',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-secondary/30 rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-secondary/30 rounded animate-pulse" />
              <div className="h-4 bg-secondary/30 rounded animate-pulse w-3/4" />
              <div className="h-32 bg-secondary/30 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Product not found</p>
          <Button onClick={() => typeof window !== 'undefined' && (window.location.href = '/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-secondary/30 rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[500px] w-auto object-contain"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="ml-1 font-semibold">{product.rating.rate}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t pt-6 space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => {
                  const added = addToCart(product, { silent: true });
                  if (added && typeof window !== 'undefined') {
                    window.location.href = '/checkout';
                  }
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
