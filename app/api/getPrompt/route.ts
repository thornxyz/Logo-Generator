import { getResponse } from "@/configs/geminiResponse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  try {
    const result = await getResponse(prompt);
    return NextResponse.json(result?.rawJson || {});
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: error.message });
  }
}
