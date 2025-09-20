"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Badge,
  Building,
  ChevronDown,
  Filter,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Order } from "@/lib/types";

export default function OrdersPage() {
  const { ordersData, getOrders, user } = useOrganizationData();
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    if (token && user) {
      getOrders(token, page, limit, user?.userId);
    }
  }, [token, page, limit, search, user]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage all orders across the platform
          </p>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>All Orders</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-[250px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Order ID</DropdownMenuItem>
                  <DropdownMenuItem>User</DropdownMenuItem>
                  <DropdownMenuItem>Plan</DropdownMenuItem>
                  <DropdownMenuItem>Date Created</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 border-b p-3 font-medium">
              <div>User</div>
              <div>Course</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {ordersData?.orders?.map((order: Order) => (
              <div
                key={order._id}
                className="grid grid-cols-6 border-b p-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {typeof order.userId !== "string"
                        ? order.userId?.fullName?.[0] ||
                          order.userId?.email?.[0] ||
                          "U"
                        : order.userId[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {typeof order.userId !== "string"
                        ? order.userId?.fullName || "Unknown User"
                        : order.userId}
                    </span>
                    {typeof order.userId !== "string" &&
                      order.userId?.email && (
                        <span className="text-xs text-muted-foreground">
                          {order.userId.email}
                        </span>
                      )}
                  </div>
                </div>
                <div>
                  {typeof order.courseId === "string"
                    ? order.courseId
                    : order.courseId?.name}
                </div>

                <div>{order.amount}</div>
                <div>
                  <span
                    className={
                      order.status === "paid"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => {
                    //   setDeleteOpen(true);
                    //   setItemId(order._id);
                    // }}
                  >
                    Delete
                  </Button>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => {
                    //   setIsOpen(true);
                    //   setSelectedOrg(order);
                    // }}
                  >
                    Edit
                  </Button> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {ordersData?.orders?.length} of {ordersData?.total} orders
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={ordersData?.page == 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={
                ordersData?.page && ordersData?.total
                  ? ordersData.page >= ordersData.total
                  : true
              }
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
