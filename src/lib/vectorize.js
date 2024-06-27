import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config();

// export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const vectorize = async (text) => {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const embeddingResponse = await model.embedContent(text);
  const vector = embeddingResponse.embedding;
  console.log(vector.values); // the embedding as a vector;

  return vector.values;
};
