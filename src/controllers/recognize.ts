import express, { Request, Response } from "express";
const recognizeRouter = express.Router();
import languageService from "../utils/languageServiceClient";

recognizeRouter.get("/", async (request: Request, response: Response) => {
  const text = request.query.text as string;
  const result = await languageService({ text, method: "ANNOTATE_TEXT" });
  response.status(200).json(result);
});

export default recognizeRouter;
