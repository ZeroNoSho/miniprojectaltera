"use client";
import { useState, useContext } from "react";
import { Contex } from "@/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faBoxesPacking,
  faDolly,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { transaksiklr, transaksimsk, barang } = useContext(Contex);
  const [tabel, setTabel] = useState("masuk");
  const [tabel2, setTabel2] = useState(0);
  return (
    <div className="mx-15 text-slate-500 max-h-full min-h-screen ">
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Dashboard</p>
      </div>
      <div className="pb-16 max-[800px]:mb-10">
        <div className="w-11/12 m-auto bg-white flex flex-row max-[800px]:grid-cols-1 rounded-md max-[800px]:block ">
          <div className="flex px-5 border-r border-slate-200 py-5 basis-4/12">
            <p className="text-3xl w-20 text-center py-2 text-slate-100 bg-yellow-500 rounded-md">
              <FontAwesomeIcon icon={faBox} />
            </p>
            <div className="w-full ml-2">
              <p className="text-sm">Data Barang</p>
              <p className="text-xl max-[800px]:text-xl">
                {barang?.databarang.length}
              </p>
            </div>
          </div>
          <div className="flex px-5 border-r border-slate-200 py-5 basis-4/12">
            <div className="text-3xl w-20 text-center py-2 text-slate-100 bg-blue-500 rounded-md">
              <FontAwesomeIcon icon={faDolly} />
            </div>
            <div className="w-full ml-2">
              <p className="text-sm">Data Masuk</p>
              <p className="text-xl max-[800px]:text-xl">
                {transaksimsk?.transaksimasuk.length}
              </p>
            </div>
          </div>
          <div className="flex px-5 py-5 basis-4/12">
            <p className="text-3xl w-20 text-center py-2 text-slate-100 bg-green-500 rounded-md">
              <FontAwesomeIcon icon={faBoxesPacking} />
            </p>
            <div className="w-full ml-2">
              <p className="text-sm">Data keluar</p>
              <p className="text-xl max-[800px]:text-xl">
                {transaksiklr?.transaksikeluar.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white w-11/12 m-auto rounded-lg mt-20 pb-10">
          <div className="w-11/12 m-auto pt-10 flex max-[800px]:block">
            <p className="max-[800px]:w-full max-[800px]:text-sm max-[800px]:pb-4">
              Pilih Tabel :
            </p>
            <select
              className="w-20 mx-10 max-[800px]:w-full max-[800px]:mx-auto"
              onChange={(e) => setTabel(e.target.value)}
            >
              <option value="masuk">Masuk</option>
              <option value="keluar">Keluar</option>
            </select>
          </div>
          <div className="border-t border-slate-200 my-8"></div>
          <div className="wrapper ">
            <table
              className={`border-collapse table-auto text-sm w-11/12 m-auto`}
            >
              <thead className="blue2 text-slate-100">
                <tr>
                  <th
                    className={`border border-gray-300 font-medium p-4 pb-3  `}
                  >
                    Tanggal
                  </th>
                  <th
                    className={`border border-gray-300 font-medium p-4 pl-8  `}
                  >
                    Nama Barang
                  </th>
                  <th
                    className={`border border-gray-300 font-medium p-4 pb-3   `}
                  >
                    Tipe
                  </th>
                  <th
                    className={`border border-gray-300 font-medium p-4 pb-3   `}
                  >
                    Satuan
                  </th>
                  <th
                    className={`border border-gray-300 font-medium p-4 pb-3  `}
                  >
                    Jumlah
                  </th>
                  <th
                    className={`border border-gray-300 font-medium p-4 pb-3   `}
                  >
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabel === "masuk"
                  ? transaksimsk &&
                    transaksimsk?.transaksimasuk.map((item) => (
                      <tr key={item.kode_transaksi} className="text-center">
                        <td
                          className={`border border-gray-300 p-4 pl-8 text-slate-500 `}
                        >
                          {item.createAt
                            .replace(/T/gi, " | ")
                            .replace("000Z", " ")}
                        </td>
                        <td
                          className={`border border-gray-300 p-4 pl-8 text-slate-500  `}
                        >
                          <p>{item.bahanbaku[0].nama_bahan}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 text-slate-500  `}
                        >
                          <p> {tabel}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 text-slate-500  `}
                        >
                          <p> {item.bahanbaku[0].satuan}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 pr-8 text-slate-500 `}
                        >
                          <p>{item.jumlah}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 pr-8 text-slate-500  `}
                        >
                          <p>{item.harga}</p>
                        </td>
                      </tr>
                    ))
                  : transaksiklr &&
                    transaksiklr?.transaksikeluar.map((item) => (
                      <tr key={item.kode_transaksi} className="text-center">
                        <td
                          className={`border border-gray-300 p-4 pl-8 text-slate-500 `}
                        >
                          {item.createAt
                            .replace(/T/gi, " | ")
                            .replace("000Z", " ")}
                        </td>
                        <td
                          className={`border border-gray-300 p-4 pl-8 text-slate-500  `}
                        >
                          <p>{item.databarang[0].nama_barang}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 text-slate-500  `}
                        >
                          <p> {tabel}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 text-slate-500  `}
                        >
                          <p> {item.databarang[0].satuan}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 pr-8 text-slate-500 `}
                        >
                          <p>{item.jumlah}</p>
                        </td>
                        <td
                          className={`border border-gray-300 p-4 pr-8 text-slate-500  `}
                        >
                          <p>{item.harga}</p>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-200 my-8"></div>
          <div className="flex flex-row w-11/12 mx-auto  max-[500px]:py-4 max-[500px]:block max-[500px]:text-center ">
            {/* <p className="basis-1/2">
              Showing 1 to {transaksi?.limit} of {transaksi?.totalRows} rows
            </p> */}
            {/* <div className="flex basis-1/2 flex-row-reverse flex-row max-[500px]:flex-row max-[500px]:my-5">
              <button
                fdprocessedid="true"
                className="basis-1/12 cursor-pointer max-[500px]:basis-11/12"
                data-match="tam"
                onClick={() =>
                  transaksi && transaksi.totalPage - 1 > transaksi.page
                    ? setTabel2(tabel2 + 1)
                    : ""
                }
              >
                Next
              </button>
              <p className="basis-2/12 text-center">
                {transaksi && transaksi.page + 1}
              </p>
              <button
                fdprocessedid="true"
                className="basis-1/12 cursor-pointer max-[500px]:basis-11/12"
                data-match="kur"
                onClick={() =>
                  tabel2 > 0
                    ? setTabel2("", transaksi && transaksi.page - 1)
                    : ""
                }
              >
                Previous
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
