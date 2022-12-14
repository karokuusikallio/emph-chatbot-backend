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
Object.defineProperty(exports, "__esModule", { value: true });
const dialogflow_cx_1 = require("@google-cloud/dialogflow-cx");
const uuid_1 = require("uuid");
function runDialogFlowQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = process.env.GOOGLE_PROJECT_ID;
        const location = "global";
        const agentId = process.env.DIALOGFLOW_AGENT_ID;
        const languageCode = "en";
        const client = new dialogflow_cx_1.SessionsClient({
            keyFile: process.env.NODE_ENV === "production"
                ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY)
                : "empathetic-chatbot-369609-8dd74fc860c4.json",
        });
        const sessionId = (0, uuid_1.v4)();
        const sessionPath = client.projectLocationAgentSessionPath(projectId, location, agentId, sessionId);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                },
                languageCode,
            },
        };
        console.log(request);
        try {
            const response = yield client.detectIntent(request);
            return response;
        }
        catch (error) {
            return error;
        }
    });
}
exports.default = runDialogFlowQuery;
//# sourceMappingURL=dialogFlowClient.js.map