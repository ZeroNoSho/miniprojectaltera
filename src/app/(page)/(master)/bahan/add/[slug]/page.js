"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/context/store";
import { useState, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
axios.defaults.withCredentials = true;

export default function Home() {
  const params = useParams();
  const { token, router, mutatebahan } = useContext(Contex);
  const [nama, setNama] = useState();
  const [jumlah_satuan, setJumlah_satuan] = useState();
  const [harga, setHarga] = useState();
  const [jenisValue, setJenisValue] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/bahanbaku/getid/${params.slug}`)
      .then((res) => {
        setNama(res.data.bahanbaku[0].nama_bahan);
        setJumlah_satuan(res.data.bahanbaku[0].jumlah_satuan);
        setHarga(res.data.bahanbaku[0].harga);
      })
      .catch((e) => console.log(e));
  }, [params]);

  const postData = async (e) => {
    e.preventDefault();
    setJenisValue(true);
    const response = await axios.patch(
      `/api/bahanbaku/update/${params.slug}`,
      {
        nama: nama,
        satuan: "pcs",
        jumlah_satuan: parseInt(jumlah_satuan),
        harga: parseInt(harga),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    mutatebahan(`/api/bahanbaku/get/`);
    router.push(`/bahan`);

    setNama("");
    setJumlah_satuan("");
    setHarga("");

    setJenisValue(false);
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-8 text-center">
          Update Bahan Barang
        </p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <form
          className="w-11/12 mx-auto"
          fdprocessedid="true"
          onSubmit={postData}
        >
          <label>
            Nama Bahan Barang
            <input
              id="jenis"
              value={nama || ""}
              type="text"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setNama(e.target.value)}
            />
          </label>
          <label>
            jumlah Bahan
            <input
              id="jenis"
              value={jumlah_satuan || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setJumlah_satuan(e.target.value)}
            />
          </label>

          <label>
            Harga Bahan Barang
            <input
              id="jenis"
              value={harga || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setHarga(e.target.value)}
            />
          </label>

          <button
            className="blue text-slate-100 py-2 rounded-lg mr-2 px-10"
            fdprocessedid="true"
            disabled={jenisValue}
          >
            {jenisValue ? "Loding..." : "Save"}
          </button>
          <Link
            href={"/bahan"}
            className="color_body text-slate-500 py-2 rounded-lg px-10"
            fdprocessedid="true"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
