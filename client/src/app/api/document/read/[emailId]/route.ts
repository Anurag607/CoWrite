import { getAllEntries } from "@/utils/MongoDB/queries";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const documents = await getAllEntries("documents", params.emailId);
    // const documents = await prisma.documents.findMany();
    return NextResponse.json({ data: documents });
  } catch (err: any) {
    return NextResponse.json({ msg: err.message });
  }
}
