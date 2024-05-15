import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const slug = params.slug;
  const dataproduksi = await prisma.dataproduksi.findMany({
    where: {
      kode_produksi: slug,
    },
    include: {
      databarang: {
        include: {
          bahanbarang: {
            include: {
              bahanbaku: true,
            },
          },
        },
      },
    },
  });

  if (dataproduksi.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 400 });
  }

  const bahanBakuArray = dataproduksi[0].databarang[0].bahanbarang.map(
    (item) => [
      {
        kode_bahan: item.bahanbaku[0].kode_bahan,
        jumlah_satuan: item.bahanbaku[0].jumlah_satuan,
        jumlah_produksi_bahan:
          dataproduksi[0].jumlah_produksi * item.jumlah_bahan,
      },
    ]
  );

  const databarangArry = {
    kode_barang: dataproduksi[0].kode_barang[0],
    stok: dataproduksi[0].databarang[0].stok,
    jumlah_produksi_barang: dataproduksi[0].jumlah_produksi,
  };

  try {
    await prisma.dataproduksi.delete({
      where: {
        kode_produksi: slug,
      },
    });
    await prisma.databarang.update({
      where: {
        kode_barang: databarangArry.kode_barang,
      },
      data: {
        stok: databarangArry.stok - databarangArry.jumlah_produksi_barang,
      },
    });
    await Promise.all(
      bahanBakuArray.map(async (e) => {
        await prisma.bahanbaku.update({
          where: {
            kode_bahan: e[0].kode_bahan,
          },
          data: {
            jumlah_satuan: e[0].jumlah_satuan + e[0].jumlah_produksi_bahan,
          },
        });
      })
    );

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
