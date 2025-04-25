import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { generateImage } from "@/configs/geminiResponse";
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    secure: true
});

export async function POST(req: Request) {
    try {
        const { prompt, email, title, desc } = await req.json();

        // Generate the image
        const base64Data = await generateImage(prompt);
        if (!base64Data) {
            return NextResponse.json(
                { error: "Image generation failed" },
                { status: 500 }
            );
        }

        // Convert base64 to data URL
        const imageDataUrl = `data:image/png;base64,${base64Data}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imageDataUrl, {
            folder: "logos",
            use_filename: true,
            unique_filename: true,
        });

        const client = await clientPromise;
        const db = client.db();

        const logosCollection = db.collection("logos");
        const result = await logosCollection.insertOne({
            email,
            title,
            desc,
            imageUrl: uploadResponse.secure_url,
            cloudinaryPublicId: uploadResponse.public_id,
            createdAt: new Date(),
        });

        if (!result.insertedId) {
            return NextResponse.json(
                { error: "Failed to save logo" },
                { status: 500 }
            );
        }

        return NextResponse.json({ 
            imageUrl: uploadResponse.secure_url,
            publicId: uploadResponse.public_id 
        });
    } catch (error) {
        console.error("Image generation, upload, or DB insert failed:", error);
        return NextResponse.json(
            {
                error: "Failed to process image or save to DB",
                detail: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
