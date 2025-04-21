import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        const client = await clientPromise;
        const db = client.db();
        const logosCollection = db.collection("logos");

        const logos = await logosCollection
            .find({ email })
            .sort({ createdAt: -1 })
            .toArray();

        const response = logos.map((logo) => ({
            image: logo.imageUrl,
            title: logo.title,
            desc: logo.desc,
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.error("Failed to fetch logos:", error);
        return NextResponse.json(
            { error: "Failed to fetch logos", detail: (error as Error).message },
            { status: 500 }
        );
    }
}
