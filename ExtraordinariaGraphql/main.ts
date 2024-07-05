import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/schema.ts";
import mongoose from "mongoose";
import { Query } from "./resolvers/query.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}
console.log("HOLA HAsta aqui llega");
// Connect to MongoDB
await mongoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
});

const { url } = await startStandaloneServer(server, { listen: 8000 });
console.info(`🚀 Server ready at ${url}`);
