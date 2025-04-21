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

        const logosCollection = db.collection("logos");
        const result = await logosCollection.insertOne({
            email,
            title,
            desc,
            imageUrl,
            createdAt: new Date(),
        });

        if (!result.insertedId) {
            return NextResponse.json(
                { error: "Failed to save logo" },
                { status: 500 }
            );
        }

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error("Image generation or DB insert failed:", error);
        return NextResponse.json(
            {
                error: "Failed to generate image or save to DB",
                detail: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
