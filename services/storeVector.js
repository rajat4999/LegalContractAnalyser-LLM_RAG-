


import { index } from "../config/pinecone.js";

export async function storeVectors(vectors) {

  if (!vectors || vectors.length === 0) {
    console.log("No vectors to store");
    return;
  }

  await index.upsert({
    records: vectors
  });

  console.log("Vectors stored successfully");
}