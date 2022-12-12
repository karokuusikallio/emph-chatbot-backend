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
const loginRouter = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
loginRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const user = yield app_1.prisma.user.findUnique({
        where: {
            userName: username,
        },
    });
    if (user) {
        const passwordCheck = yield bcrypt_1.default.compare(password, user.passwordHash);
        if (passwordCheck) {
            const authToken = jsonwebtoken_1.default.sign({ username: user.userName, userId: user.id }, process.env.JWT_SECRET);
            return response.status(200).json({ authToken });
        }
    }
    return response.status(400).json({ error: "Incorrect user or password" });
}));
exports.default = loginRouter;
//# sourceMappingURL=login.js.map