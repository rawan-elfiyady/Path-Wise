const askGPT = require("../Services/OpenAiServices.js");
const express = require("express");
const router = express.Router();
const askGemini = require("../Services/GeminiServices.js");


router.post("/chatbot", async (req, res) => {
    try {
        const { message } = req.body;

        const reply = await askGPT.askGPT(message);

        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error communicating with AI" });
    }
});

router.post("/Gemini", async (req, res) => {
    try {
        const { message } = req.body;

        const reply = await askGemini(message);

        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error communicating with AI" });
    }
});

module.exports = router;