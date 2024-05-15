import { verifyJwt } from "@/app/api/middleware";
import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
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

  const slug = params.slug;
  try {
    const databarang = await prisma.databarang.findMany({
      where: {
        kode_barang: slug !== undefined ? slug[0] : slug,
      },
      include: {
        bahanbarang: {
          select: {
            bahanbaku: true,
            jumlah_bahan: true,
          },
        },
      },
    });

    return NextResponse.json({ databarang }, { status: 200 });
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
