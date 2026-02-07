import express from "express";
import dotenv from "dotenv";
import { sendTelegramMessage } from "./telegram.js";

dotenv.config();

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.send("Deploy Notifier API is running");
});

app.get("/test", async (req, res) => {
    try {
        await sendTelegramMessage("Test message from Deploy Notifier!");

        res.send("Message sent to Telegram 🚀");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send message");
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
