import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { type Product } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckboxItem } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  inStock: boolean;
}

export default function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    rating: null,
    inStock: false
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.metadata?.category || "Uncategorized"))];

  // Get price range
  const priceRange = products.reduce((acc, product) => ({
    min: Math.min(acc.min, Number(product.price)),
    max: Math.max(acc.max, Number(product.price))
  }), { min: Infinity, max: -Infinity });

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = 
        filters.category === "all" || 
        product.metadata?.category === filters.category;

      const matchesPrice = 
        Number(product.price) >= filters.minPrice && 
        Number(product.price) <= filters.maxPrice;

      const matchesRating = 
        !filters.rating || 
        (product.metadata?.rating >= filters.rating);

      const matchesStock = 
        !filters.inStock || 
        product.inStock;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return Number(a.price) - Number(b.price);
        case "price-desc":
          return Number(b.price) - Number(a.price);
        case "rating":
          return (b.metadata?.rating || 0) - (a.metadata?.rating || 0);
        default:
          return b.id - a.id; // newest first
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters(f => ({ ...f, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    min={priceRange.min}
                    max={priceRange.max}
                    step={10}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => 
                      setFilters(f => ({ ...f, minPrice: min, maxPrice: max }))
                    }
                  />
                  <div className="flex justify-between text-sm">
                    <span>{filters.minPrice} TND</span>
                    <span>{filters.maxPrice} TND</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* In Stock Only */}
              <div>
                <CheckboxItem
                  checked={filters.inStock}
                  onCheckedChange={(checked) => 
                    setFilters(f => ({ ...f, inStock: checked as boolean }))
                  }
                >
                  In Stock Only
                </CheckboxItem>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4 border rounded-lg p-4">
                  <div className="h-48 bg-muted rounded-md animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filteredProducts.length} products found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => {
                      // TODO: Implement cart functionality
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}