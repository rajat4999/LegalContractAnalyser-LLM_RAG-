// import { index } from "../config/pinecone.js";

// export async function searchVectors(vector,) {
//   const result = await index.query({
//     vector: vector,
//     topK: 5,
//     includeMetadata: true,
//   });

//   return result.matches;
// }

import {index} from '../config/pinecone.js'

export async function searchVectors(queryEmbedding, sessionId) {
  const res = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
    filter: {
      sessionId: { $eq: sessionId },
    },
  });

  return res.matches || [];
}