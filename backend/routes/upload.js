import express from "express";
import multer from "multer";
import fs from "fs";

import { loadText } from "../utils/loadText.js";
import { chunkText } from "../utils/chunkText.js";
import { embedText } from "../services/embed.js";
import { storeVectors } from "../services/storeVector.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {

    const filePath = req.file.path;

    const text = await loadText(filePath);
    console.log("Text length:", text.length)
    const chunks = chunkText(text);
    console.log("Chunks:", chunks.length)
   console.log("Chunks created:", chunks.length);
    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {

      const embedding = await embedText(chunks[i]);
      vectors.push({
        // id: `chunk-${i}`,
        id: `doc-${Date.now()}-${i}`,
        values: embedding,
        metadata: {
          text: chunks[i]
        }
      });

    }

    await storeVectors(vectors);

    fs.unlinkSync(filePath);

    res.json({
      message: "Document processed successfully",
      chunks: chunks.length
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Processing failed"
    });

  }
});

export default router;