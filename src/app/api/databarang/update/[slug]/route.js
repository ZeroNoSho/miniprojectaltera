import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const res = await request.json();
  const slug = params.slug;

  const databarang = await prisma.databarang.findMany({
    where: {
      kode_barang: slug,
    },
  });

  if (databarang.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 404 });
  }

  try {
    await prisma.databarang.update({
      where: {
        kode_barang: slug,
      },
      data: {
        nama_barang: res.nama,
        stok: res.stok,
        satuan: res.satuan,
        harga: res.harga,
      },
    });

    await prisma.bahanbarang.deleteMany({
      where: {
        kode_barang: slug,
      },
    });

    const kode = JSON.parse(res.kode);
    const dataBaru = await kode.map((item) => {
      return {
        kode_barang: slug,
        kode_bahan: [item.kode_bahan],
        jumlah_bahan: item.jumlah_bahan,
      };
    });

    await prisma.bahanbarang.createMany({
      data: dataBaru,
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
