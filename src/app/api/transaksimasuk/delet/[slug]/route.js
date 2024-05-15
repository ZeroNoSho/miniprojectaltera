import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const slug = params.slug;
  const transaksimasuk = await prisma.transaksimasuk.findMany({
    where: {
      kode_transaksi: slug,
    },
    include: {
      bahanbaku: true,
    },
  });

  if (transaksimasuk.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 400 });
  }

  try {
    await prisma.bahanbaku.update({
      where: {
        kode_bahan: transaksimasuk[0].kode_bahan[0],
      },
      data: {
        jumlah_satuan:
          transaksimasuk[0].bahanbaku[0].jumlah_satuan -
          transaksimasuk[0].jumlah,
      },
    });

    await prisma.transaksimasuk.deleteMany({
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
