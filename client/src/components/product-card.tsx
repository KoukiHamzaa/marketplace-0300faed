import { type Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative">
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
          )}
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs rounded">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 hover:text-primary cursor-pointer">
            {product.title}
          </h3>
          <div className="flex items-center mt-1 text-amber-400">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <StarHalf className="h-4 w-4 fill-current" />
            <span className="text-xs text-muted-foreground ml-1">(4.5)</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-primary">
              {formatCurrency(Number(product.price))}
            </div>
            {product.wholesalePrice && (
              <div className="text-sm text-muted-foreground line-through">
                {formatCurrency(Number(product.wholesalePrice))}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-primary/90 hover:bg-primary"
          onClick={onAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}