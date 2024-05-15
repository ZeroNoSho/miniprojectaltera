"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
axios.defaults.withCredentials = true;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const auth = async (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", {
        email: name,
        password: password,
      })
      .then((res) => {
        router.push(`/dashboard`);
      })
      .catch((error) => {
        if (error.response) {
          const errorMsg = error.response.data.msg; // Anda perlu menyesuaikan dengan struktur respons dari server
          setMsg(errorMsg); // Anda perlu mendefinisikan fungsi setMsg sebelumnya
        }
      });
  };

  return (
    <div className="blue text-slate-500 containers">
      <div className="m-auto center-top-left login-form">
        <p className="text-3xl font-bold text-center">Log in</p>
        <form onSubmit={auth} className="py-2" fdprocessedid="true">
          <label className="p-2">Username</label>
          <input
            value={name}
            className="p-2 rounded-md w-full border border-gray-300"
            type="email"
            placeholder="username@gmail.com"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="p-2">Password</label>
          <input
            value={password}
            className="p-2 rounded-md w-full border border-gray-300"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="p-2 mt-4 w-full blue rounded-md text-slate-100">
            Login
          </button>
        </form>
        <div
          className={`bg-red-100 rounded-md ${msg !== "" ? "block" : "hidden"}`}
        >
          <p className="text-center">{msg}!!!!</p>
        </div>
      </div>
    </div>
  );
}
