import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    return NextResponse.json({ msg: "This is the auth route" });
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }
}
