"use client";
import axios from "axios";
import { Contex } from "@/context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const { bahan, token } = useContext(Contex);
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [stock, setStock] = useState();

  const postData = async (e) => {
    setLoad(false);
    e.preventDefault();
    if (data) {
      await axios
        .post(
          `/api/transaksimasuk/post`,
          {
            kode_bahan: data,
            jumlah: stock,
            kode_kasir: "654a0808b71b619c315a195d",
          },
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        )
        .then((res) => {
          reset();
          setLoad(true);
        })
        .catch(() => setLoad(true));
    }
  };

  const reset = () => {
    setData("");
    setStock("");
  };

  return (
    <div className="mx-15 text-slate-500 max-h-full min-h-screen pb-10">
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-10 text-center">
          Transaksi Pembelian
        </p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg">
        <form onSubmit={postData}>
          <div id="nama" className="px-10 py-1">
            <p className="font-semibold">Nama Bahan</p>
            <select
              className="w-full rounded-md p-1 border border-gray-300"
              onChange={(e) => setData(e.target.value)}
              fdprocessedid="true"
              value={"" || data}
            >
              <option value={""}>Pilih Bahan</option>
              {bahan &&
                bahan.bahanbaku?.map((item) => (
                  <option key={item.kode_bahan} value={item.kode_bahan}>
                    {item.nama_bahan}
                  </option>
                ))}
            </select>
          </div>
          <div id="jumlah" className="px-10 pb-5 pt-1">
            <label className="font-semibold py-2">
              Jumlah
              <input
                value={stock || ""}
                onChange={(e) => setStock(parseInt(e.target.value))}
                type="number"
                placeholder="masukan angka"
                className="w-full rounded-md p-1 border border-gray-300"
                fdprocessedid="true"
              />
            </label>
          </div>
          <div className="px-10">
            <button
              className="mr-5 blue text-slate-100 p-2 rounded-lg w-28"
              fdprocessedid="true"
            >
              {load ? "Submit" : "loading...."}
            </button>
            <button
              onClick={reset}
              className="color_body text-slate-500 p-2 rounded-lg w-28"
              fdprocessedid="false"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
