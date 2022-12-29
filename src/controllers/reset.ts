import express, { Request, Response } from "express";
const resetRouter = express.Router();
import { prisma } from "../app";

resetRouter.post("/", async (request: Request, response: Response) => {
  await prisma.message.deleteMany({});
  await prisma.user.deleteMany({});
  return response.status(200).end();
});

export default resetRouter;
