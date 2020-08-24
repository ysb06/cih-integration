"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', function (req, res, next) {
    console.log('OK');
    next();
});
router.post('/', function (req, res, next) {
    res.send('Post');
});
exports.default = router;
