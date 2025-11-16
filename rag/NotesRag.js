import { fileURLToPath } from "url";
import path from "path";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Ollama } from "@langchain/ollama";
import { OllamaEmbeddings } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

// Firestore (admin SDK)
import { db } from "../firebase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NotesRag {
  constructor(userId) {
    this.userId = userId; // ⬅ Store the logged-in user's UID
    this.llm = new Ollama({ model: "llama3" });
    this.embeddings = new OllamaEmbeddings({ model: "all-minilm:latest" });
  }

  // Load notes from Firestore for this user only
  async indexNotes() {
    const documents = [];

    // path: users/{uid}/notes/
    const notesRef = db
      .collection("users")
      .doc(this.userId)
      .collection("notes");

    const snapshot = await notesRef.get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      const { date, notes } = data;

      for (const note of notes) {
        documents.push({
          pageContent: note,
          metadata: { date, source: doc.id },
        });
      }
    });

    if (documents.length === 0) return;

    const splitter = new CharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const chunks = await splitter.splitDocuments(documents);

    this.vectorStore = await MemoryVectorStore.fromDocuments(
      chunks,
      this.embeddings
    );
  }

  async createChain() {
    const prompt = ChatPromptTemplate.fromTemplate(`
You are an AI assistant. Answer ONLY using the notes provided.

Context:
{context}

Question: {input}

Answer:
`);

    const combine = await createStuffDocumentsChain({
      llm: this.llm,
      prompt,
    });

    const retriever = this.vectorStore.asRetriever({ k: 5 });

    const chain = await createRetrievalChain({
      retriever,
      combineDocsChain: combine,
    });

    return chain;
  }
}
