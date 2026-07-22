export { default as ProductsPage } from "./pages/ProductsPage";
export { default as ProductCreatePage } from "./pages/ProductCreatePage";
export { default as ProductEditPage } from "./pages/ProductEditPage";
export { default as ProductPreviewPage } from "./pages/ProductPreviewPage";
export { default as ProductLotsPage } from "./pages/ProductLotsPage";
export { default as ProductAgendaPage } from "./pages/ProductAgendaPage";
export { default as ProductImagesPage } from "./pages/ProductImagesPage";
export { default as ProductSEOPage } from "./pages/ProductSEOPage";
export { default as ProductPublishPage } from "./pages/ProductPublishPage";

export { default as ProductStatusBadge } from "./components/ProductStatusBadge";
export { default as ProductCard } from "./components/ProductCard";
export { default as ProductFilters } from "./components/ProductFilters";

export { useProducts } from "./hooks/useProducts";
export { useProduct } from "./hooks/useProduct";

export {
  listProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  duplicateProduct,
  deleteProduct,
} from "./services/productService";
export { productSchema } from "./schemas/productSchema";
export { PRODUCT_TYPES } from "./constants/productTypes";
export { PRODUCT_STATUS } from "./constants/productStatus";
export { PRODUCT_CATEGORIES } from "./constants/productCategories";
