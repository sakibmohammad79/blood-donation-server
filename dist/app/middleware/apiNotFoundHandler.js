"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiNotFoundHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiNotFoundHandler = (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "API not found!",
        error: {
            path: req.originalUrl,
            message: "Your requested path not found!",
        },
    });
};
exports.apiNotFoundHandler = apiNotFoundHandler;
