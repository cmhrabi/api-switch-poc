import type { Price } from "../domain/product";

export function formatPrice(price: Price): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: price.currency }).format(price.amount);
}
