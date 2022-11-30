import express, { Request, Response } from "express";
const conversateRouter = express.Router();
import languageService from "../utils/dialogFlowClient";

conversateRouter.get("/", async (request: Request, response: Response) => {
  const text = request.query.text as string;
  const result = await languageService(text);
  response.status(200).json(result);
});

export default conversateRouter;
