"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
//cors 설정
app.use(cors_1.default());
app.use(body_parser_1.default.json());
//Router 정의
routes_1.default(app);
//Error 처리
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// 예외 제외 처리 하지 않으면 제대로 동작 안 함
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(3001, () => {
    console.log('Server runs at port 3001');
});
