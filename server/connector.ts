import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const client = new MongoClient(process.env.MONGODB_URI ?? "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect() {
  await client.connect();
  await client.db("cowrite").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
