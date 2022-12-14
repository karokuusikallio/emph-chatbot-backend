import logger from "./logger";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error.message);
};
const middleware = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
};

export default middleware;
