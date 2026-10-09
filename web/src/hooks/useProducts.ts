import { useEffect, useState } from "react";
import { useDataSource } from "../data/DataSourceProvider";
import type { DataSource } from "../data/DataSource";
import type { Product } from "../domain/product";

interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
}

// Refetches whenever the DataSource instance changes (i.e. when the flag flips).
function useQuery<T>(fetcher: (source: DataSource) => Promise<T>, deps: unknown[]): AsyncState<T> {
  const source = useDataSource();
  const [state, setState] = useState<AsyncState<T>>({ data: undefined, loading: true, error: undefined });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: undefined }));
    fetcher(source).then(
      (data) => !cancelled && setState({ data, loading: false, error: undefined }),
      (error: Error) => !cancelled && setState({ data: undefined, loading: false, error }),
    );
    return () => {
      cancelled = true;
    };
  }, [source, ...deps]);

  return state;
}

export function useProducts() {
  return useQuery((source) => source.listProducts(), []);
}

export function useProduct(id: string) {
  return useQuery<Product | null>((source) => source.getProduct(id), [id]);
}
