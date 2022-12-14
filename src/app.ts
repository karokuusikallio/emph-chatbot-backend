import express from "express";
const app = express();
require("express-async-errors");
import compression from "compression";
import helmet from "helmet";
import conversateRouter from "./controllers/conversate";
import userRouter from "./controllers/user";
import loginRouter from "./controllers/login";
import messagesRouter from "./controllers/messages";
import sessionRouter from "./controllers/session";
import middleware from "./utils/middleware";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

app.use(express.static("build"));
app.use(express.json());
app.use(compression());
app.use(helmet());

app.use("/api/conversate", conversateRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/session", sessionRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
