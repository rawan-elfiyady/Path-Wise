const axios = require("axios");
require("dotenv").config();

async function getModels() {
  try {
    const response = await axios.get(
      "https://generativelanguage.googleapis.com/v1/models",
      {
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    console.log("AVAILABLE MODELS:\n");

    response.data.models.forEach((m) => {
      console.log(m.name);
      console.log(m.supportedGenerationMethods);
      console.log("------");
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

getModels();