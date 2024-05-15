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
    const dataproduksi = await prisma.dataproduksi.findMany({
      where: {
        kode_barang: {
          hasEvery: slug !== undefined ? [slug[0]] : [],
        },
      },

      include: {
        databarang: {
          include: {
            bahanbarang: true,
          },
        },
      },
    });

    return NextResponse.json({ dataproduksi }, { status: 200 });
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
