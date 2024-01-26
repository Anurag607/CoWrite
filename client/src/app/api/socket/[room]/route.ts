import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;
  const body = await request.json();
  try {
    return NextResponse.json({ msg: "Data Updated!" });
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }
}
