import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// Save a note for the logged-in user
router.post("/", async (req, res) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ error: "Note is required" });

    const userId = req.user.uid;          // ⬅ Comes from verifyUser middleware
    const date = new Date().toISOString().split("T")[0];

    const ref = db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(date);

    const docSnap = await ref.get();

    let data = { date, notes: [] };

    if (docSnap.exists) {
      data = docSnap.data();
    }

    data.notes.push(note);

    await ref.set(data);

    res.json({ message: "saved", date });

  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// List all note dates for this user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .get();

    const dates = snapshot.docs.map((doc) => doc.id);

    res.json(dates);

  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Failed to load notes" });
  }
});

export default router;
