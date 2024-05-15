"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/context/store";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx/xlsx.mjs";
import { faRotate, faTableCells } from "@fortawesome/free-solid-svg-icons";
axios.defaults.withCredentials = true;

export default function Serchrp({ halaman, hidden, name }) {
  const { refreshPage, setCol, col } = useContext(Contex);

  const exel = (e) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(e);

    XLSX.utils.book_append_sheet(workbook, worksheet, "books");
    XLSX.writeFile(workbook, name);
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="my-5 py-5 border-b border-t border-gray-300 flex max-[550px]:block">
        <button
          onClick={() => exel(halaman)}
          className="blue text-slate-100 p-2 rounded-lg"
          fdprocessedid="true"
        >
          download exel
        </button>
        <div className="flex flex-row-reverse ml-auto max-[550px]:mt-10">
          <p
            className="p-1 cursor-pointer w-20 text-center"
            onClick={refreshPage}
          >
            <FontAwesomeIcon icon={faRotate} onClick={refreshPage} />
          </p>
          <p
            className={`p-1 cursor-pointer w-20 text-center ${hidden}`}
            onClick={() => (col == 1 ? setCol(0) : setCol(1))}
          >
            <FontAwesomeIcon icon={faTableCells} />
          </p>
        </div>
      </div>
    </div>
  );
}
