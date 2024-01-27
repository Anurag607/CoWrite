import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: body.prompt }],
      model: "gpt-3.5-turbo",
    });
    return NextResponse.json({ msg: chatCompletion });
  } catch (err) {
    return NextResponse.json({ status: 400, msg: err.message });
  }
}
