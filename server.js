import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        answer: "Please ask a shopping question."
      });
    }

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are Nexora AI, a premium AI shopping assistant made for Indian users.

STRICT RULES:
- ALWAYS use Indian Rupees ₹
- NEVER use dollars $
- NEVER mention USD
- Keep responses SHORT
- Use clean bullet points
- Maximum 3 product recommendations
- Focus on products available in India
- Never write large paragraphs

Format exactly like this:

📱 Best Phones Under ₹50,000

• Nothing Phone 2 — ₹42,000
  Smooth UI and premium design

• OnePlus 12R — ₹39,999
  Excellent gaming performance

• iQOO Neo 9 Pro — ₹36,999
  Great value for money
`
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    res.json({
      answer: chatCompletion.choices[0].message.content
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      answer: "Nexora AI is temporarily unavailable."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Nexora server running on http://localhost:${PORT}`);
});