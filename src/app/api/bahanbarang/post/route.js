import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  const bahanbarang = await prisma.bahanbarang.findMany({
    where: {
      AND: [{ kode_bahan: res.kode_bahan }, { kode_barang: res.kode_barang }],
    },
  });

  if (bahanbarang.length !== 0) {
    return NextResponse.json({ msg: "sudah ada" }, { status: 400 });
  }
  
  try {
    await prisma.bahanbarang.create({
      data: {
        kode_barang: res.kode_barang,
        kode_bahan: res.kode_bahan,
        jumlah_bahan: res.jumlah_bahan,
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
