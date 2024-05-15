import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  try {
    const bahanbaku = await prisma.bahanbaku.findMany({
      where: {
        kode_bahan: res.kode_bahan,
      },
    });

    await prisma.bahanbaku.update({
      where: {
        kode_bahan: res.kode_bahan,
      },
      data: {
        jumlah_satuan: bahanbaku[0].jumlah_satuan + res.jumlah,
      },
    });

    await prisma.transaksimasuk.create({
      data: {
        jumlah: res.jumlah,
        harga: bahanbaku[0].harga * res.jumlah,
        kode_kasir: res.kode_kasir,
        kode_bahan: [res.kode_bahan],
      },
    });

    return NextResponse.json({ msg: "berhasil" }, { status: 200 });
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
