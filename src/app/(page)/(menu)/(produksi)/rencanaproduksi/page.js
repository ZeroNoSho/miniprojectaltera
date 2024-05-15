"use client";
import axios from "axios";
import { useState } from "react";
export default function Produksi() {
  const [chat, setChat] = useState();
  const [data, setData] = useState([
    "Selamat siang tuan atau nyonya ada yang bisa saya bantu?",
  ]);
  console.log(data);

  const dataChat = async () => {
    await axios
      .post(`/api/ai`, {
        Text: chat,
      })
      .then((res) => {
        const datas = [...data, chat, res.data.ai];
        setData(datas);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {data.map((e, i) => (
                  <div key={i} className="grid grid-cols-12 gap-y-2">
                    {i % 2 === 0 ? (
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="text-white flex items-center justify-center h-10 w-10 rounded-full bg-[#485fc7] flex-shrink-0">
                            B
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{e}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#354694] flex-shrink-0 text-white">
                            Y
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div> {e}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    onChange={(e) => setChat(e.target.value)}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => {
                    setData([...data, chat, "...."]);
                    dataChat();
                  }}
                  className="flex items-center justify-center blue rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span
                    onClick={() => {
                      setData([...data, chat, "...."]);
                      dataChat();
                    }}
                  >
                    Send
                  </span>
                  <span
                    className="ml-2"
                    onClick={() => {
                      setData([...data, chat, "...."]);
                      dataChat();
                    }}
                  >
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
