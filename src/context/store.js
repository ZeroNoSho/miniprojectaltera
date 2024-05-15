"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import useSWR from "swr";
axios.defaults.withCredentials = true;
const Contex = createContext(null);

const Provider = ({ children }) => {
  const router = useRouter();
  //nav
  const [navbar, setNavbar] = useState(false);
  const [col, setCol] = useState(0);

  //api
  const [bahananme, setBahananme] = useState("");
  const [baranganme, setBarangnanme] = useState("");

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: token, error } = useSWR("/api/refreshToken", fetcher);

  const fetcher1 = (url, token) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => res.data);

  const {
    data: bahan,
    error: errorbahan,
    mutate: mutatebahan,
  } = useSWR([`/api/bahanbaku/get/${bahananme}`, token], ([url, token]) =>
    fetcher1(url, token)
  );
  const {
    data: barang,
    error: errorbarang,
    mutate: mutatebarang,
  } = useSWR([`/api/databarang/get/${baranganme}`, token], ([url, token]) =>
    fetcher1(url, token)
  );
  const {
    data: transaksimsk,
    error: errortransaksimsk,
    mutate: mutatetransaksimsk,
  } = useSWR([`/api/transaksimasuk/get`, token], ([url, token]) =>
    fetcher1(url, token)
  );
  const {
    data: transaksiklr,
    error: errortransaksiklr,
    mutate: mutatetratransaksiklr,
  } = useSWR([`/api/transaksikeluar/get/`, token], ([url, token]) =>
    fetcher1(url, token)
  );
  const { data: real, error: errorreal } = useSWR(
    [`/api/real`, token],
    ([url, token]) => fetcher1(url, token)
  );
  return (
    <Contex.Provider
      value={{
        mutatebahan,
        mutatebarang,
        mutatetransaksimsk,
        mutatetratransaksiklr,

        setNavbar,
        navbar,
        setCol,
        col,
        token,
        router,

        setBahananme,
        setBarangnanme,
        
        real,
        barang,
        bahan,
        transaksiklr,
        transaksimsk,
      }}
    >
      {children}
    </Contex.Provider>
  );
};

export { Contex, Provider };
