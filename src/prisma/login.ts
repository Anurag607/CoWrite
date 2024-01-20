import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const Login = async ({ req, res }: { req: Request; res: Response }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    !user && res.status(404).json({ msg: "User not found" });

    const validate = await bcrypt.compare(req.body.password, user!.password);
    !validate && res.status(404).json({ msg: "Invalid Password" });

    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export default Login;
