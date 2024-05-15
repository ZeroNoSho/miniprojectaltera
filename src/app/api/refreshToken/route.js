import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findMany({
      where: {
        refresh_token: refreshToken.value,
      },
    });

    if (!user[0]) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(refreshToken.value, process.env.REFRESH_TOKEN_SECRET);

    const UserId = user[0].id;
    const email = user[0].email;
    const name = user[0].name;

    const accessToken = jwt.sign(
      { UserId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
}
