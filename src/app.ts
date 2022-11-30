import express from "express";
const app = express();
require("express-async-errors");
import cors from "cors";
import conversateRouter from "./controllers/conversate";
import middleware from "./utils/middleware";

//Here we can connect to a database

app.use(cors());
app.use(express.json());
app.use("/api/conversate", conversateRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
