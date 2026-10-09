import type { Product } from "../../domain/product";
import type { DataSource } from "../DataSource";
import { fetchCategories, fetchProduct, fetchProducts } from "./restClient";
import { indexCategories, toProduct } from "./restMapper";

export class RestDataSource implements DataSource {
  async listProducts(): Promise<Product[]> {
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    const byId = indexCategories(categories);
    return products.map((p) => toProduct(p, byId));
  }

  async getProduct(id: string): Promise<Product | null> {
    const [product, categories] = await Promise.all([fetchProduct(id), fetchCategories()]);
    return product ? toProduct(product, indexCategories(categories)) : null;
  }
}
