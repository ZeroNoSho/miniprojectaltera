import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/app/api/middleware";

export async function GET(request) {
  const accessToken = request.headers.get("authorization")?.split(" ")[1];
  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const transaksikeluar = await prisma.transaksikeluar.findMany({
      include: {
        databarang: true,
      },
    });

    return NextResponse.json({ transaksikeluar }, { status: 200 });
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
