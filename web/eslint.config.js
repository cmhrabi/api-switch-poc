import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // The UI layer must stay protocol-agnostic: it may only talk to the
    // DataSource interface (via useDataSource) and domain types.
    files: ["src/components/**", "src/hooks/**", "src/App.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "/data/(rest|graphql)(/|$)|/data/createDataSource",
              message:
                "UI code must not know which API is used. Import from data/DataSource / data/DataSourceProvider and domain/ instead.",
            },
          ],
        },
      ],
    },
  },
);
