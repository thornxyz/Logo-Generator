import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { generateImage } from "@/configs/geminiResponse";

export async function POST(req: Request) {
    try {
        const { prompt, email, title, desc } = await req.json();

        const base64Data = await generateImage(prompt);
        if (!base64Data) {
            return NextResponse.json(
                { error: "Image generation failed" },
                { status: 500 }
            );
        }

        const imageUrl = `data:image/png;base64,${base64Data}`;

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("users");

        const updateResult = await collection.updateOne(
            { email },
            {
                $set: {
                    title,
                    desc,
                    imageUrl,
                },
            }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { error: "User not found or no update made" },
                { status: 404 }
            );
        }

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error("Image generation or DB update failed:", error);
        return NextResponse.json(
            {
                error: "Failed to generate image or update DB",
                detail: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
