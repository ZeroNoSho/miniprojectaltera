"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  faBoxesStacked,
  faCashRegister,
  faChartLine,
  faChartSimple,
  faEarthAsia,
  faFileWaveform,
  faLeftLong,
  faList,
  faPenToSquare,
  faPlus,
  faQrcode,
  faReceipt,
  faRightLong,
  faSeedling,
  faTag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contex } from "@/context/store";

export default function Menu() {
  const { navbar, setNavbar } = useContext(Contex);
  const [nav_menu, setNav_menu] = useState(0);
  const [nav_menu1, setNav_menu1] = useState(0);

  1;
  const navs = () => {
    setNavbar(false);
  };

  return (
    <div
      className={`z-10 max-[700px]:w-full w-96 fixed h-screen blue text-slate-100 ${
        navbar == true ? " " : "hidden"
      }`}
    >
      <div>
        <div className="flex flex-row  py-5 cursor-default">
          <p className="ui-font-serif font-semibold text-xl text-center basis-1/6">
            <FontAwesomeIcon icon={faChartSimple} />
          </p>
          <h3 className="ui-font-serif font-semibold text-xl basis-4/6">
            <Link href="/dashboard">
              <span className="pr-2">W</span>
              <span className="pr-2">E</span>
              <span className="pr-2">B</span>
              <span className="pr-2">-</span>
              <span className="pr-2">S</span>
              <span className="pr-2">T</span>
              <span className="pr-2">O</span>
              <span className="pr-2">C</span>
              <span className="pr-2">K</span>
            </Link>
          </h3>
          <svg
            onClick={navs}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            className="cursor-pointer ui-font-serif font-semibold text-xl text-center basis-1/6 m-auto "
          >
            <path
              onClick={navs}
              fill="#f1f5f9"
              className="cursor-pointer"
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        </div>

        <hr />

        <div className="py-5 cursor-default">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faList} />
            </p>
            <p className="basis-4/6">Menu</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 1 ? setNav_menu(0) : setNav_menu(1);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 1 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/stokbarang">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faBoxesStacked} />
                &nbsp; stok barang
              </p>
            </Link>
            <Link href="/stokbahan">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faPenToSquare} />
                &nbsp; stok bahan baku
              </p>
            </Link>

            <div className="flex flex-row py-3 pl-12">
              <p className=" basis-5/6">
                <FontAwesomeIcon icon={faSeedling} />
                &nbsp; Rencana Produksi
              </p>
              <p
                className="basis-1/6 text-center cursor-pointer"
                onClick={() => {
                  nav_menu1 == 1 ? setNav_menu1(0) : setNav_menu1(1);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </p>
            </div>
            <div
              className={`${nav_menu1 == 1 ? "" : "hidden"} blue2 py-3 px-20`}
            >
              <div className="flex flex-row  cursor-pointer">
                <p className="basis-1/12 text-center pr-2">
                  <FontAwesomeIcon icon={faEarthAsia} />
                </p>
                <Link href="/rencanaproduksi" className="basis-11/12">
                  rencana produksi (AI)
                </Link>
              </div>
              <div className="flex flex-row pt-5 pb-3 cursor-pointer">
                <p className="basis-1/12 text-center pr-2">
                  <FontAwesomeIcon icon={faEarthAsia} />
                </p>
                <Link href="/produksireal" className="basis-11/12">
                  produksi real
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row py-5 cursor-pointer">
          <p className="basis-1/6 text-center">
            <FontAwesomeIcon icon={faChartLine} />
          </p>
          <Link href="/dashboard" className="basis-5/6">
            Dashboard
          </Link>
        </div>

        <div className="py-5 cursor-default">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faCashRegister} />
            </p>
            <p className="basis-4/6">Transaksi</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 3 ? setNav_menu(0) : setNav_menu(3);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 3 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/pembelian">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faRightLong} />
                &nbsp; Transaksi Pembelian
              </p>
            </Link>
            <Link href="/penjualan">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faLeftLong} />
                &nbsp; Transaksi penjualan
              </p>
            </Link>
          </div>
        </div>

        <div className="py-5 cursor-default">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faQrcode} />
            </p>
            <p className="basis-4/6">Master</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 2 ? setNav_menu(0) : setNav_menu(2);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 2 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/barang">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faTags} />
                &nbsp; Data Barang
              </p>
            </Link>
            <Link href="/bahan">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faTags} />
                &nbsp; Bahan Barang
              </p>
            </Link>
          </div>
        </div>

        <div className="py-5 cursor-pointer">
          <div className="flex flex-row">
            <p className="basis-1/6 text-center">
              <FontAwesomeIcon icon={faReceipt} />
            </p>
            <p className="basis-4/6">Report</p>
            <p
              className="basis-1/6 text-center cursor-pointer"
              onClick={() => {
                nav_menu == 4 ? setNav_menu(0) : setNav_menu(4);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
          <div className={`${nav_menu == 4 ? "" : "hidden"} blue2 mt-5`}>
            <Link href="/reportpembelian">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faFileWaveform} />
                &nbsp; Report Pembelian
              </p>
            </Link>
            <Link href="/reportpenjualan">
              <p className="px-12  py-3">
                <FontAwesomeIcon icon={faFileWaveform} />
                &nbsp; Report Penjualan
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
