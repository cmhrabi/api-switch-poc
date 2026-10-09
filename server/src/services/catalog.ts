import { categories, products, type CategoryRecord, type ProductRecord } from "../data/store.js";

// Single source of truth for both transports. Any shape differences live in the
// REST routes / GraphQL resolvers, never here.

export function getProducts(): ProductRecord[] {
  return products;
}

export function getProduct(id: string): ProductRecord | undefined {
  return products.find((p) => p.id === id);
}

export function getCategories(): CategoryRecord[] {
  return categories;
}

export function getCategory(id: string): CategoryRecord | undefined {
  return categories.find((c) => c.id === id);
}
