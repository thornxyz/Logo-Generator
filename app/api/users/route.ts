import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return NextResponse.json(existingUser);
        }

        const userDoc = {
            name,
            email,
            createdAt: new Date(),
        };

        await usersCollection.insertOne(userDoc);

        return NextResponse.json(userDoc);
    } catch (error) {
        console.error('Error storing user info:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
