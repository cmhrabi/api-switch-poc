export const typeDefs = /* GraphQL */ `
  type Price {
    amount: Float!
    currency: String!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Price!
    category: Category!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;
