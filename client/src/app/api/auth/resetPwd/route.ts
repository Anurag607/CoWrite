import { NextResponse } from "next/server";
import { forgotPassword } from "@/utils/MongoDB/queries";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const userData = await request.json();
  try {
    const user = await forgotPassword(userData);
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: data.email,
    //   },
    // });
    console.log(user);

    if (!user)
      return NextResponse.json({ status: 404, msg: "User not found!" });

    return NextResponse.json({ status: 200, data: user });
  } catch (err: any) {
    return NextResponse.json({ status: 404, msg: err.message });
  }
}
