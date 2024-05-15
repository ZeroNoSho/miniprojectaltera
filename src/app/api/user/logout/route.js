import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request, { params }) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  console.log(refreshToken);
  if (!refreshToken) return NextResponse.json({status:204});

  const user = await prisma.user.findMany({
    where: {
      refresh_token: refreshToken.value,
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

  if (!user[0]) return NextResponse.status(204);
  const useId = user[0].id;

  try {
    await prisma.user.update({
      where: {
        id: useId,
      },
      data: {
        refresh_token: "",
      },
    });

    cookies().delete("refreshToken");
    return NextResponse.json(
      { msg: "berhasil logout" },
      {
        headers: {
          status: 200,
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
