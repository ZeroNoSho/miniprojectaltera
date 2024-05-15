"use client";
import axios from "axios";
import Serchrp from "@/components/serchrp";
import { Contex } from "@/context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const { barang, col, token } = useContext(Contex);
  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);
  const [chkbox5, setChkbox5] = useState(true);
  const [chkbox6, setChkbox6] = useState(true);
  const [chkbox7, setChkbox7] = useState(true);

  const multiDimensionalArray =
    barang &&
    barang.databarang?.map((obj) => {
      return {
        Nama: obj.nama_barang,
        Satuan: "pcs",
        Jumlah: obj.stok,
        Harga: obj.harga,
        Tanggal: obj.createAt.replace(/T/gi, " | ").replace("000Z", " "),
      };
    });

  return (
    <div className={`mx-15 text-slate-500  max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Stok Barang</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <Serchrp
          halaman={multiDimensionalArray && multiDimensionalArray}
          name={"Report_Penjualan.xlsx"}
        />
        <div className="wrapper">
          <table
            className={`border-collapse table-auto text-sm w-11/12 m-auto`}
          >
            <thead className=" text-slate-100">
              <tr>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pl-8  ${
                    !chkbox2 ? "hidden" : ""
                  }`}
                >
                  Nama Barang
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3   ${
                    !chkbox3 ? "hidden" : ""
                  } `}
                >
                  Satuan
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3    ${
                    !chkbox4 ? "hidden" : ""
                  }`}
                >
                  Jumlah stok
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3    ${
                    !chkbox6 ? "hidden" : ""
                  }`}
                >
                  Harga
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3  ${
                    !chkbox1 ? "hidden" : ""
                  }`}
                >
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              {barang &&
                barang.databarang?.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td
                      className={`border border-gray-300 p-4 pl-8 text-slate-500   ${
                        !chkbox2 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.nama_barang}</p>
                    </td>

                    <td
                      className={`border border-gray-300 p-4 text-slate-500   ${
                        !chkbox4 ? "hidden" : ""
                      }`}
                    >
                      <p> {item.satuan}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pr-8 text-slate-500  ${
                        !chkbox5 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.stok}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pr-8 text-slate-500   ${
                        !chkbox6 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.harga}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                        !chkbox1 ? "hidden" : ""
                      }`}
                    >
                      {item.createAt.replace(/T/gi, " | ").replace("000Z", " ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ul
        className={`max-[800px]:top-[380px] h-fit blue text-slate-100 w-fit absolute top-[280px] postionus rounded-lg ${
          col == 0 ? "hidden" : ""
        }`}
      >
        <li className="w-[100%] py-5 pb-3 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox1(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">Tanggal</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox2(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">Nama Barang</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox3(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">Tipe</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox4(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">Satuan</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox5(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">Jumlah</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox6(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">Harga</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox7(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">action</p>
        </li>
      </ul>
    </div>
  );
}
