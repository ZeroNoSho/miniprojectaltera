import { verifyJwt } from "@/app/api/middleware";
import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const slug = params.slug;
  try {
    const bahanbaku = await prisma.bahanbaku.findMany({
      where: {
        kode_bahan: slug !== undefined ? slug[0] : slug,
      },
    });

    return NextResponse.json({ bahanbaku }, { status: 200 });
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
