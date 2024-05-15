import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const slug = params.slug;
  const databarang = await prisma.databarang.findMany({
    where: {
      kode_barang: slug,
    },
  });

  if (databarang.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 400 });
  }

  try {
    const bahan = await prisma.bahanbarang.findMany({
      where: {
        kode_barang: slug,
      },
      include: {
        bahanbaku: true,
      },
    });

    bahan.map(async (item, i) => {
      await prisma.bahanbaku.update({
        where: { kode_bahan: item.bahanbaku[0].kode_bahan },
        data: {
          jumlah_satuan:
            item.bahanbaku[0].jumlah_satuan +
            databarang[0].stok * item.jumlah_bahan,
        },
      });
    });

    await prisma.bahanbarang.deleteMany({
      where: {
        kode_barang: slug,
      },
    });
    await prisma.databarang.deleteMany({
      where: {
        kode_barang: slug,
      },
    });
    return NextResponse.json({ msg: "berhasil menghapus" }, { status: 200 });
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
