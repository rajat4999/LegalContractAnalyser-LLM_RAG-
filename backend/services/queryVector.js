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
 const query={
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true,
 };
 if(sessionId){
  query.filter = {
    sessionId:{ $eq: sessionId},
  };
}
 const result = await index.query(query);
  return result.matches || [];
}