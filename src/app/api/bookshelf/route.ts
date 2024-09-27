import db from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { bookshelfName, userId } = await request.json();

    const checkBookshelfName = await db.customShelf.findFirst({
      where: { name: bookshelfName, userId },
    });

    if (checkBookshelfName) {
      return NextResponse.json(
        { error: "bookshelf name already exists" },
        { status: 409 }
      );
    }

    const bookshelf = await db.customShelf.create({
      data: {
        name: bookshelfName,
        userId,
      },
    });

    console.log(bookshelf);

    return NextResponse.json(
      { message: "bookshelf created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const userId = await request.json();
    const bookshelves = await db.customShelf.findMany({ where: { userId } });
    return NextResponse.json(bookshelves, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
