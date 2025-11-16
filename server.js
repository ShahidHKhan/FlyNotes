import express from "express";
import cors from "cors";
import notesRoute from "./routes/notes.js";
import askRoute from "./routes/ask.js";
import path from "path";
import { fileURLToPath } from "url";
import { verifyUser } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// 👉 Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

app.use("/notes", verifyUser, notesRoute);
app.use("/ask", verifyUser, askRoute);

app.listen(3000, () =>
  console.log("FlyNotes running on http://localhost:3000")
);
