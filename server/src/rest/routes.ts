import { Router } from "express";
import type { CategoryRecord, ProductRecord } from "../data/store.js";
import * as catalog from "../services/catalog.js";

// REST deliberately uses a different shape from GraphQL: snake_case fields,
// integer cents, a foreign key instead of a nested category, and an envelope.

const toRestProduct = (p: ProductRecord) => ({
  id: p.id,
  product_name: p.name,
  price_cents: p.priceCents,
  currency: p.currency,
  category_id: p.categoryId,
});

const toRestCategory = (c: CategoryRecord) => ({
  id: c.id,
  category_name: c.name,
});

export const restRouter = Router();

restRouter.get("/products", (_req, res) => {
  const items = catalog.getProducts();
  res.json({ data: items.map(toRestProduct), meta: { total: items.length } });
});

restRouter.get("/products/:id", (req, res) => {
  const product = catalog.getProduct(req.params.id);
  if (!product) {
    res.status(404).json({ error: { code: "NOT_FOUND", message: `Product ${req.params.id} not found` } });
    return;
  }
  res.json({ data: toRestProduct(product) });
});

restRouter.get("/categories", (_req, res) => {
  const items = catalog.getCategories();
  res.json({ data: items.map(toRestCategory), meta: { total: items.length } });
});
