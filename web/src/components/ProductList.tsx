import { useProducts } from "../hooks/useProducts";
import { formatPrice } from "./formatPrice";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProductList({ selectedId, onSelect }: Props) {
  const { data, loading, error } = useProducts();

  if (error) return <p className="error">Failed to load products: {error.message}</p>;
  if (loading && !data) return <p className="muted">Loading products…</p>;

  return (
    <table className={loading ? "stale" : undefined}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th className="num">Price</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((p) => (
          <tr key={p.id} className={p.id === selectedId ? "selected" : undefined} onClick={() => onSelect(p.id)}>
            <td>{p.name}</td>
            <td>{p.category.name}</td>
            <td className="num">{formatPrice(p.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
