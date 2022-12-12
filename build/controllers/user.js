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
const userRouter = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
userRouter.get("/me", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.get("auth-token");
    if (token) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return response.status(200).json({
            userName: verifiedToken.username,
            userId: verifiedToken.userId,
            issuedAt: verifiedToken.issuedAt,
            loggedIn: true,
        });
    }
    return response.status(200).json({ loggedIn: false });
}));
userRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    if (username && password) {
        const userExists = yield app_1.prisma.user.findUnique({
            where: {
                userName: username,
            },
        });
        if (userExists) {
            return response.status(400).json({ error: "User already exists." });
        }
        const saltRounds = 10;
        const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
        const userCreated = yield app_1.prisma.user.create({
            data: {
                userName: username,
                passwordHash,
            },
        });
        const userForResponse = { username: userCreated.userName };
        return response.status(200).json(userForResponse);
    }
    return response
        .status(400)
        .json({ error: "Please provide username and password." });
}));
exports.default = userRouter;
//# sourceMappingURL=user.js.map