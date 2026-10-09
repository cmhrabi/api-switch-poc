import { afterEach, describe, expect, it, vi } from "vitest";
import type { GqlProductDTO } from "../graphql/gqlClient";
import { GraphQLDataSource } from "../graphql/GraphQLDataSource";
import type { RestCategoryDTO, RestProductDTO } from "../rest/restClient";
import { RestDataSource } from "../rest/RestDataSource";

// The core guarantee of the POC: given the same underlying data, both adapters
// produce identical domain objects, so the UI can't tell them apart.

const restProducts: RestProductDTO[] = [
  { id: "1", product_name: "Book", price_cents: 1999, currency: "AUD", category_id: "c1" },
  { id: "2", product_name: "Keyboard", price_cents: 18900, currency: "AUD", category_id: "c2" },
];
const restCategories: RestCategoryDTO[] = [
  { id: "c1", category_name: "Books" },
  { id: "c2", category_name: "Electronics" },
];
const gqlProducts: GqlProductDTO[] = [
  { __typename: "Product", id: "1", name: "Book", price: { amount: 19.99, currency: "AUD" }, category: { id: "c1", name: "Books" } },
  { __typename: "Product", id: "2", name: "Keyboard", price: { amount: 189, currency: "AUD" }, category: { id: "c2", name: "Electronics" } },
];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

function stubBackend() {
  vi.stubGlobal("fetch", async (input: string, init?: RequestInit) => {
    if (input === "/api/products") return json({ data: restProducts, meta: { total: restProducts.length } });
    if (input === "/api/categories") return json({ data: restCategories, meta: { total: restCategories.length } });
    const restItem = input.match(/^\/api\/products\/(.+)$/);
    if (restItem) {
      const p = restProducts.find((x) => x.id === restItem[1]);
      return p ? json({ data: p }) : json({ error: { code: "NOT_FOUND" } }, 404);
    }
    if (input === "/graphql") {
      const { variables } = JSON.parse(init!.body as string) as { variables?: { id: string } };
      if (variables?.id) return json({ data: { product: gqlProducts.find((x) => x.id === variables.id) ?? null } });
      return json({ data: { products: gqlProducts } });
    }
    throw new Error(`Unexpected fetch ${input}`);
  });
}

afterEach(() => vi.unstubAllGlobals());

describe("REST and GraphQL data sources are interchangeable", () => {
  it("listProducts returns identical domain objects", async () => {
    stubBackend();
    const [rest, gql] = await Promise.all([new RestDataSource().listProducts(), new GraphQLDataSource().listProducts()]);
    expect(rest).toEqual(gql);
    expect(rest[0]).toEqual({ id: "1", name: "Book", price: { amount: 19.99, currency: "AUD" }, category: { id: "c1", name: "Books" } });
  });

  it("getProduct returns identical domain objects", async () => {
    stubBackend();
    const [rest, gql] = await Promise.all([new RestDataSource().getProduct("2"), new GraphQLDataSource().getProduct("2")]);
    expect(rest).toEqual(gql);
    expect(rest).not.toBeNull();
  });

  it("getProduct returns null for a missing product in both", async () => {
    stubBackend();
    expect(await new RestDataSource().getProduct("nope")).toBeNull();
    expect(await new GraphQLDataSource().getProduct("nope")).toBeNull();
  });

  it("does not leak transport fields like __typename", async () => {
    stubBackend();
    const [gql] = await new GraphQLDataSource().listProducts();
    expect(gql).not.toHaveProperty("__typename");
  });
});
