import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();
  try {
    const isidatabarang = await prisma.databarang.findMany({
      where: {
        kode_barang: res.kode_barang,
      },
      include: {
        bahanbarang: {
          select: {
            bahanbaku: true,
            jumlah_bahan: true,
          },
        },
      },
    });

    const bahanBakuArray = isidatabarang[0].bahanbarang.map((item) => [
      item.bahanbaku[0],
      {
        jumlah_asli:
          item.bahanbaku[0].jumlah_satuan -
            res.jumlah_produksi * item.jumlah_bahan <
          0
            ? "bahan tidak cukup"
            : item.bahanbaku[0].jumlah_satuan -
              res.jumlah_produksi * item.jumlah_bahan,
      },
    ]);

    let name = "";
    const isBahanTidakCukup = bahanBakuArray.some((element) => {
      name = element[0].nama_bahan;
      return element[1].jumlah_asli === "bahan tidak cukup";
    });

    if (isBahanTidakCukup) {
      return NextResponse.json(
        { msg: `bahan ${name} tidak cukup` },
        { status: 404 }
      );
    }

    await prisma.dataproduksi.create({
      data: {
        kode_barang: [res.kode_barang],
        jumlah_produksi: res.jumlah_produksi,
      },
    });

    await prisma.databarang.update({
      where: {
        kode_barang: res.kode_barang,
      },
      data: {
        stok: res.jumlah_produksi + isidatabarang[0].stok,
      },
    });

    await Promise.all(
      bahanBakuArray.map(async (e) => {
        await prisma.bahanbaku.update({
          where: {
            kode_bahan: e[0].kode_bahan,
          },
          data: { jumlah_satuan: e[1].jumlah_asli },
        });
      })
    );

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
