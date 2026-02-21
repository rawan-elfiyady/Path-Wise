const axios = require("axios");


async function getAIRecommendation(data) {
    try {
        const response = await axios.post(
            `${process.env.AI_SERVICE_URL}/predict`,
            data,
            { timeout: 5000 }
        );

        return response.data;

    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new Error("AI service unavailable");
    }
}

module.exports = { getAIRecommendation };