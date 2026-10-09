// In-memory seed data. Both REST and GraphQL read from here via the catalog service.

export interface CategoryRecord {
  id: string;
  name: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  categoryId: string;
}

export const categories: CategoryRecord[] = [
  { id: "c1", name: "Books" },
  { id: "c2", name: "Electronics" },
  { id: "c3", name: "Kitchen" },
];

export const products: ProductRecord[] = [
  { id: "1", name: "The Pragmatic Programmer", priceCents: 5999, currency: "AUD", categoryId: "c1" },
  { id: "2", name: "Mechanical Keyboard", priceCents: 18900, currency: "AUD", categoryId: "c2" },
  { id: "3", name: "Noise-cancelling Headphones", priceCents: 34950, currency: "AUD", categoryId: "c2" },
  { id: "4", name: "Cast Iron Skillet", priceCents: 7495, currency: "AUD", categoryId: "c3" },
  { id: "5", name: "Designing Data-Intensive Applications", priceCents: 6800, currency: "AUD", categoryId: "c1" },
];
