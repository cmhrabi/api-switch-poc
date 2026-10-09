import { useFlags } from "../flags/FlagProvider";
import type { ApiMode } from "../flags/flags";

// Dev-only control. The only piece of UI that knows which API is active, and
// it only knows via the flag, never via the data layer.
export function DevFlagPanel() {
  const { flags, setFlag } = useFlags();
  if (!import.meta.env.DEV) return null;

  const modes: ApiMode[] = ["rest", "graphql"];
  return (
    <aside className="dev-panel">
      <span className="dev-label">Feature flag · apiMode</span>
      <div className="segmented">
        {modes.map((mode) => (
          <button key={mode} className={flags.apiMode === mode ? "active" : undefined} onClick={() => setFlag("apiMode", mode)}>
            {mode === "rest" ? "REST" : "GraphQL"}
          </button>
        ))}
      </div>
    </aside>
  );
}
