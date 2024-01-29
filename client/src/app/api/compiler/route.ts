import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const options = {
    method: "POST",
    url: process.env.RAPID_API_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
    data: body,
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json({ status: 202, msg: response });
  } catch (error) {
    return NextResponse.json({ status: 400, msg: error.message });
  }
}
