import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/components/order-status";
import { Card, CardContent } from "@/components/ui/card";
import { type Order } from "@shared/schema";

export default function Track() {
  const [trackingCode, setTrackingCode] = useState("");
  const [searchCode, setSearchCode] = useState("");

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/track/${searchCode}`],
    enabled: !!searchCode
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCode(trackingCode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter tracking code"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
          />
          <Button type="submit">Track</Button>
        </form>

        {isLoading && <div className="mt-8">Loading...</div>}

        {order && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <OrderStatus status={order.status} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
