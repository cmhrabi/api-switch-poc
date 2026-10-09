import { useProduct } from "../hooks/useProducts";
import { formatPrice } from "./formatPrice";

export function ProductDetail({ id }: { id: string }) {
  const { data, loading, error } = useProduct(id);

  if (error) return <p className="error">Failed to load product: {error.message}</p>;
  if (loading && !data) return <p className="muted">Loading…</p>;
  if (!data) return <p className="muted">Product not found.</p>;

  return (
    <div className="card">
      <h2>{data.name}</h2>
      <dl>
        <dt>ID</dt>
        <dd>{data.id}</dd>
        <dt>Category</dt>
        <dd>{data.category.name}</dd>
        <dt>Price</dt>
        <dd>{formatPrice(data.price)}</dd>
      </dl>
      <details>
        <summary>Domain object</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}
