import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(connectionString);
  console.error(e);
}

let db = conn.db("movie-review-api-db");

export default db;