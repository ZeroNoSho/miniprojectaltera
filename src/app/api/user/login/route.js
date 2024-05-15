import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const res = await request.json();
  try {
    const user = await prisma.user.findMany({
      where: {
        email: res.email,
      },
    });

    if (user.length === 0) {
      return NextResponse.json(
        { msg: "Wrong Password or Email" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(res.password, user[0].password);
    if (!match) {
      return NextResponse.json(
        { msg: "Wrong Password or Email" },
        { status: 400 }
      );
    }

    const UserId = user[0].id;
    const email = user[0].email;
    const name = user[0].name;

    const accessToken = jwt.sign(
      { UserId, email, name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { UserId, email, name },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await prisma.user.update({
      where: {
        id: UserId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    const cookieStore = cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Mengubah maxAge menjadi detik
      secure: true, // set to true if your using https or samesite is none
      sameSite: "none",
    });

    return NextResponse.json(
      { accessToken },
      {
        headers: {
          status: 200,
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  } catch (error) {
    NextResponse.json(
      { msg: "error" },
      { status: 400 },
      {
        headers: {
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  }
}
