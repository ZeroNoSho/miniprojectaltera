import { verifyJwt } from "../middleware";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();
 
  // const accessToken = request.headers.get("authorization")?.split(" ")[1];
  // if (!accessToken || !verifyJwt(accessToken)) {
  //   return NextResponse.json(
  //     {
  //       message: "Unauthorized",
  //     },
  //     {
  //       status: 401,
  //     }
  //   );
  // }
  
  const MODEL_NAME = "gemini-1.5-pro-latest";
  const API_KEY = "AIzaSyBwrX_7rZMb10F5d1fJvfosAbfcA8TQ-T0";

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(
      `banykan kamu adalah pemilik usaha penjualan dan penyimpanan barang, kamu memiliki pengalaman yang lebih dari 10 tahun dan kamu sangat mahir di bidang tersebut oleh karena itu ${res.Text}`
    );
    const response = result.response;
    return NextResponse.json({ ai: response.text() }, { status: 200 });

  } catch (error) {
    NextResponse.json(
      { msg: "error" },
      { status: 400 },
      {
        headers: {
          "Content-Security-Policy-Report-Only":
            "default-src 'none'; img-src 'self'",
        },
      }
    );
  }
}
