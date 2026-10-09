import type { Product } from "../../domain/product";
import type { GqlProductDTO } from "./gqlClient";

// The GraphQL shape is close to the domain, but map explicitly anyway so
// transport extras (__typename, future fields) never leak into the UI.
export function toProduct(dto: GqlProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: { amount: dto.price.amount, currency: dto.price.currency },
    category: { id: dto.category.id, name: dto.category.name },
  };
}
