import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;

if (!process.env.MONGODB_URI) {
     throw new Error("Please add your Mongo URI to .env.local");
}

client = new MongoClient(uri);
const clientPromise = await client.connect();

export default clientPromise;
