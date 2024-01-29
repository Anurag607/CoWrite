import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const token = context.params.token;
  const options = {
    method: "GET",
    url: process.env.RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json({ status: 202, msg: response });
  } catch (error) {
    return NextResponse.json({ status: 400, msg: error.message });
  }
}
