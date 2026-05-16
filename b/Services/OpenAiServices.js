import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askGPT = async (message) => {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are a career recommendation assistant."
      },
      {
        role: "user",
        content: message
      }
    ],
  });

  return response.choices[0].message.content;
};