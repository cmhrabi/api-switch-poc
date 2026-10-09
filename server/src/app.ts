import express, { type RequestHandler } from "express";
import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/schema.js";
import { restRouter } from "./rest/routes.js";

// Optional artificial latency so loading states are visible in demos.
// Set API_DELAY_MS globally, or pass ?delay=ms on a request.
const delay: RequestHandler = (req, _res, next) => {
  const ms = Number(req.query.delay ?? process.env.API_DELAY_MS ?? 0);
  if (ms > 0) setTimeout(next, ms);
  else next();
};

export function createApp() {
  const app = express();
  const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) });

  app.use(delay);
  app.use("/api", restRouter);
  app.use(yoga.graphqlEndpoint, yoga);

  return app;
}
