import { NextResponse } from "next/server";
import db from "@/db/db";

export async function POST(request: Request) {
  try {
    const { id, userId, customShelfName } = await request.json();

    if (!id || !userId || !customShelfName) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const book = await db.book.create({
      data: {
        id,
        userId,
        customShelfName,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("error creating the book:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
