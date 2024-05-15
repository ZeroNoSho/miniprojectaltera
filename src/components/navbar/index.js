"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Contex } from "@/context/store";
axios.defaults.withCredentials = true;

export default function Nav() {
  const router = useRouter();
  const { setNavbar } = useContext(Contex);

  const Logout = async () => {
    try {
      await axios.post("/api/user/logout");
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const navs = () => {
    setNavbar(true);
  };

  return (
    <div>
      <div className={`py-5 flex flex-row-reverse`}>
        <p
          className="text-xl text-right px-2 text_blue cursor-pointer ml-auto mr-5"
          onClick={Logout}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={Logout} />
        </p>
        <svg
          onClick={navs}
          className="text-xl text-right px-2 text_blue cursor-pointer mr-auto my-auto ml-5"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path
            onClick={navs}
            fill="#485fc7"
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>
    </div>
  );
}
