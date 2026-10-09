import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`REST     → http://localhost:${port}/api/products`);
  console.log(`GraphQL  → http://localhost:${port}/graphql`);
});
