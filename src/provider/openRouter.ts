import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const llmClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function sendMessageToModel(message: string) {
  try {
    const response = await llmClient.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "system",
          content: message,
        },
      ],
    });

    response.choices;

    console.log("Response from model:", response?.choices[0]?.message);
    return response?.choices[0]?.message;
  } catch (error) {
    console.error("Error sending message to model:", error);
    throw error;
  }
}
