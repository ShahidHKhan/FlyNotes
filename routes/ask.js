import express from "express";
import { NotesRag } from "../rag/NotesRag.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Missing input" });

    // ⬅ User ID provided by verifyUser middleware
    const userId = req.user.uid;

    // Build a fresh RAG instance for this user
    const rag = new NotesRag(userId);

    // Load this user's notes from Firestore & build embeddings
    await rag.indexNotes();

    const chain = await rag.createChain();

    const response = await chain.invoke({ input });

    res.json({
      answer: response.answer,
      context: response.context,
    });

  } catch (err) {
    console.error("Ask route error:", err);
    res.status(500).json({ error: "Failed to process request" });
  }
});

export default router;
