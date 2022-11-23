import logger from "./logger";
import { ErrorRequestHandler, Request, Response } from "express";

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error.message);

  next(error);
};
const middleware = {
  unknownEndpoint,
  errorHandler,
};

export default middleware;
