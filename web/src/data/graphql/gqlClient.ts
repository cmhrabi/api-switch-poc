// Raw GraphQL transport. Plain fetch keeps the POC dependency-free.

export interface GqlProductDTO {
  __typename?: string;
  id: string;
  name: string;
  price: { amount: number; currency: string };
  category: { id: string; name: string };
}

interface GqlResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    name
    price { amount currency }
    category { id name }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products { products { ...ProductFields } }
  ${PRODUCT_FIELDS}
`;

export const PRODUCT_QUERY = /* GraphQL */ `
  query Product($id: ID!) { product(id: $id) { ...ProductFields } }
  ${PRODUCT_FIELDS}
`;

export async function gqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);
  const body = (await res.json()) as GqlResponse<T>;
  if (body.errors?.length) throw new Error(body.errors.map((e) => e.message).join("; "));
  if (!body.data) throw new Error("GraphQL response had no data");
  return body.data;
}
