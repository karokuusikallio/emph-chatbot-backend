"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("express-async-errors");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const conversate_1 = __importDefault(require("./controllers/conversate"));
const user_1 = __importDefault(require("./controllers/user"));
const login_1 = __importDefault(require("./controllers/login"));
const messages_1 = __importDefault(require("./controllers/messages"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use("/api/conversate", conversate_1.default);
app.use("/api/user", user_1.default);
app.use("/api/login", login_1.default);
app.use("/api/messages", messages_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map