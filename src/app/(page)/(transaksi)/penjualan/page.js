"use client";
import axios from "axios";
import { Contex } from "@/context/store";
import { useState, useContext } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const { token, barang } = useContext(Contex);
  const [data, setData] = useState();
  const [stock, setStock] = useState();
  const [load, setLoad] = useState(true);

  const postData = async (e) => {
    e.preventDefault();

    if (data) {
      setLoad(false);
      await axios
        .post(
          `/api/transaksikeluar/post`,
          {
            kode_barang: data,
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
        <p className="text-3xl font-semibold pt-10 text-center text_blue">
          Transaksi Penjualan
        </p>
      </div>
      <div className="bg-white py-5 w-11/12 m-auto rounded-lg">
        <form onSubmit={postData} fdprocessedid="true">
          <div id="nama" className="px-10 py-1">
            <label className="font-semibold py-2">
              Nama Barang
              <select
                className="w-full rounded-md p-1 border border-gray-300"
                onChange={(e) => setData(e.target.value)}
                fdprocessedid="true"
                value={"" || data}
              >
                <option value={""}>Pilih Barang</option>
                {barang &&
                  barang.databarang?.map((item) => (
                    <option key={item.kode_barang} value={item.kode_barang}>
                      {item.nama_barang}
                    </option>
                  ))}
              </select>
            </label>
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
