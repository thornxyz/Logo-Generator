import { GoogleGenAI, Modality } from "@google/genai";
import { LogoIdeasResponse } from "@/types";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
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

function parseJsonResponse(responseText: string): any {
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

export async function generateImage(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData?.data) {
        return part.inlineData.data;
      }
    }
    console.log("Response parts:", parts);
    console.error("No image data found in the response.");
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
