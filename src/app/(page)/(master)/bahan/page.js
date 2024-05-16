"use client";
import axios from "axios";
import Serch from "@/components/serch";
import { Contex } from "@/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
axios.defaults.withCredentials = true;

export default function Home() {
  const { bahan, setBahananme, col, token, mutatebahan } = useContext(Contex);
  const [chkbox1, setChkbox1] = useState(true);
  const [chkbox2, setChkbox2] = useState(true);
  const [chkbox3, setChkbox3] = useState(true);
  const [chkbox4, setChkbox4] = useState(true);
  const [chkbox5, setChkbox5] = useState(true);
  const [chkbox6, setChkbox6] = useState(true);

  const deletss = async (e) => {
    const res = await axios.delete(`/api/bahanbaku/delet/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    mutatebahan(`/api/bahanbaku/get/`);
    console.log(res.data);
  };

  return (
    <div className={`mx-15 text-slate-500  max-h-full min-h-screen pb-10`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">Bahan Barang</p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <Serch halaman={"/bahan/add"} get={setBahananme} />
        <div className="wrapper">
          <table className=" table-auto text-sm w-11/12 mx-auto text-center">
            <thead className=" text-slate-100">
              <tr>
                <th
                  className={`blue2 border border-gray-300 font-medium p-4 pl-8 pb-3 rounded-t-lg  ${
                    !chkbox1 ? "hidden" : ""
                  }`}
                >
                  nama bahan
                </th>
                <th
                  className={`blue2 text-center border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox2 ? "hidden" : ""
                  }`}
                >
                  satuan
                </th>
                <th
                  className={`blue2 text-center border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox3 ? "hidden" : ""
                  }`}
                >
                  jumlah satuan
                </th>
                <th
                  className={`blue2 text-center border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox4 ? "hidden" : ""
                  }`}
                >
                  harga
                </th>

                <th
                  className={`blue2 text-center border border-gray-300 font-medium p-4 pb-3 rounded-t-lg  ${
                    !chkbox6 ? "hidden" : ""
                  }`}
                >
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {bahan &&
                bahan.bahanbaku?.map((item) => (
                  <tr key={item.kode_bahan} className="rounded-b-lg">
                    <td
                      className={`border border-gray-300 p-4 text-slate-500  ${
                        !chkbox1 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.nama_bahan}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 text-slate-500  ${
                        !chkbox2 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.satuan}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 text-slate-500  ${
                        !chkbox3 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.jumlah_satuan}</p>
                    </td>
                    <td
                      className={`border border-gray-300 p-4 text-slate-500  ${
                        !chkbox4 ? "hidden" : ""
                      }`}
                    >
                      <p>{item.harga}</p>
                    </td>

                    <td
                      className={`border border-gray-300 p-4 text-slate-500 flex ${
                        !chkbox6 ? "hidden" : ""
                      }`}
                    >
                      <Link
                        href={`/bahan/add/${item.kode_bahan}`}
                        className="basis-1/2 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                      <p
                        className="basis-1/2 cursor-pointer text-center"
                        data-key={item.kode_bahan}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                          className="m-auto"
                          data-key={item.kode_bahan}
                          onClick={() => deletss(item.kode_bahan)}
                        >
                          <path
                            data-key={item.kode_bahan}
                            onClick={() => deletss(item.kode_bahan)}
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
          <p className="m-auto text-center">nama bahan</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox2(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">satuan</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox3(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">jumlah satuan</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox4(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">harga</p>
        </li>
        <li className="w-[100%] py-5 pb-5 px-5 flex">
          <input
            type="checkbox"
            onClick={(e) => setChkbox6(e.target.checked)}
            defaultChecked
          />
          <p className="m-auto text-center">action</p>
        </li>
      </ul>
    </div>
  );
}
