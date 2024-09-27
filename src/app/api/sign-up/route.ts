import db from "@/db/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import z from "zod";

const userSchema = z.object({
  username: z.string().min(3, "username must be at least 3 chars long"),
  email: z.string().email("invalid email address"),
  password: z.string().min(4, "password must be at least 4 chars long"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "invalid input" }, { status: 400 });
    }
    const { username, email, password } = result.data;

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists with this email or username" },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("error creating user:", error);
    return NextResponse.json(
      { error: "failed to register user" },
      { status: 500 }
    );
  }
}
