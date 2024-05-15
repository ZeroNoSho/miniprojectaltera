import { verifyJwt } from "../middleware";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // const accessToken = request.headers.get("authorization")?.split(" ")[1];
  // if (!accessToken || !verifyJwt(accessToken)) {
  //   return NextResponse.json(
  //     {
  //       message: "Unauthorized",
  //     },
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  try {
    const databarang = await prisma.databarang.findMany({
      include: {
        transaksikeluar: true,
        bahanbarang: {
          select: {
            bahanbaku: true,
            jumlah_bahan: true,
          },
        },
      },
    });

    const groupedDatas = databarang.map((index) => {
      const month = index.transaksikeluar.map((dateString) => {
        const date = new Date(dateString.createAt);
        return {
          months: date.getMonth() + 1,
          jumlah: dateString.jumlah,
          harga: dateString.harga,
        };
      });

      // Menghitung total transaksi untuk setiap bulan
      const groupedDatas = month.reduce((acc, curr) => {
        const index = acc.findIndex((item) => item.months === curr.months);
        if (index !== -1) {
          acc[index].jumlah += curr.jumlah;
          acc[index].harga += curr.harga;
        } else {
          acc.push({
            months: curr.months,
            jumlah: curr.jumlah,
            harga: curr.harga,
          });
        }
        return acc;
      }, []);

      // Memastikan setiap bulan termasuk dalam data
      for (let i = 1; i <= 12; i++) {
        const found = groupedDatas.find((item) => item.months === i);
        if (!found) {
          groupedDatas.push({ months: i, jumlah: 0 });
        }
      }

      return {
        nama: index.nama_barang,
        data: groupedDatas.sort((a, b) => a.months - b.months), // Mengurutkan data berdasarkan bulan
      };
    });

    return NextResponse.json({ groupedDatas }, { status: 200 });
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
