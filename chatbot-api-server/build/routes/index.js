"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chatbot_1 = __importDefault(require("./Chatbot"));
function defineRoutes(app) {
    app.use('/chat', Chatbot_1.default);
}
exports.default = defineRoutes;
