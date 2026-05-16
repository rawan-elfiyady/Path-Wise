const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const askGpt = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
  },
});

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const response = result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, something went wrong with AI.";
  }
};

module.exports = askGpt;