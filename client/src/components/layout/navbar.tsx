import { Link } from "wouter";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, 
  Search,
  Menu,
  ChevronDown 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books"
];

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      {/* Top Bar */}
      <div className="bg-primary py-2">
        <div className="container mx-auto px-4 text-primary-foreground">
          <p className="text-sm">Free shipping on orders over 150 TND</p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">so9y.tn</Link>
          </div>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex gap-2">
                <Menu className="h-4 w-4" />
                Categories
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category}>
                  <Link href={`/products?category=${category.toLowerCase()}`}>
                    {category}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
            <div className="flex-1 relative">
              <Input 
                type="search"
                placeholder="Search products..."
                className="pr-8"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="link" className="text-sm font-medium">
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Cart */}
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Search (only shown on mobile) */}
      <div className="md:hidden border-t p-2">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full"
        />
      </div>
    </nav>
  );
}