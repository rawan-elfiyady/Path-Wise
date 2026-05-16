const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCJAtHZTZM0UFSwzzbDrkm04dLPqO17Tmo");

async function test() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

  const result = await model.generateContent("Say hello");
  console.log(await result.response.text());
}

test();