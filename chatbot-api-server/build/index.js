"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let test = require('./test.js');
const test2_1 = __importDefault(require("./test2"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('Hello World!' + test() + test2_1.default());
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
