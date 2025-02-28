import { useQuery } from "@tanstack/react-query";
import { type Order, type OrderItem } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Package } from "lucide-react";
import { Link } from "wouter";

interface OrderWithItems extends Order {
  items?: OrderItem[];
}

export default function Orders() {
  const { data: orders = [], isLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"]
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">No orders yet</h2>
              <p className="mt-2 text-muted-foreground">
                Start shopping to see your orders here
              </p>
              <Button asChild className="mt-4">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  Order #{order.id}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <OrderStatus status={order.status} />
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping Address</span>
                  <span className="max-w-[50%] text-right">
                    {order.shippingAddress}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span>{order.phoneNumber}</span>
                </div>

                {order.trackingCode && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Tracking Number
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{order.trackingCode}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/track?code=${order.trackingCode}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'TND'
                      }).format(Number(order.totalAmount))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}