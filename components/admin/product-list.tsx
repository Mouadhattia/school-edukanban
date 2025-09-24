"use client";

import { useOrganizationData } from "@/contexts/organization-data-context";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddProductDialog } from "@/components/admin/add-product-dialog";
import { EditProductDialog } from "@/components/admin/edit-product-dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { toast } from "@/lib/toast";
import type { SchoolProduct  as Product} from "@/lib/types";

export const ProductList = () => {
  const {
    schoolProductsData,
    loading,
    getAllSchoolProducts,
    user,
    createSchoolProduct,
    updateSchoolProduct,
    deleteSchoolProduct,
    getAllCourses,
    
  } = useOrganizationData();

  // use debounce function to debounce the search input
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };
  const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    }, [user]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  // Dialog states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const schoolId =
    user && user?.schoolIds && user?.schoolIds?.length > 0
      ? user?.schoolIds[0]
      : null;


  useEffect(() => {
    if ( user && schoolId) {
      getAllSchoolProducts( {
        schoolId: schoolId,
        search: debouncedSearch,
        page: page,
        limit: limit,
      });
    }
  }, [debouncedSearch, page, limit,  user, schoolId]);

  const productsList = schoolProductsData?.products || [];
  const totalPages = Math.ceil((schoolProductsData?.total || 0) / limit);
    const totalProducts = schoolProductsData?.total || 0;

  const handleAddProduct = async (productData: {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    video: string;
    enableJoinClass: boolean;
  }) => {
    console.log(schoolId,"schoolId");
    if (!schoolId) {
      alert("Authentication token or school ID missing.");
      toast({
        title: "Error",
        description: "Authentication token or school ID missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createSchoolProduct(
        {
          ...productData,
          school: schoolId,
        }   
      
      );

      setIsAddProductOpen(false);
      toast({
        title: "Product Added",
        description: `${productData.name} has been added successfully.`,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async (updatedProduct: {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    video: string;
    enableJoinClass: boolean;
  }) => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Authentication token or selected product missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateSchoolProduct(selectedProduct._id, updatedProduct);

      setIsEditProductOpen(false);
      toast({
        title: "Product Updated",
        description: `${updatedProduct.name} has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteSchoolProduct(selectedProduct._id);

      setIsDeleteConfirmOpen(false);
      toast({
        title: "Product Deleted",
        description: `${selectedProduct.name} has been permanently deleted.`,
        variant: "destructive",
      });
    } catch (error) {
        console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1); // Reset to first page when changing items per page
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Products</h3>
          <p className="text-sm text-muted-foreground">
            Manage products for this school
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search products..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => {
            setIsAddProductOpen(true);
            getAllCourses(token || "", {
              schoolId: user?.schoolIds?.[0] || "",
              search: "",
              page: 1,
              limit: 100,
            });
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration (hrs)</TableHead>
              <TableHead>Join Class</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading products...
                </TableCell>
              </TableRow>
            ) : productsList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No products found. Try a different search or add a new product.
                </TableCell>
              </TableRow>
            ) : (
              productsList.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {product.description || "No description"}
                  </TableCell>
                  <TableCell>${product.price || 0}</TableCell>
                  <TableCell>{product.duration || 0}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.enableJoinClass 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.enableJoinClass ? 'Enabled' : 'Disabled'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {Array.isArray(product.courses) ? product.courses.length : 0} courses
                  </TableCell>
                  <TableCell>
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditProductOpen(true);
                            getAllCourses(token || "", {
                              schoolId: user?.schoolIds?.[0] || "",
                              search: "",
                              page: 1,
                              limit: 100,
                            });
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteConfirmOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalProducts > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            {/* Left side: Items per page and summary */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Show</span>
                <Select
                  value={limit.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm font-medium">entries</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {Math.min((page - 1) * limit + 1, totalProducts)} to{" "}
                {Math.min(page * limit, totalProducts)} of {totalProducts} products
              </div>
            </div>

            {/* Right side: Page navigation */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Previous page</span>‹
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Next page</span>›
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <AddProductDialog
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAdd={handleAddProduct}
      />

      <EditProductDialog
        isOpen={isEditProductOpen}
        onClose={() => setIsEditProductOpen(false)}
        onSave={handleEditProduct}
        product={selectedProduct}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteProduct}
                title="Delete Product"
        description={`Are you sure you want to permanently delete "${selectedProduct?.name}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};
