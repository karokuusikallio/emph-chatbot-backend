import express, { Request, Response } from "express";
const sessionRouter = express.Router();
import { prisma } from "../app";
import jwt from "jsonwebtoken";

interface VerifiedToken {
  username: string;
  userId: string;
  issuedAt: number;
}

sessionRouter.post("/", async (request: Request, response: Response) => {
  const token = request.get("auth-token");
  const { username, conversationId } = request.body;

  if (token) {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as VerifiedToken;

    if (username && conversationId && verifiedToken) {
      try {
        const updateUser = await prisma.user.update({
          where: {
            userName: username,
          },
          data: {
            conversationId: conversationId as string,
          },
        });

        return response.status(200).json({
          userName: updateUser.userName,
          conversationId: updateUser.conversationId,
        });
      } catch (error) {
        return response.status(400).json({ error });
      }
    }

    return response
      .status(400)
      .json({ error: "Please provide username and conversationId." });
  }

  return response.status(400).json({ error: "Please provide a valid token." });
});

sessionRouter.delete("/", async (request: Request, response: Response) => {
  const token = request.get("auth-token");
  const { username } = request.body;

  if (token) {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as VerifiedToken;

    if (verifiedToken) {
      try {
        const updateUser = await prisma.user.update({
          where: {
            userName: username,
          },
          data: {
            conversationId: null,
          },
        });
        return response.status(200).json({
          userName: updateUser.userName,
        });
      } catch (error) {
        return response.status(400).json({ error });
      }
    }
  }

  return response.status(400).json({ error: "Please provide a valid token." });
});

export default sessionRouter;
