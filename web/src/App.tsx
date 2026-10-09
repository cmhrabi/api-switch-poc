import { useState } from "react";
import { DevFlagPanel } from "./components/DevFlagPanel";
import { ProductDetail } from "./components/ProductDetail";
import { ProductList } from "./components/ProductList";

export function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main>
      <header>
        <h1>Product catalogue</h1>
        <DevFlagPanel />
      </header>
      <section className="layout">
        <ProductList selectedId={selectedId} onSelect={setSelectedId} />
        {selectedId ? <ProductDetail id={selectedId} /> : <p className="muted">Select a product.</p>}
      </section>
    </main>
  );
}
