import type { Product } from "../../domain/product";
import type { DataSource } from "../DataSource";
import { gqlRequest, PRODUCT_QUERY, PRODUCTS_QUERY, type GqlProductDTO } from "./gqlClient";
import { toProduct } from "./gqlMapper";

export class GraphQLDataSource implements DataSource {
  async listProducts(): Promise<Product[]> {
    const data = await gqlRequest<{ products: GqlProductDTO[] }>(PRODUCTS_QUERY);
    return data.products.map(toProduct);
  }

  async getProduct(id: string): Promise<Product | null> {
    const data = await gqlRequest<{ product: GqlProductDTO | null }>(PRODUCT_QUERY, { id });
    return data.product ? toProduct(data.product) : null;
  }
}
