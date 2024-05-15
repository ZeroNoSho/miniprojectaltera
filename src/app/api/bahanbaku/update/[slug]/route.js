import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const res = await request.json();
  const slug = params.slug;

  const bahanbaku = await prisma.bahanbaku.findMany({
    where: {
      kode_bahan: slug,
    },
  });

  if (bahanbaku.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 404 });
  }

  try {
    await prisma.bahanbaku.update({
      where: {
        kode_bahan: slug,
      },
      data: {
        nama_bahan: res.nama,
        satuan: res.satuan,
        jumlah_satuan: res.jumlah_satuan,
        harga: res.harga,
        biaya_penyimpanan: res.biaya_penyimpanan,
      },
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
