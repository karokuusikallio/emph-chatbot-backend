"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
    logger_1.default.error(error.message);
};
const middleware = {
    unknownEndpoint,
    errorHandler,
};
exports.default = middleware;
//# sourceMappingURL=middleware.js.map