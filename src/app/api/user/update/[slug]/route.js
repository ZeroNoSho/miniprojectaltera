import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(request, { params }) {
  const res = await request.json();
  const slug = params.slug;

  const user = await prisma.user.findMany({
    where: {
      id: slug,
    },
  });

  if (user.length === 0) {
    return NextResponse.json(
      { msg: "No data" },
      {
        headers: {
          status: 404,
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  }

  const match = await bcrypt.compare(res.passwordold, user[0].password);

  if (!match) {
    return NextResponse.json(
      { msg: "Wrong Password" },
      {
        headers: {
          status: 400,
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(res.passwordnew, salt);

  try {
    await prisma.user.update({
      where: {
        id: slug,
      },
      data: {
        name: res.name,
        email: res.email,
        password: hashPassword,
      },
    });
    return NextResponse.json(
      { msg: "berhasil update" },
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
