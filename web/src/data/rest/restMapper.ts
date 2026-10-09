import type { Category, Product } from "../../domain/product";
import type { RestCategoryDTO, RestProductDTO } from "./restClient";

export function toCategory(dto: RestCategoryDTO): Category {
  return { id: dto.id, name: dto.category_name };
}

/** REST returns a category_id, so the caller supplies categories to join against. */
export function toProduct(dto: RestProductDTO, categoriesById: Map<string, Category>): Product {
  const category = categoriesById.get(dto.category_id);
  if (!category) throw new Error(`Unknown category ${dto.category_id} for product ${dto.id}`);
  return {
    id: dto.id,
    name: dto.product_name,
    price: { amount: dto.price_cents / 100, currency: dto.currency },
    category,
  };
}

export function indexCategories(dtos: RestCategoryDTO[]): Map<string, Category> {
  return new Map(dtos.map((dto) => [dto.id, toCategory(dto)]));
}
