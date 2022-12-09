import express, { Request, Response } from "express";
const messagesRouter = express.Router();
import { prisma } from "../app";
import jwt from "jsonwebtoken";

interface VerifiedToken {
  username: string;
  userId: string;
  issuedAt: number;
}

messagesRouter.get("/", async (request: Request, response: Response) => {
  const token = request.get("auth-token");

  if (token) {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as VerifiedToken;

    if (verifiedToken) {
      const messages = await prisma.message.findMany({
        where: {
          userId: verifiedToken.userId,
        },
      });
      return response.status(200).json(messages);
    }
  }
});

messagesRouter.post("/", async (request: Request, response: Response) => {
  const token = request.get("auth-token");
  const { text, sender } = request.body;

  if (token) {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as VerifiedToken;

    if (verifiedToken && text && sender) {
      const messageCreated = await prisma.message.create({
        data: {
          userId: verifiedToken.userId,
          text,
          sender,
        },
      });
      return response.status(200).json(messageCreated);
    }

    if (!verifiedToken) {
      return response.status(400).json({ error: "Missing valid token." });
    }
  }

  return response.status(400).json({ error: "Invalid message text or sender" });
});

messagesRouter.delete("/", async (request: Request, response: Response) => {
  const token = request.get("auth-token");

  if (token) {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as VerifiedToken;

    if (verifiedToken) {
      await prisma.message.deleteMany({
        where: {
          userId: verifiedToken.userId,
        },
      });
      return response.status(200).end();
    }

    if (!verifiedToken) {
      return response.status(400).json({ error: "Invalid auth token." });
    }
  }

  return response.status(400).json({ error: "No auth token." });
});

export default messagesRouter;
