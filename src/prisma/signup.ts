import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const Signup = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        OR: [{ username: req.body.name }, { email: req.body.email }],
      },
    });

    user && res.status(400).json({ msg: "Username or Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUserId = await prisma.user.create({
      data: {
        token: "JWTToken",
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    const JWTToken = jwt.sign(
      { id: newUserId[0]._id, email: req.body.email },
      process.env.NEXT_PUBLIC_JWT_SECRET!,
      { expiresIn: "3h" }
    );

    const updatedUser = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        token: JWTToken,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export default Signup;
