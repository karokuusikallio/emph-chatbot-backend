import logger from "./logger";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);
};
const middleware = {
  unknownEndpoint,
  errorHandler,
};

export default middleware;
