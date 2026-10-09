import type { Product } from "../domain/product";

/**
 * The "middleware" contract. Every implementation owns its transport, its raw
 * DTOs and its mapping, and must return domain types only.
 */
export interface DataSource {
  listProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
}
