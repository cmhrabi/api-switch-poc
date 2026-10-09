import type { ApiMode } from "../flags/flags";
import type { DataSource } from "./DataSource";
import { GraphQLDataSource } from "./graphql/GraphQLDataSource";
import { RestDataSource } from "./rest/RestDataSource";

export function createDataSource(mode: ApiMode): DataSource {
  switch (mode) {
    case "graphql":
      return new GraphQLDataSource();
    case "rest":
      return new RestDataSource();
  }
}
