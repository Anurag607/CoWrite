import { NextResponse } from "next/server";
import { loginUser } from "@/utils/MongoDB/queries";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const userData = await request.json();
  try {
    const user = await loginUser(userData);
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: data.email,
    //   },
    // });
    console.log(user);

    if (!user)
      return NextResponse.json({ status: 404, msg: "User not found!" });
    if (user === -1)
      return NextResponse.json({ status: 404, msg: "Incorrect Credentials!" });

    // const validate =loginUser(data);ompare(data.password, user!.password);
    // if (!validate) return NextResponse.json({ msg: "Invalid Password" });

    return NextResponse.json({ status: 200, data: user });
  } catch (err: any) {
    return NextResponse.json({ status: 404, msg: err.message });
  }
}
