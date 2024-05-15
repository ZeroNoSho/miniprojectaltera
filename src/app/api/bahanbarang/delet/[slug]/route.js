import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const slug = params.slug;
  const bahanbarang = await prisma.bahanbarang.findMany({
    where: {
      kode_barang_bahan: slug,
    },
  });

  if (bahanbarang.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 400 });
  }

  try {
    await prisma.bahanbarang.delete({
      where: {
        kode_barang_bahan: slug,
      },
    });
    return NextResponse.json({ msg: "berhasil delet" }, { status: 200 });
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
