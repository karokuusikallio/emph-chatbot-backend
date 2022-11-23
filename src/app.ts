import express from "express";
const app = express();
require("express-async-errors");
import cors from "cors";
import recognizeRouter from "./controllers/recognize";
import middleware from "./utils/middleware";

//Here we can connect to a database

app.use(cors());
app.use(express.json());
app.use("/api/recognize", recognizeRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
