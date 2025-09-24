import { ProductList } from "@/components/admin/product-list";

export default function ProductsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      <ProductList />
    </div>
  );
}
