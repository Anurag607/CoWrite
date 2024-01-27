import { updateEntry } from "@/utils/MongoDB/queries";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request, context: any) {
  const { params } = context;
  const body = await request.json();
  const data = {
    title: body.title,
    owner: body.emailID,
    access: body.access,
    descImg: body.descImg,
    color: body.color,
    pinned: body.pinned,
    content: body.content,
    createdAt: body.createdAt,
    updatedAt: body.updatedAt,
  };
  try {
    console.log("params", params);
    const response: any = await updateEntry(
      "documents",
      params.docID,
      data,
      body.user
    );
    if (document.hasOwnProperty("status")) {
      if (response.status === 404)
        return NextResponse.json({
          status: 404,
          message: "Document not Found!",
        });
      if (response.status === 401)
        return NextResponse.json({
          status: 401,
          message: "You are not allowed to access this document.",
        });
    }
    // const document = await prisma.documents.update({
    //   where: {
    //     id: params.id,
    //   },
    //   data: body,
    // });
    return NextResponse.json({ status: 202, data: response });
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }
}
