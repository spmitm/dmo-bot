import dotenv from "dotenv";
import express from "express";
import { buildReply } from "./bot.js";
import { listSessions } from "./sessionStore.js";
import { sendWhatsAppText } from "./whatsapp.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    project: "DMO bot",
    status: "running",
    webhook: "/webhook",
    sessions: listSessions().length
  });
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.status(403).send("Verification failed");
});

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const entries = req.body.entry || [];

    for (const entry of entries) {
      const changes = entry.changes || [];

      for (const change of changes) {
        const value = change.value || {};
        const messages = value.messages || [];

        for (const message of messages) {
          if (message.type !== "text") {
            continue;
          }

          const from = message.from;
          const text = message.text?.body || "";
          const reply = buildReply(from, text);
          await sendWhatsAppText(from, reply);
        }
      }
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`DMO bot is running on port ${port}`);
});
