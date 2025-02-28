import { Link, useLocation } from "wouter";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 h-screen border-r bg-sidebar">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-sidebar-foreground">
          Admin Dashboard
        </h1>
      </div>
      
      <nav className="px-4 py-2">
        {ADMIN_NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center px-4 py-2 my-1 text-sm rounded-md transition-colors",
                location === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}
