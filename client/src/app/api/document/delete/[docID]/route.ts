import { deleteEntry } from "@/utils/MongoDB/queries";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function DELETE(request: Request, context: any) {
  const { params } = context;
  try {
    const document = await deleteEntry("documents", params.docID);
    // const document = await prisma.documents.delete({
    //   where: {
    //     id: params.id,
    //   },
    // });
    return NextResponse.json({ data: document });
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }
}
