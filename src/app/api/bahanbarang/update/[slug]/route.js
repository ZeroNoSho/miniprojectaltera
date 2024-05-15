import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const res = await request.json();
  const slug = params.slug;

  const bahanbarang = await prisma.bahanbarang.findMany({
    where: {
      kode_barang_bahan: slug,
    },
  });

  if (bahanbarang.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 404 });
  }

  try {
    await prisma.bahanbarang.update({
      where: {
        kode_barang_bahan: slug,
      },
      data: {
        kode_barang: res.kode_barang,
        kode_bahan: res.kode_bahan,
        jumlah_bahan: res.jumlah_bahan,
      },
    });
    return NextResponse.json({ msg: "berhasil update" }, { status: 200 });
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
