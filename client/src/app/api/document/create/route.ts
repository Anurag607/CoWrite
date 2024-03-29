import { insertEntry } from "@/utils/MongoDB/queries";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const data = {
    title: body.title,
    owner: body.emailID,
    access: [body.emailID],
    descImg: body.descImg,
    color: body.color,
    pinned: body.pinned,
    content: body.content,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
  };
  console.log(data);
  try {
    const document = await insertEntry("documents", data);
    // const document = await prisma.documents.create({
    //   data: body,
    // });
    return NextResponse.json({ status: 202, data: document });
  } catch (err: any) {
    return NextResponse.json({ status: 400, msg: err.message });
  }
}
