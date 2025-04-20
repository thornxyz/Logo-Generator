import { GoogleGenAI } from "@google/genai";
import { LogoIdeasResponse } from "@/types";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function getResponse(
  prompt: string
): Promise<LogoIdeasResponse | null> {
  try {
    const model = "gemini-2.0-flash-exp-image-generation";
    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    const textPart = response?.candidates?.[0]?.content?.parts?.find(
      (part) => part.text
    );

    if (!textPart?.text) {
      console.error("No text output found in the response.");
      return null;
    }

    const rawJson = parseJsonResponse(textPart.text);
    return rawJson ? { rawJson } : null;
  } catch (error) {
    console.error("Error generating logo ideas:", error);
    return null;
  }
}

export function parseJsonResponse(responseText: string): any {
  let cleaned = responseText.trim();

  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/```(?:json)?/, "")
      .replace(/```$/, "")
      .trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}
