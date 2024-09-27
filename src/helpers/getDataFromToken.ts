import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

      if (!token) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
      return token.id;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
};
