import express, { Request, Response } from "express";
const loginRouter = express.Router();
import bcrypt from "bcrypt";
import { prisma } from "../app";
import jwt from "jsonwebtoken";

loginRouter.post("/", async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const user = await prisma.user.findUnique({
    where: {
      userName: username,
    },
  });

  if (user) {
    const passwordCheck = await bcrypt.compare(password, user.passwordHash);

    if (passwordCheck) {
      const authToken = jwt.sign(
        { username: user.userName, userId: user.id },
        process.env.JWT_SECRET as string
      );

      return response.status(200).json({ authToken });
    }
  }

  return response.status(400).json({ error: "Incorrect user or password" });
});

export default loginRouter;
