import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    return NextResponse.json({ msg: "This is the socket route" });
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }
}
