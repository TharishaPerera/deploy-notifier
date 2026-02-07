import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { authMiddleware } from "./middleware/auth.js";
import { sendTelegramMessage } from "./telegram.js";
import type { NotifyPayload } from "./types/notify.js";
import { formatMessage } from "./utils/formatter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Deploy Notifier API is running");
});

app.get("/test", authMiddleware, async (req: Request, res: Response) => {
  try {
    await sendTelegramMessage("Test message from Deploy Notifier!");
    res.send("Message sent to Telegram");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message");
  }
});

app.post("/notify", authMiddleware, async (req, res) => {
  try {
    const data = req.body as NotifyPayload;

    if (!data.project || !data.status) {
      return res.status(400).json({
        error: "Missing required fields: project, status",
      });
    }

    const message = formatMessage(data);
    await sendTelegramMessage(message);

    res.json({ success: true });
  } catch (err) {
    console.error("Notify error:", err);
    res.status(500).json({ error: "Notification failed" });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
