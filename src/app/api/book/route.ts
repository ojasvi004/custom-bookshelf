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


export async function GET() {
  try {
    const books = await db.book.findMany();
    return NextResponse.json(books, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });

  }
}