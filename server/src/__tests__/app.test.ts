import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";

const app = createApp();

describe("REST", () => {
  it("returns products in the REST envelope", async () => {
    const res = await request(app).get("/api/products").expect(200);
    expect(res.body.meta.total).toBe(res.body.data.length);
    expect(res.body.data[0]).toEqual({
      id: "1",
      product_name: "The Pragmatic Programmer",
      price_cents: 5999,
      currency: "AUD",
      category_id: "c1",
    });
  });

  it("404s on an unknown product", async () => {
    await request(app).get("/api/products/nope").expect(404);
  });
});

describe("GraphQL", () => {
  it("returns nested products", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({ query: "{ products { id name price { amount currency } category { id name } } }" })
      .expect(200);
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.products[0]).toEqual({
      id: "1",
      name: "The Pragmatic Programmer",
      price: { amount: 59.99, currency: "AUD" },
      category: { id: "c1", name: "Books" },
    });
  });
});
