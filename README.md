# API Switch POC

One backend serves the same catalogue over **REST** and **GraphQL**. The frontend uses a **feature flag** to pick one, and an adapter layer turns both into a single domain shape, so components and hooks never know which API they're talking to.

```
 ┌──────────── web (React) ────────────┐        ┌──────── server (Express) ────────┐
 │ components/ ─┐                      │        │                                   │
 │ hooks/ ──────┴─► DataSource (iface) │        │  /api/*    REST routes ──┐        │
 │                     ▲               │        │                          ├─► catalog service ─► store
 │       flag ─► createDataSource      │        │  /graphql  yoga resolvers┘        │
 │                 ├─ RestDataSource ──┼─fetch─►│                                   │
 │                 └─ GraphQLDataSource┼─fetch─►│                                   │
 └─────────────────────────────────────┘        └───────────────────────────────────┘
```

The two APIs return **deliberately different shapes**:

| | REST | GraphQL | Domain (`web/src/domain/product.ts`) |
|---|---|---|---|
| name | `product_name` | `name` | `name` |
| price | `price_cents: 1999` | `price { amount: 19.99 currency }` | `price: { amount, currency }` |
| category | `category_id` + `/api/categories` | `category { id name }` | `category: { id, name }` |
| envelope | `{ data, meta }` | `{ data: { products } }` | `Product[]` |

## Run

```bash
npm install
npm run dev        # server :4000, web :5173 (Vite proxies /api and /graphql)
```

Open http://localhost:5173 and flip **REST / GraphQL** in the dev panel. The UI stays identical. The DevTools Network tab shows `GET /api/products` + `/api/categories` in one mode and `POST /graphql` in the other.

- GraphiQL: http://localhost:4000/graphql
- Slow responses: `API_DELAY_MS=800 npm run dev`, or add `?delay=800` to a request

## The flag

`web/src/flags/flags.ts` is a local mock. It defaults from `VITE_API_MODE` in `web/.env` (`rest` | `graphql`) and the dev panel overrides it via localStorage. To use a real flag service, swap that module.

## The boundary

- `web/src/data/DataSource.ts` is the contract. Each implementation owns its client, DTOs and mapper.
- ESLint (`web/eslint.config.js`) **fails** if anything in `components/`, `hooks/` or `App.tsx` imports `data/rest`, `data/graphql` or `createDataSource`.
- `web/src/data/__tests__/contract.test.ts` asserts both data sources return deep-equal domain objects.

## Scripts

`npm test` · `npm run lint` · `npm run typecheck`
