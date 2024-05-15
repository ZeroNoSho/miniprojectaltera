import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const slug = params.slug;
  const transaksikeluar = await prisma.transaksikeluar.findMany({
    where: {
      kode_transaksi: slug,
    },
    include: {
      databarang: true,
    },
  });
  const databarang = await prisma.databarang.findMany({
    where: {
      kode_barang: transaksikeluar[0].kode_barang[0],
    },
  });

  if (transaksikeluar.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 400 });
  }

  const newkode_transaksi = databarang[0].kode_transaksi.filter(
    (item) => item !== slug
  );
  
  try {
    await prisma.databarang.update({
      where: {
        kode_barang: transaksikeluar[0].kode_barang[0],
      },
      data: {
        kode_transaksi: newkode_transaksi,
        stok: transaksikeluar[0].databarang[0].stok + transaksikeluar[0].jumlah,
      },
    });

    await prisma.transaksikeluar.deleteMany({
      where: {
        kode_transaksi: slug,
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
