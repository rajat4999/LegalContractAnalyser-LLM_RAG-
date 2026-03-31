import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const upload = multer({ dest: "uploads/" });

import { loadText } from "./utils/loadText.js";
import { chunkText } from "./utils/chunkText.js";
import { embedText } from "./services/embed.js";
import {index} from './config/pinecone.js'
import { searchVectors } from "./services/queryVector.js";
import { storeVectors } from "./services/storeVector.js";
import { askLLM } from "./agent/ragAgent.js";

const app = express();
app.use(cors());
app.use(express.json());

/*
   UPLOAD ROUTE
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const sessionId = uuidv4(); // ✅ NEW

    const filePath = req.file.path;
    const text = await loadText(filePath);

    console.log("Loaded text length:", text.length);

    const chunks = chunkText(text);
    console.log("Total chunks:", chunks.length);

    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await embedText(chunks[i]);

      if (!embedding || embedding.length === 0) {
        console.log("Embedding failed");
        continue;
      }

     

      vectors.push({
        id: `${sessionId}-chunk-${i}`, 
        // id: `chunk-${i}`,
        values: embedding,
        metadata: {
          text: chunks[i],
          sessionId: sessionId,     
          createdAt: Date.now(),    
        },
      });
    }

    console.log("Vectors created:", vectors.length);

    await storeVectors(vectors);

    /*  AUTO DELETE AFTER 10 MIN */
    setTimeout(async () => {
      try {
        await index.deleteMany({
          filter: {
            sessionId: { $eq: sessionId },
          },
        });
        console.log("Session deleted:", sessionId);
      } catch (err) {
        console.error("Auto delete failed:", err);
      }
    }, 10 * 60 * 1000);

    res.json({
      message: "Document indexed successfully",
      chunks: chunks.length,
      sessionId, 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Indexing failed",
    });
  }
});

/* 
   QUERY ROUTE
 */
app.post("/query", async (req, res) => {
  try {
    const { question, language, sessionId } = req.body;

    const finalLanguage = language || "English";

    const queryEmbedding = await embedText(
      `Translate to English: ${question}`
    );

    const results = await searchVectors(queryEmbedding, sessionId); //  UPDATED

    const source = results.map((r) => r.metadata.text);
    const context = source.join("\n");

    const result = await askLLM(
      question,
      context,
      finalLanguage
    );

    res.json({
      answer: result.answer,
      clauses: result.clauses,
      source,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Query failed",
    });
  }
});

/* 
   SERVER START
 */
app.listen(3000, () => {
  console.log("Legal AI backend running on http://localhost:3000");
});