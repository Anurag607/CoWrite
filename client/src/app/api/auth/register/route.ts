import { NextResponse } from "next/server";
import { registerUser } from "@/utils/MongoDB/queries";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const userData = await request.json();
  try {
    const user = await registerUser(userData);
    if (!user)
      return NextResponse.json({
        status: 404,
        msg: "Email already in use!",
      });

    return NextResponse.json({ status: 200, data: user });
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: data.email,
    //   },
    // });

    // if (user)
    //   return NextResponse.json({ msg: "Username or Email already in use" });

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(data.password, salt);

    // const newUserId = await prisma.user.create({
    //   data: {
    //     token: process.env.JWT_SECRET || "JWTSecret",
    //     username: data.name,
    //     email: data.email,
    //     password: hashedPassword,
    //   },
    // });

    // const JWTToken = jwt.sign(
    //   { id: newUserId.id, email: data.email },
    //   process.env.JWT_SECRET || "JWTSecret",
    //   { expiresIn: "3h" }
    // );

    // const updatedUser = await prisma.user.update({
    //   where: {
    //     email: data.email,
    //   },
    //   data: {
    //     token: JWTToken,
    //   },
    // });

    // return NextResponse.json(updatedUser);
  } catch (err: any) {
    return NextResponse.json({ status: 404, msg: err.message });
  }
}
