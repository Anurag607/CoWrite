import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(body.prompt);
    const response = result.response.text();
    // const result = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: body.prompt }],
    //   model: "gpt-3.5-turbo",
    // });
    // const response = result.msg.choices[0].message.content;
    return NextResponse.json({ status: 202, msg: response });
  } catch (err) {
    return NextResponse.json({ status: 400, msg: err.message });
  }
}
