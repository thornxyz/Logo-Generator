import { GoogleGenAI } from "@google/genai";
import { LogoIdea, LogoIdeasResponse } from "@/types";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateLogoIdeas(
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

    let cleaned = textPart.text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned
        .replace(/```(?:json)?/, "")
        .replace(/```$/, "")
        .trim();
    }

    const rawJson = JSON.parse(cleaned);

    return { rawJson };
  } catch (error) {
    console.error("Error generating logo ideas:", error);
    return null;
  }
}
