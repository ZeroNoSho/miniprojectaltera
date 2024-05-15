"use client";
import axios from "axios";
import Serchrp from "@/components/serchrp";
import { Contex } from "@/context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const { transaksimsk, col, token } = useContext(Contex);
  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);
  const [chkbox5, setChkbox5] = useState(true);
  const [chkbox6, setChkbox6] = useState(true);
  const [chkbox7, setChkbox7] = useState(true);

  const deletss = async (e) => {
    const res = await axios.delete(`/api/transaksimasuk/delet/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  };

  const multiDimensionalArray =
    transaksimsk &&
    transaksimsk?.transaksimasuk.map((obj) => {
      return {
        No_Struk: obj.no_struk,
        Tanggal: obj.createAt.replace(/T/gi, " | ").replace("000Z", " "),
        Nama: obj.bahanbaku[0].nama_bahan,
        Tipe: "masuk",
        Satuan: obj.bahanbaku[0].satuan,
        Jumlah: obj.jumlah,
        Harga: obj.harga,
      };
    });

  return (
    <div className={`mx-15 text-slate-500  max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">
          Report Pembelian
        </p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <Serchrp
          halaman={multiDimensionalArray && multiDimensionalArray}
          name={"Report_Pembelian.xlsx"}
        />
        <div className="wrapper">
          <table
            className={`border-collapse table-auto text-sm w-11/12 m-auto`}
          >
            <thead className=" text-slate-100">
              <tr>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3  ${
                    !chkbox1 ? "hidden" : ""
                  }`}
                >
                  Tanggal
                </th>
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
                  Tipe
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3    ${
                    !chkbox4 ? "hidden" : ""
                  }`}
                >
                  Satuan
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3   ${
                    !chkbox5 ? "hidden" : ""
                  }`}
                >
                  Jumlah
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3    ${
                    !chkbox6 ? "hidden" : ""
                  }`}
                >
                  Harga
                </th>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pb-3    ${
                    !chkbox7 ? "hidden" : ""
                  }`}
                >
                  action
                </th>
              </tr>
            </thead>

            <tbody>
              {transaksimsk &&
                transaksimsk?.transaksimasuk.map((item) => (
                  <tr key={item.kode_transaksi} className="text-center">
                    <td
                      className={`border border-gray-300 p-4 pl-8 text-slate-500  ${
                        !chkbox1 ? "hidden" : ""
                      }`}
                    >
                      {item.createAt.replace(/T/gi, " | ").replace("000Z", " ")}
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pl-8 text-slate-500   ${
                        !chkbox2 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.bahanbaku[0].nama_bahan}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 text-slate-500   ${
                        !chkbox3 ? "hidden" : ""
                      }`}
                    >
                      <p>masuk</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 text-slate-500   ${
                        !chkbox4 ? "hidden" : ""
                      }`}
                    >
                      <p> {item.bahanbaku[0].satuan}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pr-8 text-slate-500  ${
                        !chkbox5 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.jumlah}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pr-8 text-slate-500   ${
                        !chkbox6 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.harga}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 pr-8 text-slate-500   ${
                        !chkbox7 ? "hidden" : ""
                      }`}
                    >
                      <p
                        className="basis-1/2 cursor-pointer text-center"
                        data-key={item.kode_transaksi}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                          className="m-auto"
                          data-key={item.kode_transaksi}
                          onClick={() => deletss(item.kode_transaksi)}
                        >
                          <path
                            data-key={item.kode_transaksi}
                            onClick={() => deletss(item.kode_transaksi)}
                            fill="currentColor"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                          />
                        </svg>
                      </p>
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
