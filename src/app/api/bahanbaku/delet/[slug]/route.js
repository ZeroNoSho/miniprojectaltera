import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const slug = params.slug;
  const bahanbaku = await prisma.bahanbaku.findMany({
    where: {
      kode_bahan: slug,
    },
  });

  if (bahanbaku.length === 0) {
    return NextResponse.json({ msg: "No data" }, { status: 400 });
  }

  try {
    await prisma.bahanbaku.deleteMany({
      where: {
        kode_bahan: slug,
      },
    });
    return NextResponse.json({ msg: "berhasil menghapus" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
}
