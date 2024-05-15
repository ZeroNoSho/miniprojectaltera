import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  const databarang = await prisma.databarang.findMany({
    where: {
      nama_barang: res.nama,
    },
  });
  if (databarang.length !== 0) {
    return NextResponse.json({ msg: "sudah ada" }, { status: 400 });
  }
  try {
    await prisma.databarang.create({
      data: {
        nama_barang: res.nama,
        stok: res.stok,
        satuan: res.satuan,
        harga: res.harga,
      },
    });

    const databarang2 = await prisma.databarang.findMany();

    const kode = JSON.parse(res.kode);

    const dataBaru = await kode.map((item) => {
      return {
        kode_barang: databarang2[databarang2.length - 1].kode_barang,
        kode_bahan: [item.kode_bahan],
        jumlah_bahan: item.jumlah_bahan,
      };
    });

    await prisma.bahanbarang.createMany({
      data: dataBaru,
    });

    const dataBaru1 = await kode.map((item) => {
      return item.kode_bahan;
    });

    const ret = await prisma.bahanbaku.findMany({
      where: {
        kode_bahan: { in: dataBaru1 },
      },
    });

    ret.map(async (item, i) => {
      await prisma.bahanbaku.update({
        where: { kode_bahan: item.kode_bahan },
        data: {
          jumlah_satuan:
            item.jumlah_satuan - res.stok * dataBaru[i].jumlah_bahan,
        },
      });
    });



    return NextResponse.json({ msg: "success" }, { status: 200 });
  } catch (error) {
    NextResponse.json({ msg: "error" }, { status: 400 });
  }
}
