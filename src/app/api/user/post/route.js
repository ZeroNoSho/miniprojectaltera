import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const res = await request.json();
  const user = await prisma.user.findMany({
    where: {
      email: res.email,
    },
  });

  if (user.length !== 0) {
    return NextResponse.json(
      { msg: "Ganti email lain" },
      {
        status: 400,
      }
    );
  }

  if (res.password !== res.confpass) {
    return NextResponse.status(400).json({
      msg: "password tidak sama dengan confirm",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(res.password, salt);

  try {
    await prisma.user.create({
      data: {
        name: res.name,
        email: res.email,
        password: hashPassword,
        refresh_token: "",
      },
    });

    return NextResponse.json(
      { msg: "registrasi berhasil" },
      {
        status: 200,
      },
      {
        headers: {
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  } catch (error) {
    NextResponse.json(
      { msg: "error" },
      {
        headers: {
          status: 400,
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  }
}
