import {
  getProductsRepository,
  saveProductRepository,
  deleteProductRepository,
} from "../repositories/productRepository";

export async function listProducts(filters = {}) {
  let products = await getProductsRepository();

  if (filters.search) {
    const query = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.shortDescription
          ?.toLowerCase()
          .includes(query)
    );
  }

  if (filters.type && filters.type !== "all") {
    products = products.filter(
      (p) => p.type === filters.type
    );
  }

  if (
    filters.status &&
    filters.status !== "all"
  ) {
    products = products.filter(
      (p) => p.status === filters.status
    );
  }

  if (
    filters.category &&
    filters.category !== "all"
  ) {
    products = products.filter(
      (p) => p.category === filters.category
    );
  }

  return products;
}

export async function getProductById(id) {
  const products = await getProductsRepository();
  return products.find((p) => p.id === id) || null;
}

export async function getProductBySlug(slug) {
  const products = await getProductsRepository();
  return products.find((p) => p.slug === slug) || null;
}

export async function createProduct(data) {
  const slug = data.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const newProduct = {
    id: `prod-${Date.now()}`,
    partnerId: "partner-curitiba-001",
    status: "draft",
    visibility: "private",
    title: data.title,
    slug,
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    images: [],
    videos: [],
    coverImage: null,
    location: {
      address: data.address || "",
      zipCode: data.zipCode || "",
      city: "Curitiba",
      state: "PR",
      latitude: -25.428,
      longitude: -49.272,
      parking: data.parking ?? false,
      accessibility: data.accessibility ?? true,
    },
    pricing: {
      type: data.priceType || "paid",
      basePrice: Number(data.basePrice || 0),
      feeIncluded: true,
    },
    capacity: {
      maxCapacity: Number(data.maxCapacity || 100),
      limitPerCPF: Number(data.limitPerCPF || 4),
    },
    lots: [],
    sessions: [],
    seo: {
      metaTitle: `${data.title} - Curitiba 360`,
      metaDescription: data.shortDescription || "",
      keywords: "",
    },
    publication: {},
    analytics: {
      views: 0,
      conversions: 0,
      revenue: 0,
      favorites: 0,
      shares: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return saveProductRepository(newProduct);
}

export async function updateProduct(id, updates) {
  const product = await getProductById(id);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  // Prevent modifying critical read-only stats
  const cleanUpdates = { ...updates };
  delete cleanUpdates.analytics;
  delete cleanUpdates.partnerId;

  return saveProductRepository({
    ...product,
    ...cleanUpdates,
  });
}

export async function duplicateProduct(id) {
  const product = await getProductById(id);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  const duplicated = {
    ...product,
    id: `prod-${Date.now()}`,
    title: `${product.title} (Cópia)`,
    slug: `${product.slug}-copia`,
    status: "draft",
    analytics: {
      views: 0,
      conversions: 0,
      revenue: 0,
      favorites: 0,
      shares: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return saveProductRepository(duplicated);
}

export async function deleteProduct(id) {
  const product = await getProductById(id);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  // Frontend constraint check
  if (product.status !== "draft") {
    throw new Error(
      "Apenas rascunhos podem ser excluídos."
    );
  }

  return deleteProductRepository(id);
}
