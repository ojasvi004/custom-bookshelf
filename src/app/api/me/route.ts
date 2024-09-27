import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";

export async function GET(request: NextRequest) {
  try {
    const userId = (await getDataFromToken(request)) as string;
    const user = await db.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        password: false,
        books: true,
        shelves: true,
      },
    });
    return NextResponse.json({ message: "user found", data: user });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
