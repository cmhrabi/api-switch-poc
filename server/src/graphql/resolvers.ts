import type { ProductRecord } from "../data/store.js";
import * as catalog from "../services/catalog.js";

export const resolvers = {
  Query: {
    products: () => catalog.getProducts(),
    product: (_: unknown, args: { id: string }) => catalog.getProduct(args.id) ?? null,
  },
  Product: {
    price: (p: ProductRecord) => ({ amount: p.priceCents / 100, currency: p.currency }),
    category: (p: ProductRecord) => {
      const category = catalog.getCategory(p.categoryId);
      if (!category) throw new Error(`Category ${p.categoryId} not found`);
      return category;
    },
  },
};
