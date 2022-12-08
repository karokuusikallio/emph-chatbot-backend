import express from "express";
const app = express();
require("express-async-errors");
import conversateRouter from "./controllers/conversate";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";
import messagesRouter from "./controllers/messages";
import middleware from "./utils/middleware";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

app.use(express.json());

app.use("/api/conversate", conversateRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/messages", messagesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
