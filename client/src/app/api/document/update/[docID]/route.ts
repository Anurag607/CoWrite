import { updateEntry } from "@/utils/MongoDB/queries";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request, context: any) {
  const { params } = context;
  const body = await request.json();
  console.log("body: ", body);
  console.log("params: ", params);
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
    const response: any = await updateEntry(
      "documents",
      params.docID,
      data,
      body.user
    );
    if (response.hasOwnProperty("status")) {
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
    // const doc = await prisma.documents.findOne({
    //   where: {
    //     id: params.docID,
    //   },
    // });
    // if(!doc) return NextResponse.json({ status: 404, message: "Document not Found!" });
    // if(doc.hasOwnProperty("access")) {
    //   if(!doc.access.includes(body.user)) return NextResponse.json({ status: 401, message: "You are not allowed to access this document." });
    // }
    // const document = await prisma.documents.update({
    //   where: {
    //     id: params.docID,
    //   },
    //   data: body,
    // });
    return NextResponse.json({ status: 202, data: response });
  } catch (err: any) {
    return NextResponse.json({ status: 400, msg: err.message });
  }
}
