import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  try {
    const databarang = await prisma.databarang.findMany({
      where: {
        kode_barang: res.kode_barang,
      },
    });

    if (databarang[0].stok - res.jumlah < 0) {
      return NextResponse.json({ msg: "barang tidak cukup" }, { status: 400 });
    }

    await prisma.transaksikeluar.create({
      data: {
        jumlah: res.jumlah,
        harga: databarang[0].harga * res.jumlah,
        kode_kasir: res.kode_kasir,
        kode_barang: [res.kode_barang],
      },
    });

    const transaksi = await prisma.transaksikeluar.findMany();


    await prisma.databarang.update({
      where: {
        kode_barang: res.kode_barang,
      },
      data: {
        stok: databarang[0].stok - res.jumlah,
        kode_transaksi: [
          ...databarang[0].kode_transaksi,
          transaksi[transaksi.length - 1].kode_transaksi,
        ],
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
