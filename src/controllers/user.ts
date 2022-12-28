import express, { Request, Response } from "express";
const userRouter = express.Router();
import bcrypt from "bcrypt";
import { prisma } from "../app";
import jwt from "jsonwebtoken";

interface VerifiedToken {
  username: string;
  userId: string;
  issuedAt: number;
  conversationId: string | null;
}

userRouter.get("/me", async (request: Request, response: Response) => {
  const token = request.get("auth-token");

  if (token) {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as VerifiedToken;

    const user = await prisma.user.findUnique({
      where: {
        userName: verifiedToken.username,
      },
    });

    if (user) {
      const userInfo = {
        userName: user.userName,
        conversationId: user.conversationId,
        loggedIn: true,
      };

      return response.status(200).json(userInfo);
    }
  }

  return response.status(200).json({ loggedIn: false });
});

userRouter.post("/", async (request: Request, response: Response) => {
  const { username, password } = request.body;

  if (username && password) {
    const userExists = await prisma.user.findUnique({
      where: {
        userName: username,
      },
    });

    if (userExists) {
      return response.status(400).json({ error: "User already exists." });
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userCreated = await prisma.user.create({
      data: {
        userName: username,
        passwordHash,
      },
    });

    const userForResponse = { username: userCreated.userName };

    return response.status(200).json(userForResponse);
  }

  return response
    .status(400)
    .json({ error: "Please provide username and password." });
});

export default userRouter;
