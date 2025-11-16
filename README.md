✈️ FlyNotes – AI-Powered Meeting Notes Assistant for Teams

FlyNotes is a secure, AI-driven meeting assistant built to help managers, executives, and secretarial staff store meeting notes and retrieve important information instantly.
With user authentication, cloud-backed note storage, and local AI search powered by Llama3, FlyNotes gives teams immediate answers to questions about past meetings — without scrolling through documents.

🌟 Features
🧑‍💼 Built for Business Teams

FlyNotes supports real organizational workflows:

Managers needing quick access to decisions

Secretaries recording daily meeting notes

Executives reviewing action items

Teams collaborating on shared business knowledge

🔐 Secure User Accounts

Email/Password authentication (Firebase Auth)

Protected backend routes

Individual user data isolation

Local tokens for secure sessions

🗂 Organized Meeting Notes

Notes automatically group by date and user, powered by Firestore.
Perfect for storing:

Meeting summaries

Action items

Client discussions

Daily updates

🤖 AI-Powered Meeting Search (RAG)

Ask natural questions like:

“When is my next meeting with Ali?”

“What did we decide about the budget plan?”

“What tasks were assigned last Thursday?”

FlyNotes’ custom RAG pipeline:

Fetches user notes

Splits text into vector chunks

Generates embeddings using Ollama (all-minilm)

Retrieves relevant meeting info

Produces clear answers using Llama3

🔍 Instant Retrieval

No more digging through documents — find decisions in seconds.

🔒 Private & Free (Local AI)

FlyNotes uses 100% local inference through Ollama:

No API usage fees

No cloud LLM data exposure

Enterprise-friendly privacy

🏗️ Tech Stack
Frontend

HTML, CSS

Firebase Web SDK

JS modules

Backend

Node.js + Express

Firebase Admin SDK

LangChain.js

Ollama (Llama3 + Embedding model)

Custom RAG retrieval pipeline

Database

Firebase Firestore
