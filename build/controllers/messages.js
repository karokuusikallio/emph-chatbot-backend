"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesRouter = express_1.default.Router();
const app_1 = require("../app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
messagesRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.get("auth-token");
    if (token) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (verifiedToken) {
            const messages = yield app_1.prisma.message.findMany({
                where: {
                    userId: verifiedToken.userId,
                },
            });
            return response.status(200).json(messages);
        }
        return response.status(400).json({ error: "Auth token not valid." });
    }
    return response.status(400).json({ error: "No auth token provided." });
}));
messagesRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.get("auth-token");
    const { text, sender, createdAt } = request.body;
    if (token) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (verifiedToken && text && sender && createdAt) {
            const messageCreated = yield app_1.prisma.message.create({
                data: {
                    userId: verifiedToken.userId,
                    text,
                    sender,
                    createdAt,
                },
            });
            return response.status(200).json(messageCreated);
        }
        return response.status(400).json({ error: "Missing valid token." });
    }
    return response.status(400).json({ error: "Invalid message text or sender" });
}));
messagesRouter.delete("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.get("auth-token");
    if (token) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (verifiedToken) {
            yield app_1.prisma.message.deleteMany({
                where: {
                    userId: verifiedToken.userId,
                },
            });
            return response.status(200).end();
        }
        return response.status(400).json({ error: "Invalid auth token." });
    }
    return response.status(400).json({ error: "No auth token." });
}));
exports.default = messagesRouter;
//# sourceMappingURL=messages.js.map