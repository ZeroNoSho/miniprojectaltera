"use client";
import axios from "axios";
import Link from "next/link";
import { Contex } from "@/context/store";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faTableCells } from "@fortawesome/free-solid-svg-icons";
axios.defaults.withCredentials = true;

export default function Serch({ halaman, get, hidden }) {
  const { refreshPage, setCol, col } = useContext(Contex);

  return (
    <div className="w-11/12 mx-auto">
      <div className="my-5 py-5 border-b border-t border-gray-300 flex max-[550px]:block">
        <Link
          href={halaman || ""}
          className="blue text-slate-100 p-2 rounded-lg"
          fdprocessedid="true"
        >
          Add item
        </Link>
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
          <input
            onChange={(e) => {
              get(e.target.value || "");
            }}
            type="text"
            placeholder="Search"
            className="rounded-md p-1 border border-gray-300"
            fdprocessedid="true"
          />
        </div>
      </div>
    </div>
  );
}
