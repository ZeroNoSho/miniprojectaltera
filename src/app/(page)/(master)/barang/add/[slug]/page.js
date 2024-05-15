"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/context/store";
import { useState, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
axios.defaults.withCredentials = true;

export default function Home() {
  const params = useParams();
  const { token, bahan, router, mutatebarang } = useContext(Contex);
  const [harga, setHarga] = useState();
  const [nama, setNama] = useState();
  const [stock, setStock] = useState();
  const [cheakbox, setCheakbox] = useState([]);
  const [jenisValue, setJenisValue] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/databarang/getid/${params.slug}`)
      .then((res) => {
        console.log(res.data);
        setNama(res.data.databarang[0].nama_barang);
        setStock(res.data.databarang[0].stok);
        setHarga(res.data.databarang[0].harga);
        const kode = res.data.databarang[0].bahanbarang.map((item, i) => {
          return {
            kode_bahan: item.bahanbaku[0].kode_bahan,
            jumlah_bahan: item.jumlah_bahan,
          };
        });
        setCheakbox(kode);
      })
      .catch((e) => console.log(e));
  }, [params]);

  const update = async (e) => {
    e.preventDefault();
    setJenisValue(true);
    axios
      .patch(
        `/api/databarang/update/${params.slug}`,
        {
          nama: nama,
          stok: parseInt(stock),
          satuan: "pcs",
          harga: parseInt(harga),
          kode: JSON.stringify(cheakbox),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setNama("");
        setStock("");
        setHarga("");
        setJenisValue(false);

        mutatebarang("/api/databarang/get/");
        router.push(`/barang`);
      })
      .catch((error) => {
        if (error.response) {
          const errorMsg = error.response.data.msg; // Anda perlu menyesuaikan dengan struktur respons dari server
        }
      });
  };

  const CheackBox = (e) => {
    const cheak = e.target.value;
    const index = cheakbox.findIndex((item) => item.kode_bahan == cheak);

    if (index === -1) {
      setCheakbox([...cheakbox, { kode_bahan: cheak, jumlah_bahan: 0 }]);
    } else {
      cheakbox.splice(index, 1);
      setCheakbox([...cheakbox]);
    }
  };

  const updateFieldChanged = (index) => (e) => {
    let newArr = [...cheakbox];
    newArr[index].jumlah_bahan = parseInt(e.target.value);
    setCheakbox(newArr);
  };

  return (
    <div className={`mx-15 text-slate-500 pb-20`}>
      <div className="mb-10">
        <p className="text-3xl font-semibold pt-16 text-center">
          Update Barang
        </p>
      </div>

      <div className="bg-white py-5 w-11/12 m-auto rounded-lg pb-10">
        <form
          className="w-11/12 mx-auto"
          fdprocessedid="true"
          onSubmit={update}
        >
          <label>
            Nama Barang
            <input
              value={nama || ""}
              type="text"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setNama(e.target.value)}
            />
          </label>

          <label>
            Stock Barang
            <input
              value={stock || ""}
              type="number"
              className="w-full p-2 my-5 border border-gray-300 rounded-lg"
              fdprocessedid="false"
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          <div>
            Bahan
            <div className="w-full p-2 my-5 flex fe">
              {bahan &&
                bahan.bahanbaku?.map((item) => (
                  <label key={item.kode_bahan}>
                    <input
                      className="cheakboxs"
                      type="checkbox"
                      value={item.kode_bahan}
                      onClick={CheackBox}
                    />
                    <span className="blue bg-white text-slate-100 py-2 rounded-lg mr-2 px-10">
                      {item.nama_bahan}
                    </span>
                  </label>
                ))}
            </div>
          </div>

          <label>
            {cheakbox?.map((e, index) => (
              <div key={e.kode_bahan}>
                kebutuhan {e.kode_bahan}
                <input
                  value={e.jumlah_bahan || ""}
                  type="number"
                  className="w-full p-2 my-5 border border-gray-300 rounded-lg"
                  fdprocessedid="false"
                  onChange={updateFieldChanged(index)}
                />
              </div>
            ))}
          </label>

          <label>
            Harga Barang
            <input
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
            href={"/barang"}
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
