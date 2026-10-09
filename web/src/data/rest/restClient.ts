// Raw REST transport. DTO types mirror the wire format exactly.

export interface RestProductDTO {
  id: string;
  product_name: string;
  price_cents: number;
  currency: string;
  category_id: string;
}

export interface RestCategoryDTO {
  id: string;
  category_name: string;
}

interface ListEnvelope<T> {
  data: T[];
  meta: { total: number };
}

interface ItemEnvelope<T> {
  data: T;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`REST ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchProducts(): Promise<RestProductDTO[]> {
  return (await getJson<ListEnvelope<RestProductDTO>>("/api/products")).data;
}

export async function fetchProduct(id: string): Promise<RestProductDTO | null> {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`REST /api/products/${id} failed: ${res.status}`);
  return ((await res.json()) as ItemEnvelope<RestProductDTO>).data;
}

export async function fetchCategories(): Promise<RestCategoryDTO[]> {
  return (await getJson<ListEnvelope<RestCategoryDTO>>("/api/categories")).data;
}
