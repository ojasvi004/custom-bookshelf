import db from "@/db/db";
import { NextResponse } from "next/server";
import z from "zod";

const bookshelfSchema = z
  .string()
  .min(3, "name must be at least 3 chars long")
  .max(15);

export async function POST(request: Request) {
  try {
    const { bookshelfName, userId } = await request.json();
    const result = bookshelfSchema.safeParse(bookshelfName);
    if (!result.success) {
      return NextResponse.json({ error: "invalid input" }, { status: 400 });
    }

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

export async function DELETE(request: Request) {
  try {
    const { bookshelfId } = await request.json();
    const response = await db.customShelf.delete({
      where: { id: bookshelfId },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("error deleting bookshelf:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
