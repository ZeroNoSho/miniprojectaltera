import { verifyJwt } from "@/app/api/middleware";
import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  const slug = params.slug;
  try {
    const bahanbarang = await prisma.bahanbarang.findMany({
      where: {
        kode_barang_bahan: {
          contains: slug !== undefined ? slug[0] : slug,
        },
      },
      include: {
        bahanbaku: true,
      },
    });

    return NextResponse.json({ bahanbarang }, { status: 200 });
  } catch (error) {
    NextResponse.json({ msg: "error" }, { status: 400 });
  }
}
