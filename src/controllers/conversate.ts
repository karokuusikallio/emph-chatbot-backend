import express, { NextFunction, Request, Response } from "express";
const conversateRouter = express.Router();
import languageService from "../utils/dialogFlowClient";

conversateRouter.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const text = request.query.text as string;
    try {
      const result = await languageService(text);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default conversateRouter;
