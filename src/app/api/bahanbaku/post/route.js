import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  const bahanbaku = await prisma.bahanbaku.findMany({
    where: {
      nama_bahan: res.nama,
    },
  });
  if (bahanbaku.length !== 0) {
    return NextResponse.json({ msg: "sudah ada" }, { status: 400 });
  }
  try {
    await prisma.bahanbaku.create({
      data: {
        nama_bahan: res.nama,
        satuan: res.satuan,
        jumlah_satuan: res.jumlah_satuan,
        harga: res.harga,
        biaya_penyimpanan: res.biaya_penyimpanan,
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
