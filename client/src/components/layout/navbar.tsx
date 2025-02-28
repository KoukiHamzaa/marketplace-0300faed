import { Link } from "wouter";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold">so9y.tn</a>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="text-sm font-medium transition-colors hover:text-primary">
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
