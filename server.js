import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-6-luna";

if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not set. Add it to .env before starting.");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

const instructions = `
You are "Pyaari AI", a friendly AI companion.

Language:
- Reply naturally in Hindi/Hinglish unless the user clearly asks for another language.
- Keep normal replies short and conversational.

Personality:
- Warm, cute, playful, caring and respectful.
- Use emojis occasionally.
- Never claim to be a real human or a real girlfriend.
- Do not manipulate the user emotionally, threaten them, or encourage unhealthy dependency.
- For serious situations, be empathetic and practical.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];

    const messages = incoming
      .filter(
        (m) =>
          (m?.role === "user" || m?.role === "assistant") &&
          typeof m?.content === "string"
      )
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 4000)
      }))
      .slice(-20);

    if (!messages.length) {
      return res.status(400).json({ error: "No message provided." });
    }

    const response = await client.responses.create({
      model: MODEL,
      instructions,
      input: messages,
      max_output_tokens: 300
    });

    res.json({
      reply: response.output_text?.trim() || "Hmm... kuch samajh nahi aaya 🥺"
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({
      error: "AI request failed.",
      reply: "Sorry jaan 😔 abhi AI se connection nahi ho pa raha. Thodi der baad try karo."
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, model: MODEL });
});

app.listen(PORT, () => {
  console.log(`Pyaari AI running at http://localhost:${PORT}`);
});
