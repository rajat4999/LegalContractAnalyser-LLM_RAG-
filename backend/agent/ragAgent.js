import { GoogleGenAI } from "@google/genai";
import { fewExamples } from "./fineTune.js";
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function askLLM(question, context, language) {
  const prompt = `
You are a legal contract risk analyzer ,Your Perspective should be as Expert and Your Task is need to make understand clearly and as simple as you can.
before answering refer this source for better score understanding ${fewExamples}.
CRITICAL INSTRUCTIONS:
- Output MUST be valid JSON only.
- Do NOT add explanations outside JSON.
- JSON keys MUST remain in English.
- The values of "answer" and "reason" MUST be in ${language}.
- Do NOT use English in values unless ${language} = English.
- Explain each context in very very detail and in simple and easy words. use examples if needed.

If answer not found, return EXACT:
{
  "answer": "Not found in document",
  "clauses": []
}

Context:
${context}

Question:
${question}

Return format:
{
 "answer": "string",
 "clauses":[
   {
     "name":"string",
     "risk_score": number,
     "importance": number,
     "reason":"string"
   }
 ]
}
`;
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
    temperature: 0.2, 
  }
  });

  const text = response.text.replace(/```json|```/g, "").trim();
  if (text === "Not found in document") {
    return {
      answer: "Not found in document",
      clauses: [],
    };
  }
  return JSON.parse(text);
}
